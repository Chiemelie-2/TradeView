import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InvestmentPlan } from '../../types';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal, 
  PieChart, 
  ArrowRight, 
  Check, 
  X,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MarketplacePage: React.FC = () => {
  const { plans, setSelectedPlanId, setCurrentRoute, createInvestment, availableCash, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const mpT = pageT.publicPages.marketplace;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  
  // Modals state
  const [detailModalPlan, setDetailModalPlan] = useState<InvestmentPlan | null>(null);
  const [allocationModalPlan, setAllocationModalPlan] = useState<InvestmentPlan | null>(null);
  const [allocationAmount, setAllocationAmount] = useState<number>(10000);
  const [comparePlanIds, setComparePlanIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const categories = ['all', 'Sovereign Treasury', 'Quantitative', 'Private Credit', 'Infrastructure', 'Private Equity'];
  const risks = ['all', 'Conservative', 'Moderate', 'Growth', 'Opportunistic'];

  const filteredPlans = plans.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesRisk = selectedRisk === 'all' || p.riskLevel === selectedRisk;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const toggleCompare = (id: string) => {
    if (comparePlanIds.includes(id)) {
      setComparePlanIds(prev => prev.filter(pId => pId !== id));
    } else {
      if (comparePlanIds.length >= 3) return;
      setComparePlanIds(prev => [...prev, id]);
    }
  };

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocationModalPlan) return;
    const res = createInvestment(allocationModalPlan.id, allocationAmount);
    if (res.success) {
      setAllocationModalPlan(null);
      setCurrentRoute('dashboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
            {mpT.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {mpT.title}
          </h1>
          <p className="text-gray-300 text-sm mt-1 max-w-xl">
            {mpT.subtitle}
          </p>
        </div>

        {/* Compare button if any selected */}
        {comparePlanIds.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg hover:bg-amber-400 transition-all cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>Compare Selected ({comparePlanIds.length}/3)</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={mpT.searchPlaceholder}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="md:col-span-8 flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-[#0a0a0a] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Classes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Filter Bar */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-400 font-mono text-[11px] uppercase">Risk Appetite:</span>
        {risks.map((risk) => (
          <button
            key={risk}
            onClick={() => setSelectedRisk(risk)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              selectedRisk === risk
                ? 'bg-white/10 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {risk === 'all' ? 'All Risks' : risk}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => {
          const isComparing = comparePlanIds.includes(plan.id);

          return (
            <div
              key={plan.id}
              className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-xl relative"
            >
              <div className="space-y-4">
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#050505] text-gray-400 font-mono text-[10px] border border-white/10">
                      {plan.code}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">{plan.category}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    plan.riskLevel === 'Conservative'
                      ? 'bg-white/5 text-emerald-400 border-emerald-500/40'
                      : plan.riskLevel === 'Moderate'
                      ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                      : 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                  }`}>
                    {plan.riskLevel}
                  </span>
                </div>

                {/* Plan Name & Desc */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Metrics Table */}
                <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Target Return</span>
                    <span className="font-mono font-bold text-base text-[amber-400]">
                      {plan.projectedApy}% APY
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Term Commitment</span>
                    <span className="font-mono font-bold text-base text-white">
                      {plan.durationDays} Days
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Min. Allocation</span>
                    <span className="font-mono font-semibold text-gray-300">
                      ${plan.minInvestment.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Liquidity Term</span>
                    <span className="font-mono font-semibold text-gray-300">
                      {plan.liquidity}
                    </span>
                  </div>
                </div>

                {/* Asset Allocation Weights */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>Portfolio Weighting</span>
                    <span>{plan.currency} denominated</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#050505] flex overflow-hidden">
                    {plan.assetAllocation.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${item.percentage}%` }}
                        className={`${
                          idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-[#58C7D2]' : idx === 2 ? 'bg-[amber-500]' : 'bg-stone-500'
                        }`}
                        title={`${item.asset}: ${item.percentage}%`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAllocationModalPlan(plan);
                      setAllocationAmount(plan.minInvestment);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow text-center cursor-pointer"
                  >
                    {mpT.allocateButton}
                  </button>
                  <button
                    onClick={() => setDetailModalPlan(plan)}
                    className="px-3 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-gray-300 hover:text-white text-xs"
                    title="View Strategy Factsheet"
                  >
                    Brief
                  </button>
                </div>

                {/* Compare Checkbox */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isComparing}
                      onChange={() => toggleCompare(plan.id)}
                      className="accent-[amber-500] rounded"
                    />
                    <span>Compare Vehicle</span>
                  </label>
                  <span className="text-[10px] text-gray-500 font-mono">Tier 2 KYC Required</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategy Detail Factsheet Modal */}
      <AnimatePresence>
        {detailModalPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-[amber-400] uppercase">{detailModalPlan.code} • {detailModalPlan.category}</span>
                  <h2 className="font-serif text-2xl font-bold text-white mt-1">{detailModalPlan.name}</h2>
                </div>
                <button
                  onClick={() => setDetailModalPlan(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Strategy Thesis</h4>
                  <p className="text-gray-300 leading-relaxed mt-1">{detailModalPlan.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Target Yield</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">+{detailModalPlan.projectedApy}% APY</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Term Commitment</span>
                    <span className="font-mono font-bold text-white text-sm">{detailModalPlan.durationDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Min. Allocation</span>
                    <span className="font-mono font-bold text-white text-sm">${detailModalPlan.minInvestment.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Risk Rating</span>
                    <span className="font-mono font-bold text-[amber-500] text-sm">{detailModalPlan.riskLevel}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2">Underlying Portfolio Allocation</h4>
                  <div className="space-y-2">
                    {detailModalPlan.assetAllocation.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                        <span className="text-gray-300 font-medium">{item.asset}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 rounded-full bg-[#050505] overflow-hidden">
                            <div style={{ width: `${item.percentage}%` }} className="h-full bg-amber-500" />
                          </div>
                          <span className="font-mono text-emerald-400 font-bold">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-amber-500/30 text-[11px] text-gray-400">
                  <strong>Custody Guarantee:</strong> Positions are held in segregated client sub-accounts at institutional depositories. TradeVerge takes no proprietary trading risk against client allocations.
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setDetailModalPlan(null);
                    setAllocationModalPlan(detailModalPlan);
                    setAllocationAmount(detailModalPlan.minInvestment);
                  }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-semibold text-xs transition-all shadow"
                >
                  Allocate to Strategy
                </button>
                <button
                  onClick={() => setDetailModalPlan(null)}
                  className="px-5 py-3 rounded-xl bg-[#0a0a0a] border border-stone-700 text-gray-300 hover:text-white text-xs"
                >
                  Close Factsheet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Allocation Execution Modal */}
      <AnimatePresence>
        {allocationModalPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-[amber-400] uppercase">Order Execution</span>
                  <h2 className="font-serif text-2xl font-bold text-white mt-0.5">{allocationModalPlan.name}</h2>
                </div>
                <button
                  onClick={() => setAllocationModalPlan(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAllocateSubmit} className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 flex justify-between items-center">
                  <span className="text-gray-400">Available Cleared Cash:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    Allocation Amount (USD):
                  </label>
                  <input
                    type="number"
                    min={allocationModalPlan.minInvestment}
                    max={availableCash}
                    step="100"
                    value={allocationAmount}
                    onChange={(e) => setAllocationAmount(Number(e.target.value))}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                  <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                    <span>Minimum: ${allocationModalPlan.minInvestment.toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={() => setAllocationAmount(availableCash)}
                      className="text-emerald-400 hover:underline"
                    >
                      Use Max Cleared
                    </button>
                  </div>
                </div>

                {/* Projected Return Calculation */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-amber-500/40 space-y-1.5">
                  <div className="flex justify-between text-gray-300">
                    <span>Projected Target APY:</span>
                    <span className="font-mono font-bold text-emerald-400">+{allocationModalPlan.projectedApy}%</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Estimated Net Yield:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      +${((allocationAmount * (allocationModalPlan.projectedApy / 100) * (allocationModalPlan.durationDays / 365))).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {availableCash < allocationModalPlan.minInvestment && (
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs">
                    Your available cash ($${availableCash.toLocaleString()}) is below the minimum allocation ($${allocationModalPlan.minInvestment.toLocaleString()}). Please deposit funds first.
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={availableCash < allocationAmount || allocationAmount < allocationModalPlan.minInvestment}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-semibold text-xs tracking-wide shadow transition-all cursor-pointer"
                  >
                    Confirm & Execute Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllocationModalPlan(null)}
                    className="px-5 py-3 rounded-xl bg-[#0a0a0a] border border-stone-700 text-gray-300 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Investment Strategy Comparison</h2>
                  <p className="text-xs text-gray-400">Side-by-side analysis of risk, liquidity, and term parameters</p>
                </div>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                {comparePlanIds.map((id) => {
                  const p = plans.find(pl => pl.id === id);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-3">
                      <div className="border-b border-white/10 pb-2">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase">{p.code}</span>
                        <h4 className="font-serif font-bold text-white text-sm">{p.name}</h4>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500 text-[10px] block">Projected APY</span>
                          <span className="font-mono font-bold text-base text-[amber-400]">+{p.projectedApy}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Duration</span>
                          <span className="font-mono font-semibold text-white">{p.durationDays} Days</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Minimum</span>
                          <span className="font-mono font-semibold text-white">${p.minInvestment.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Risk Level</span>
                          <span className="font-semibold text-gray-200">{p.riskLevel}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Liquidity</span>
                          <span className="font-semibold text-gray-200">{p.liquidity}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsCompareOpen(false);
                          setAllocationModalPlan(p);
                          setAllocationAmount(p.minInvestment);
                        }}
                        className="w-full py-2 rounded-xl bg-amber-500 text-black font-bold font-semibold text-[11px]"
                      >
                        Allocate
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
