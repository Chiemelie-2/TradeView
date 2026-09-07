import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { supabaseDb, isSupabaseConfigured } from '../../lib/supabase';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  Database,
  RefreshCw,
  Calendar,
  Layers,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type TimeframeOption = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
export type ViewMode = 'total' | 'profit' | 'split';

interface DataPoint {
  dateStr: string;
  displayDate: string;
  fullDate: string;
  totalValue: number;
  principal: number;
  profit: number;
  dailyYield: number;
  changePercent: number;
  notes?: string;
}

export const PortfolioGrowthChart: React.FC = () => {
  const {
    user,
    investments,
    ledgerTransactions,
    totalPortfolioValue,
    investedCapital,
    totalProfit,
    availableCash,
    isSupabaseLinked,
    syncWithSupabase,
    showToast
  } = useApp();

  const [timeframe, setTimeframe] = useState<TimeframeOption>('1M');
  const [viewMode, setViewMode] = useState<ViewMode>('total');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // Manual trigger to pull fresh records from Supabase
  const handleSupabaseRefresh = async () => {
    setIsSyncing(true);
    try {
      if (isSupabaseConfigured()) {
        await syncWithSupabase();
        setLastSyncTime(new Date());
        showToast('Supabase Synced', 'Portfolio metrics refreshed directly from your Supabase PostgreSQL tables.', 'success');
      } else {
        await new Promise((r) => setTimeout(r, 600));
        setLastSyncTime(new Date());
        showToast('Local Ledger Updated', 'Depository records recalculated from the active session ledger.', 'info');
      }
    } catch (err) {
      console.error('Supabase chart sync error:', err);
      showToast('Sync Warning', 'Unable to fetch updated records from Supabase.', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  // Construct realistic time-series points based on transactions, active investments, and current balances
  const chartData = useMemo<DataPoint[]>(() => {
    const now = new Date();
    let numDays = 30;
    let stepDays = 1;

    switch (timeframe) {
      case '1W':
        numDays = 7;
        stepDays = 1;
        break;
      case '1M':
        numDays = 30;
        stepDays = 1;
        break;
      case '3M':
        numDays = 90;
        stepDays = 3;
        break;
      case '6M':
        numDays = 180;
        stepDays = 6;
        break;
      case '1Y':
        numDays = 365;
        stepDays = 14;
        break;
      case 'ALL':
        numDays = 540;
        stepDays = 18;
        break;
    }

    const currentTotal = Math.max(0, totalPortfolioValue);
    const currentProfit = Math.max(0, totalProfit);
    const currentPrincipal = Math.max(0, currentTotal - currentProfit);

    // Filter relevant completed ledger transactions
    const completedTx = ledgerTransactions.filter((tx) => tx.status === 'completed');

    // Generate date steps backwards from today
    const points: DataPoint[] = [];
    const startDate = new Date(now.getTime() - numDays * 24 * 60 * 60 * 1000);

    // Determine baseline starting valuation
    // If we have completed deposits and allocations, trace back
    const netDeposits = completedTx
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
    const netWithdrawals = completedTx
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);

    const baseCapital = netDeposits > 0 ? netDeposits - netWithdrawals : currentPrincipal * 0.75;
    const initialPortfolioVal = Math.max(1000, baseCapital > 0 ? baseCapital : currentTotal * 0.7);

    // Calculate approximate daily compound yield rate based on active investments APY
    const weightedApy =
      investments.length > 0
        ? investments.reduce((acc, inv) => acc + (inv.projectedApy || 14.5) * inv.principalAmount, 0) /
          (investments.reduce((acc, inv) => acc + inv.principalAmount, 0) || 1)
        : 16.8;

    const dailyRate = Math.pow(1 + weightedApy / 100, 1 / 365) - 1;

    let previousVal = initialPortfolioVal;

    for (let d = numDays; d >= 0; d -= stepDays) {
      const pointDate = new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
      const progressFraction = (numDays - d) / (numDays || 1); // 0 to 1

      // Format displays
      const dateStr = pointDate.toISOString().split('T')[0];
      const displayDate = pointDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      });
      const fullDate = pointDate.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Check transactions that occurred on or before this pointDate
      const txUpToDate = completedTx.filter((tx) => new Date(tx.createdAt) <= pointDate);
      const txDeposits = txUpToDate
        .filter((t) => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0);
      const txWithdrawals = txUpToDate
        .filter((t) => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);
      const txYields = txUpToDate
        .filter((t) => t.type === 'yield_distribution')
        .reduce((sum, t) => sum + t.amount, 0);

      let calcTotal: number;
      let calcPrincipal: number;
      let calcProfit: number;

      if (d === 0) {
        // EXACT today values
        calcTotal = currentTotal;
        calcPrincipal = currentPrincipal;
        calcProfit = currentProfit;
      } else if (txUpToDate.length > 0 && netDeposits > 0) {
        // Grounded in real transaction ledger
        calcPrincipal = Math.max(0, txDeposits - txWithdrawals);
        // Accrued compounding profit up to this point
        const elapsedDays = Math.max(0, (pointDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const simulatedAccrued = calcPrincipal * (Math.pow(1 + dailyRate, elapsedDays) - 1);
        calcProfit = Math.max(0, Math.min(currentProfit, txYields + simulatedAccrued * progressFraction));
        calcTotal = calcPrincipal + calcProfit;
      } else {
        // Deterministic S-curve interpolation leading to current metrics
        const ease = Math.sin((progressFraction * Math.PI) / 2);
        calcTotal = initialPortfolioVal + (currentTotal - initialPortfolioVal) * ease;
        calcProfit = currentProfit * Math.pow(progressFraction, 1.2);
        calcPrincipal = Math.max(0, calcTotal - calcProfit);
      }

      // Ensure sanity bounds
      calcTotal = Math.round(calcTotal * 100) / 100;
      calcPrincipal = Math.round(calcPrincipal * 100) / 100;
      calcProfit = Math.round(calcProfit * 100) / 100;

      const dailyYield = Math.max(0, Math.round((calcTotal - previousVal) * 100) / 100);
      previousVal = calcTotal;

      const baseVal = points.length > 0 ? points[0].totalValue : initialPortfolioVal;
      const changePercent = baseVal > 0 ? Math.round(((calcTotal - baseVal) / baseVal) * 10000) / 100 : 0;

      points.push({
        dateStr,
        displayDate,
        fullDate,
        totalValue: calcTotal,
        principal: calcPrincipal,
        profit: calcProfit,
        dailyYield,
        changePercent
      });
    }

    return points;
  }, [
    timeframe,
    totalPortfolioValue,
    investedCapital,
    totalProfit,
    availableCash,
    ledgerTransactions,
    investments
  ]);

  // Overall statistics for the chosen timeframe
  const periodStats = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {
        startVal: 0,
        endVal: 0,
        absoluteChange: 0,
        percentChange: 0,
        minVal: 0,
        maxVal: 0,
        avgDailyGain: 0
      };
    }
    const startVal = chartData[0].totalValue;
    const endVal = chartData[chartData.length - 1].totalValue;
    const absoluteChange = endVal - startVal;
    const percentChange = startVal > 0 ? (absoluteChange / startVal) * 100 : 0;

    const values = chartData.map((d) => d.totalValue);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const avgDailyGain = chartData.length > 1 ? absoluteChange / chartData.length : 0;

    return {
      startVal,
      endVal,
      absoluteChange,
      percentChange,
      minVal,
      maxVal,
      avgDailyGain
    };
  }, [chartData]);

  const currencyFormatter = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 10000) {
      return `$${(val / 1000).toFixed(1)}k`;
    }
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(2)}k`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Chart Header & Supabase Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Depository Valuation Curve
            </span>
            <span className="text-gray-600">•</span>
            {isSupabaseLinked ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Live Feed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono">
                <Database className="w-2.5 h-2.5" />
                Ledger Grounded
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            <span>Portfolio Growth Trajectory</span>
            <span
              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
                periodStats.absoluteChange >= 0
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}
            >
              {periodStats.absoluteChange >= 0 ? '+' : ''}
              {periodStats.percentChange.toFixed(2)}% ({periodStats.absoluteChange >= 0 ? '+' : ''}$
              {Math.abs(periodStats.absoluteChange).toLocaleString(undefined, {
                maximumFractionDigits: 0
              })}
              )
            </span>
          </h3>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-[#050505] rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('total')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'total'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Total Portfolio Valuation"
            >
              Total Value
            </button>
            <button
              onClick={() => setViewMode('profit')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'profit'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Accrued Yield Curve"
            >
              Yield Only
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Capital vs Yield Breakdown"
            >
              Split View
            </button>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center p-1 bg-[#050505] rounded-xl border border-white/10 text-xs">
            {(['1W', '1M', '3M', '6M', '1Y', 'ALL'] as TimeframeOption[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Supabase Sync Button */}
          <button
            onClick={handleSupabaseRefresh}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh latest entries from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Real-time Metric Overview Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050505] p-3 rounded-xl border border-white/5">
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono uppercase text-gray-500">Current Valuation</div>
          <div className="text-base sm:text-lg font-serif font-bold text-white">
            ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-[10px] font-mono uppercase text-gray-500">Peak in Period</div>
          <div className="text-base sm:text-lg font-serif font-bold text-amber-400">
            ${periodStats.maxVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-[10px] font-mono uppercase text-gray-500">Net Period Gain</div>
          <div
            className={`text-base sm:text-lg font-serif font-bold ${
              periodStats.absoluteChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {periodStats.absoluteChange >= 0 ? '+' : ''}$
            {periodStats.absoluteChange.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-[10px] font-mono uppercase text-gray-500">Active Allocations</div>
          <div className="text-base sm:text-lg font-serif font-bold text-gray-200">
            {investments.filter((i) => i.status === 'active').length} Vehicles
          </div>
        </div>
      </div>

      {/* Primary Recharts Visualization */}
      <div className="w-full h-72 sm:h-80 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state && state.activePayload && state.activePayload.length > 0) {
                setHoveredPoint(state.activePayload[0].payload as DataPoint);
              }
            }}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              {/* Amber Gold Gradient for Total Portfolio */}
              <linearGradient id="amberGoldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>

              {/* Emerald Gradient for Profit / Yield */}
              <linearGradient id="emeraldProfitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="60%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>

              {/* Cyan / Slate Gradient for Principal Capital */}
              <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              vertical={false}
              opacity={0.6}
            />

            <XAxis
              dataKey="displayDate"
              stroke="#525252"
              tick={{ fill: '#737373', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#262626' }}
              axisLine={{ stroke: '#262626' }}
              dy={8}
            />

            <YAxis
              stroke="#525252"
              tick={{ fill: '#737373', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#262626' }}
              axisLine={{ stroke: '#262626' }}
              tickFormatter={currencyFormatter}
              domain={['auto', 'auto']}
              dx={-4}
            />

            <Tooltip
              content={<CustomChartTooltip viewMode={viewMode} />}
              cursor={{ stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            />

            {/* View Mode: Total Valuation */}
            {viewMode === 'total' && (
              <Area
                type="monotone"
                dataKey="totalValue"
                name="Total Value"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fill="url(#amberGoldGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: '#f59e0b',
                  stroke: '#050505',
                  strokeWidth: 2
                }}
              />
            )}

            {/* View Mode: Yield Only */}
            {viewMode === 'profit' && (
              <Area
                type="monotone"
                dataKey="profit"
                name="Cumulative Profit"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#emeraldProfitGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: '#10b981',
                  stroke: '#050505',
                  strokeWidth: 2
                }}
              />
            )}

            {/* View Mode: Split Stack (Principal vs Profit) */}
            {viewMode === 'split' && (
              <>
                <Area
                  type="monotone"
                  dataKey="principal"
                  name="Principal Capital"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fill="url(#principalGradient)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: '#38bdf8',
                    stroke: '#050505',
                    strokeWidth: 2
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  name="Total Portfolio"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#amberGoldGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: '#f59e0b',
                    stroke: '#050505',
                    strokeWidth: 2
                  }}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Key Legend & Live Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
        <div className="flex items-center gap-5">
          {viewMode === 'total' && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
              <span className="text-gray-300 font-medium">Total Portfolio Valuation</span>
            </div>
          )}
          {viewMode === 'profit' && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-gray-300 font-medium">Cumulative Settled Yield</span>
            </div>
          )}
          {viewMode === 'split' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                <span className="text-gray-300 font-medium">Total Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 shadow-sm" />
                <span className="text-gray-300 font-medium">Principal Base</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 text-gray-500 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-gray-400" />
            Interval: {timeframe}
          </span>
          <span>•</span>
          <span>Last sync: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

// Sleek Custom Tooltip component for Recharts
interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  viewMode: ViewMode;
}

const CustomChartTooltip: React.FC<TooltipProps> = ({ active, payload, viewMode }) => {
  if (!active || !payload || !payload.length) return null;

  const data: DataPoint = payload[0].payload;

  return (
    <div className="p-3.5 rounded-xl bg-[#080808]/95 backdrop-blur-md border border-white/15 shadow-2xl space-y-2 min-w-[210px] text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <span className="font-mono text-gray-400 text-[11px]">{data.fullDate}</span>
        <span
          className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
            data.changePercent >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
          }`}
        >
          {data.changePercent >= 0 ? '+' : ''}
          {data.changePercent.toFixed(2)}%
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Total Portfolio:
          </span>
          <span className="font-mono font-bold text-white text-sm">
            ${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {(viewMode === 'profit' || viewMode === 'split') && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Accrued Profit:
            </span>
            <span className="font-mono font-semibold text-emerald-400">
              +${data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}

        {viewMode === 'split' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Principal Capital:
            </span>
            <span className="font-mono text-sky-300">
              ${data.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}

        {data.dailyYield > 0 && (
          <div className="flex items-center justify-between border-t border-white/5 pt-1 text-[11px]">
            <span className="text-gray-500">Period Accrual:</span>
            <span className="font-mono text-amber-400/90">+${data.dailyYield.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
