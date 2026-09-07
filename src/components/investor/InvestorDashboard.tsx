import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  TrendingUp, 
  Layers, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Clock, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioGrowthChart } from './PortfolioGrowthChart';

export const InvestorDashboard: React.FC = () => {
  const { 
    user, 
    t, 
    availableCash, 
    investedCapital, 
    totalPortfolioValue, 
    totalProfit, 
    investments, 
    ledgerTransactions, 
    setCurrentRoute, 
    setSelectedPlanId
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* KYC Alert if not verified */}
      {user.kycStatus !== 'approved' && (
        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Tier 2 KYC Verification Required</h4>
              <p className="text-xs text-gray-300">
                {user.kycStatus === 'submitted'
                  ? 'Your identity documents are under compliance review. Full redemption capabilities unlock upon approval.'
                  : 'Submit government identification to activate institutional strategy allocations and withdrawal limits.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentRoute('kyc')}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider self-start sm:self-auto shrink-0 transition-all shadow"
          >
            {user.kycStatus === 'submitted' ? 'Check KYC Status' : 'Complete Verification'}
          </button>
        </div>
      )}

      {/* Top Portfolio Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Portfolio Value */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono uppercase text-[10px] tracking-wider">Total Portfolio Value</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% annualized trajectory</span>
          </div>
        </div>

        {/* Available Cleared Cash */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono uppercase text-[10px] tracking-wider">Cleared Available Cash</span>
            <Wallet className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRoute('deposit')}
              className="text-[11px] font-semibold text-amber-400 hover:underline flex items-center gap-0.5"
            >
              <span>+ Deposit Funds</span>
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => setCurrentRoute('withdraw')}
              className="text-[11px] font-semibold text-gray-400 hover:text-white"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Invested Capital */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono uppercase text-[10px] tracking-wider">Active Invested Capital</span>
            <Layers className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ${investedCapital.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-400">
            {investments.filter(i => i.status === 'active').length} active vehicle positions
          </div>
        </div>

        {/* Accrued Profit */}
        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono uppercase text-[10px] tracking-wider">Cumulative Settled Yield</span>
            <span className="text-amber-500 font-mono text-[10px] font-bold">AUDITED</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-500 tracking-tight">
            +${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-400">
            Automated compounding
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setCurrentRoute('deposit')}
          className="p-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-between border border-amber-500/40 shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-black/10 text-black">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-xs uppercase tracking-wider">Deposit Funds</div>
              <div className="text-[11px] text-black/70">Bank Wire & Crypto Gateways</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setCurrentRoute('withdraw')}
          className="p-4 rounded-xl bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-white flex items-center justify-between transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-gray-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-xs uppercase tracking-wider">Request Withdrawal</div>
              <div className="text-[11px] text-gray-400">2FA Step-up Verified Payouts</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setCurrentRoute('investments')}
          className="p-4 rounded-xl bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-white flex items-center justify-between transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-xs uppercase tracking-wider">Explore Marketplace</div>
              <div className="text-[11px] text-gray-400">Allocate to Active Strategies</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Interactive Recharts Portfolio Performance Visualization */}
      <PortfolioGrowthChart />

      {/* Active Investment Positions Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Active Structured Positions</h3>
            <p className="text-xs text-gray-400">Audited allocations with deterministic settlement schedules</p>
          </div>
          <button
            onClick={() => setCurrentRoute('investments')}
            className="text-xs text-amber-400 hover:text-white flex items-center gap-1"
          >
            <span>Browse All Vehicles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {investments.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#0a0a0a] border border-white/10 text-center space-y-3">
            <Layers className="w-8 h-8 text-gray-500 mx-auto" />
            <p className="text-xs text-gray-300">No active positions currently structured.</p>
            <button
              onClick={() => setCurrentRoute('investments')}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
            >
              Allocate Funds
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0a]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#050505] text-gray-500 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Position / Vehicle</th>
                  <th className="p-4">Principal Amount</th>
                  <th className="p-4">Current Value</th>
                  <th className="p-4">Accrued Yield</th>
                  <th className="p-4">Target APY</th>
                  <th className="p-4">Maturity Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-gray-200">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{inv.planName}</div>
                      <div className="font-mono text-[10px] text-gray-500">{inv.id}</div>
                    </td>
                    <td className="p-4 font-mono font-medium">
                      ${inv.principalAmount.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono font-bold text-white">
                      ${inv.currentValue.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-500">
                      +${inv.totalAccruedProfit.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-amber-400">
                      {inv.projectedApy}% APY
                    </td>
                    <td className="p-4 font-mono text-gray-400">
                      {new Date(inv.maturityDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                        {inv.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Ledger Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Recent Ledger Events</h3>
            <p className="text-xs text-gray-400">Immutable record of cash inflows, debits, and yield allocations</p>
          </div>
          <button
            onClick={() => setCurrentRoute('transactions')}
            className="text-xs text-amber-400 hover:text-white flex items-center gap-1"
          >
            <span>Full Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0a]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050505] text-gray-500 font-mono text-[10px] uppercase border-b border-white/10">
              <tr>
                <th className="p-4">Journal Entry ID</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-200">
              {ledgerTransactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-[11px] text-gray-400">
                    {tx.id}
                  </td>
                  <td className="p-4 font-mono uppercase text-[10px] text-gray-300">
                    {tx.type.replace('_', ' ')}
                  </td>
                  <td className="p-4 text-gray-200">
                    {tx.description}
                  </td>
                  <td className={`p-4 font-mono font-bold ${tx.direction === 'credit' ? 'text-amber-500' : 'text-gray-300'}`}>
                    {tx.direction === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()} {tx.currency}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      tx.status === 'completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
