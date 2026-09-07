import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  Landmark, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  PieChart, 
  Zap, 
  Sliders, 
  FileCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { 
    t, 
    setCurrentRoute, 
    plans, 
    setSelectedPlanId, 
    campaigns,
    isAuthenticated,
    openAuthModal
  } = useApp();

  // Interactive Yield Calculator state
  const [calcAmount, setCalcAmount] = useState<number>(25000);
  const [calcPlanId, setCalcPlanId] = useState<string>(plans[0]?.id || 'plan_sovereign_alpha');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const selectedPlan = plans.find(p => p.id === calcPlanId) || plans[0];
  const projectedReturn = (calcAmount * (selectedPlan.projectedApy / 100) * (selectedPlan.durationDays / 365));
  const totalMaturityValue = calcAmount + projectedReturn;

  const faqs = [
    {
      q: 'How does TradeVerge safeguard investor capital?',
      a: 'All client funds are held strictly off-balance-sheet in segregated institutional depository accounts with Tier 1 banks (JPMorgan Chase, Barclays) and multi-signature cold storage vaults. We operate on a double-entry balanced ledger with continuous reconciliation.'
    },
    {
      q: 'What are the accepted deposit and funding methods?',
      a: 'We support institutional bank wire transfers via Fedwire, SWIFT, and SEPA in USD, EUR, and GBP, as well as audited cryptocurrency deposit gateways for Bitcoin (BTC), Ethereum (ETH), USDT, and USDC.'
    },
    {
      q: 'How are manual bank and cryptocurrency deposits verified?',
      a: 'When you initiate a deposit and upload proof of payment or transaction hash, it enters our compliance reconciliation queue. An operations officer cross-references incoming bank statements or on-chain explorer confirmations and atomically credits your ledger balance.'
    },
    {
      q: 'What is the investor onboarding (KYC) requirement?',
      a: 'To comply with global AML/CTF standards, investors submit identity verification (passport or national ID), proof of address, and source of funds prior to capital activation and withdrawals.'
    },
    {
      q: 'Can investors withdraw before maturity?',
      a: 'Depending on the investment vehicle, liquidity terms range from daily, quarterly, 30-day notice, to end-of-term. Cleared cash in your depository account may be redeemed at any time subject to a standard 24-hour security cooling-off period.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Promotional Campaign Banner (if active) */}
      {campaigns.filter(c => c.active && c.placement === 'homepage_banner').map(c => (
        <div key={c.id} className="bg-[#0a0a0a] border-b border-white/10 py-2.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold tracking-wide border border-amber-500/30">
              {c.badgeText}
            </span>
            <span className="text-white font-medium">{c.title}</span>
            <button
              onClick={() => setCurrentRoute(c.ctaTarget as any)}
              className="text-amber-400 hover:text-white underline font-semibold flex items-center gap-1 ml-2"
            >
              <span>{c.ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 text-amber-500 text-xs font-mono tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.hero.tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal('register', 'investor');
                } else {
                  setCurrentRoute('dashboard');
                }
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.hero.startInvesting}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentRoute('investments')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0f0f0f] hover:bg-white/5 text-gray-200 font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.hero.explorePlans}</span>
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentRoute('deposit')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 font-medium text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Fund Account (Bank / Crypto)</span>
            </button>
          </motion.div>

          {/* Key Statistics Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {t.hero.statsAum}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Assets Under Custody</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-500 tracking-tight">
                {t.hero.statsInvestors}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Qualified Investors</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
                {t.hero.statsPayouts}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Yield Distributed</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-gray-200 tracking-tight">
                {t.hero.statsUptime}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Reconciled Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market & Capital Index Ticker */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 text-xs whitespace-nowrap">
          <div className="flex items-center gap-2 text-gray-400 shrink-0 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            <span>LIVE VALUATION FEEDS:</span>
          </div>
          <div className="flex items-center gap-8 text-gray-300 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">BTC/USD</span>
              <span className="text-white font-semibold">$64,280.00</span>
              <span className="text-amber-500 text-[11px]">+2.4%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">ETH/USD</span>
              <span className="text-white font-semibold">$3,490.50</span>
              <span className="text-amber-500 text-[11px]">+1.8%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">US 10Y Treasury</span>
              <span className="text-white font-semibold">4.18%</span>
              <span className="text-gray-500 text-[11px]">-3 bps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Euribor 3M</span>
              <span className="text-white font-semibold">3.62%</span>
              <span className="text-amber-500 text-[11px]">+1 bp</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Gold (XAU)</span>
              <span className="text-white font-semibold">$2,518.40</span>
              <span className="text-amber-500 text-[11px]">+0.6%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Yield Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f0f0f] border border-white/10 text-amber-500 text-xs font-mono uppercase">
                <Sliders className="w-3.5 h-3.5" />
                <span>Deterministic Returns Model</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Simulate Structured Portfolio Growth
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Calculate projected annualized cash flow based on audited vehicle terms and deterministic settlement schedules.
              </p>

              {/* Capital Allocation Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Investable Capital Allocation:</span>
                  <span className="font-mono font-bold text-xl text-white">
                    ${calcAmount.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="250000"
                  step="2500"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-[#050505] rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>$2,500</span>
                  <span>$100,000</span>
                  <span>$250,000+</span>
                </div>
              </div>

              {/* Vehicle Selection */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-medium">Select Investment Vehicle:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plans.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcPlanId(p.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        calcPlanId === p.id
                          ? 'bg-amber-500 text-black border-amber-500 font-bold shadow-md'
                          : 'bg-[#050505] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className={`truncate ${calcPlanId === p.id ? 'font-bold text-black' : 'font-semibold text-white'}`}>{p.name}</div>
                      <div className={`text-[11px] font-mono mt-0.5 ${calcPlanId === p.id ? 'text-black/80' : 'text-amber-500'}`}>{p.projectedApy}% Target APY • {p.durationDays}d</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Display Box */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-[#050505] border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block uppercase tracking-wider">Selected Vehicle</span>
                  <h3 className="font-serif text-lg font-bold text-white">{selectedPlan.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                  {selectedPlan.riskLevel} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-mono">Target Annual Yield</span>
                  <span className="font-mono text-2xl font-bold text-amber-500">
                    +{selectedPlan.projectedApy}% APY
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-mono">Term Commitment</span>
                  <span className="font-mono text-2xl font-bold text-white">
                    {selectedPlan.durationDays} Days
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Net Estimated Profit:</span>
                  <span className="font-mono font-bold text-amber-500 text-base">
                    +${projectedReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-white/10 pt-2">
                  <span className="text-white font-medium">Estimated Maturity Value:</span>
                  <span className="font-mono font-bold text-white text-lg">
                    ${totalMaturityValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPlanId(selectedPlan.id);
                    setCurrentRoute('investments');
                  }}
                  className="flex-1 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center"
                >
                  Allocate to Strategy
                </button>
                <button
                  onClick={() => setCurrentRoute('deposit')}
                  className="px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Fund Depository First
                </button>
              </div>

              <p className="text-[10px] text-gray-500 text-center font-mono">
                Projections are indicative and calculated before applicable custodial management fees (0.35% - 1.0%).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Investment Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
              Structured Capital Products
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Investment Vehicles
            </h2>
          </div>
          <button
            onClick={() => setCurrentRoute('investments')}
            className="text-xs font-semibold text-amber-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Marketplace Vehicles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">{plan.code}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    plan.riskLevel === 'Conservative' 
                      ? 'bg-white/5 text-gray-300 border-white/10' 
                      : plan.riskLevel === 'Moderate'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {plan.riskLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#050505] border border-white/10 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Projected Yield</span>
                    <span className="font-mono font-bold text-base text-amber-500">
                      {plan.projectedApy}% APY
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Term</span>
                    <span className="font-mono font-bold text-base text-white">
                      {plan.durationDays} Days
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Min. Allocation</span>
                    <span className="font-mono font-medium text-gray-300">
                      ${plan.minInvestment.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-mono">Liquidity</span>
                    <span className="font-mono font-medium text-gray-300">
                      {plan.liquidity}
                    </span>
                  </div>
                </div>

                {/* Asset Allocation Mini Bars */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">
                    Core Asset Exposure
                  </span>
                  <div className="w-full h-2 rounded-full bg-[#050505] flex overflow-hidden">
                    {plan.assetAllocation.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${item.percentage}%` }}
                        className={`${
                          idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-amber-700' : idx === 2 ? 'bg-gray-400' : 'bg-gray-700'
                        }`}
                        title={`${item.asset}: ${item.percentage}%`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {plan.assetAllocation[0].asset} ({plan.assetAllocation[0].percentage}%)
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setCurrentRoute('investments');
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow"
                >
                  Allocate Funds
                </button>
                <button
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setCurrentRoute('investments');
                  }}
                  className="p-2.5 rounded-lg bg-[#050505] border border-white/10 text-gray-300 hover:text-white text-xs"
                  title="Strategy Details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works 6-Step Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Execution Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How TradeVerge Operates
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            A frictionless, compliance-first lifecycle engineered for institutional safety and guaranteed ledger finality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Identity & KYC Screening</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Complete automated Tier 2 identity verification and AML sanctions screening. Documents are stored in encrypted cold vaults.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Depository Funding</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Transfer funds via admin-verified bank wire (SWIFT/SEPA) or crypto gateways (BTC/USDT). Upload reference proof for dual-custody verification.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Operator Ledger Credit</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Compliance officers verify depository receipts against bank records or blockchain confirmations, posting an immutable balanced ledger entry.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Deterministic Order Execution</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Select your structured plan. Cleared cash is allocated deterministically with unique broker/custodian execution tokens.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              05
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Accrual & Rebalancing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track valuation trajectories and yield settlements in real-time. Portfolios are dynamically rebalanced against target parameters.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#050505] text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-white/10">
              06
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Maturity & 2FA Redemption</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upon maturity, principal and yield settle to available cash. Withdraw directly to your verified bank or crypto wallet with 2FA step-up.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Security Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0a0a0a] border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Enterprise Safeguards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Calm Private-Wealth Architecture
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              No speculative hypes. No flashy retail noise. TradeVerge builds on mathematical order execution, multi-party computation (MPC) cold storage, and segregated depository accounts.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  <strong className="text-white">Authoritative Server Truth:</strong> Client interfaces are strictly display-only; no browser state can modify ledger balances or bypass verification.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  <strong className="text-white">Admin Separation of Duties:</strong> Multi-tiered operator review prevents self-approval and enforces four-eyes verification on all capital outflows.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  <strong className="text-white">Append-Only Audit Logs:</strong> Every action, login, transaction, and config modification is immutably timestamped with IP and actor fingerprints.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentRoute('security')}
                className="px-5 py-2.5 rounded-lg bg-[#050505] border border-white/10 hover:border-amber-500/40 text-xs font-semibold text-white transition-all flex items-center gap-2"
              >
                <span>Read Full Security Architecture Brief</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>
          </div>

          {/* Security Spec Mockup */}
          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                <span className="text-gray-300 font-semibold">LEDGER INTEGRITY VERIFIER</span>
              </div>
              <span className="text-[10px] text-amber-500">STATUS: RECONCILED</span>
            </div>

            <div className="space-y-2 text-[11px] text-gray-400 leading-relaxed">
              <div className="flex justify-between">
                <span>Total Assets Under Custody:</span>
                <span className="text-white font-mono">$482,910,419.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Depository Bank Reserves:</span>
                <span className="text-white font-mono">$318,400,000.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>MPC Cold Vault Reserves:</span>
                <span className="text-white font-mono">$164,510,419.00 USD</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-amber-500">
                <span>Ledger Variance / Break:</span>
                <span className="font-bold font-mono">$0.00 (Zero Drift)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-[10px] text-gray-400">
              [SHA-256 State Root]: 8f9b204c3e819fa041b28c8942e19a009418ca12ef90184
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Client Inquiries
          </span>
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-amber-500 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-2xl bg-[#0a0a0a] border border-white/10 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto">
            Experience Disciplined Wealth Management
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Open an institutional account in under 3 minutes. Complete KYC Tier 2 and fund directly via verified banking wire or cryptocurrency gateways.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal('register', 'investor');
                } else {
                  setCurrentRoute('dashboard');
                }
              }}
              className="px-8 py-3.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer"
            >
              Open Investor Account
            </button>
            <button
              onClick={() => setCurrentRoute('deposit')}
              className="px-8 py-3.5 rounded-lg bg-[#050505] border border-white/10 text-gray-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Deposit Funds
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
