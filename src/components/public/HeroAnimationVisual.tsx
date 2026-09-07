import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Layers, 
  Activity, 
  ArrowUpRight,
  Sparkles,
  Server,
  Globe2,
  RefreshCw
} from 'lucide-react';

interface SettlementEvent {
  id: string;
  type: 'wire' | 'crypto' | 'yield' | 'rebalance';
  source: string;
  amount: string;
  currency: string;
  status: 'CLEARED' | 'SETTLED' | 'VERIFIED';
  timestamp: string;
}

const INITIAL_EVENTS: SettlementEvent[] = [
  {
    id: 'evt-1',
    type: 'wire',
    source: 'JPMorgan Fedwire Ingress',
    amount: '$650,000',
    currency: 'USD',
    status: 'CLEARED',
    timestamp: 'Just now'
  },
  {
    id: 'evt-2',
    type: 'crypto',
    source: 'Zurich Cold Vault #04',
    amount: '18.420',
    currency: 'BTC',
    status: 'VERIFIED',
    timestamp: '12s ago'
  },
  {
    id: 'evt-3',
    type: 'yield',
    source: 'Sovereign Alpha Yield Dist',
    amount: '$34,920',
    currency: 'USD',
    status: 'SETTLED',
    timestamp: '48s ago'
  },
  {
    id: 'evt-4',
    type: 'wire',
    source: 'Barclays CHAPS Depository',
    amount: '£220,000',
    currency: 'GBP',
    status: 'CLEARED',
    timestamp: '1m ago'
  }
];

export const HeroAnimationVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'yield' | 'ledger' | 'solvency'>('yield');
  const [events, setEvents] = useState<SettlementEvent[]>(INITIAL_EVENTS);
  const [liveYield, setLiveYield] = useState<number>(418920.85);
  const [tick, setTick] = useState<number>(0);

  // Live yield micro-ticker simulation (deterministic fractional growth)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveYield(prev => prev + (Math.random() * 0.45 + 0.15));
      setTick(t => t + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Periodic rotation of live verified depository events
  useEffect(() => {
    const streamInterval = setInterval(() => {
      const mockPool: SettlementEvent[] = [
        {
          id: `evt-${Date.now()}-1`,
          type: 'wire',
          source: 'BNP Paribas SEPA Gateway',
          amount: '€410,000',
          currency: 'EUR',
          status: 'CLEARED',
          timestamp: 'Just now'
        },
        {
          id: `evt-${Date.now()}-2`,
          type: 'crypto',
          source: 'BitGo Institutional Vault',
          amount: '85,000',
          currency: 'USDC',
          status: 'VERIFIED',
          timestamp: 'Just now'
        },
        {
          id: `evt-${Date.now()}-3`,
          type: 'yield',
          source: 'Treasury Prime Yield Payout',
          amount: '$18,450',
          currency: 'USD',
          status: 'SETTLED',
          timestamp: 'Just now'
        },
        {
          id: `evt-${Date.now()}-4`,
          type: 'wire',
          source: 'Fedwire Depository Ingress',
          amount: '$1,200,000',
          currency: 'USD',
          status: 'CLEARED',
          timestamp: 'Just now'
        }
      ];

      const nextEvt = mockPool[Math.floor(Math.random() * mockPool.length)];
      setEvents(prev => [nextEvt, ...prev.slice(0, 3)]);
    }, 4500);

    return () => clearInterval(streamInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-5xl mx-auto mt-10 rounded-2xl sm:rounded-3xl bg-[#09090b]/95 border border-white/15 p-4 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      {/* Subtle Background Glow Beams */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Line Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Console Top Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500/60 inline-block" />
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-stone-300 uppercase">
              Depository Engine v4.9 • Live Consensus
            </span>
          </div>
        </div>

        {/* Console Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('yield')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'yield'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Yield Curve</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ledger'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>Ledger Stream</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('solvency')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'solvency'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Solvency 100%</span>
          </button>
        </div>
      </div>

      {/* Main Console Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: Interactive Yield Visualizer & Performance Curve */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Real-Time Accumulator Matrix
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  ${liveYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +24.8% APY
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Custodial Vault</span>
              <span className="text-xs font-mono font-medium text-stone-300">Off-Balance Sheet Tier-1</span>
            </div>
          </div>

          {/* Animated SVG Performance Curve with Real-Time Glowing Tracer */}
          <div className="relative w-full h-36 sm:h-44 overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 p-2">
            {/* Grid horizontal guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-20 pointer-events-none">
              <div className="border-b border-dashed border-stone-500 w-full" />
              <div className="border-b border-dashed border-stone-500 w-full" />
              <div className="border-b border-dashed border-stone-500 w-full" />
            </div>

            <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <motion.path
                d="M 0,140 Q 90,125 180,105 T 350,60 T 500,20 L 500,160 L 0,160 Z"
                fill="url(#curveGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              />

              {/* Glowing trajectory stroke */}
              <motion.path
                d="M 0,140 Q 90,125 180,105 T 350,60 T 500,20"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />

              {/* Animated ping tracer at current trajectory pinnacle */}
              <motion.circle
                cx="500"
                cy="20"
                r="6"
                fill="#fbbf24"
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="500"
                cy="20"
                r="12"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            {/* Micro trajectory labels */}
            <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[9px] font-mono text-stone-500">
              <span>Day 0 (Allocation)</span>
              <span>Day 60 (Reconciled)</span>
              <span>Day 120 (Yield Accrual)</span>
              <span className="text-amber-400 font-bold">Maturity (24.8% APY)</span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
            <div className="p-2 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] font-mono uppercase text-stone-500 block">Target APY</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-400">24.8% p.a.</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] font-mono uppercase text-stone-500 block">Drawdown Limit</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">0.00% Risk</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] font-mono uppercase text-stone-500 block">Settlement</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-stone-200">Daily Ledger</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Ingress & Real-Time Audited Stream */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                Reconciliation Stream
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              <span>LIVE FEED</span>
            </div>
          </div>

          {/* Stream Item List with smooth entry animations */}
          <div className="space-y-2 flex-1">
            <AnimatePresence initial={false}>
              {events.slice(0, 4).map((evt) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: 16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -16, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-2.5 rounded-xl bg-[#0e0e11] border border-white/10 flex items-center justify-between gap-3 overflow-hidden shadow-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 shrink-0">
                      {evt.type === 'wire' && <Globe2 className="w-3.5 h-3.5" />}
                      {evt.type === 'crypto' && <Lock className="w-3.5 h-3.5" />}
                      {evt.type === 'yield' && <TrendingUp className="w-3.5 h-3.5" />}
                      {evt.type === 'rebalance' && <Layers className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {evt.source}
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 flex items-center gap-1.5">
                        <span>{evt.timestamp}</span>
                        <span>•</span>
                        <span className="text-stone-400">Atomic Ingress</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-amber-400">
                      {evt.amount} {evt.currency}
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      {evt.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Institutional Compliance Seal Footer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-stone-400">
            <span className="flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              100% Segregated Accounts
            </span>
            <span className="text-amber-500 font-semibold">
              JPMorgan • Barclays • Zurich
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
