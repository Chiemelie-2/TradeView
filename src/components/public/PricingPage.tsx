import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { Check, ShieldCheck, Zap } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setCurrentRoute, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const prT = pageT.publicPages.pricing;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {prT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {prT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {prT.subtitle}
        </p>
      </div>

      {/* Fee Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Depository Inflows */}
        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              {prT.cardInflowsTag}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {prT.cardInflowsTitle}
            </h3>
            <div className="pt-2">
              <span className="font-serif text-5xl font-bold text-white">0%</span>
              <span className="text-gray-400 text-xs block mt-1">
                {prT.cardInflowsFeeLabel}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-white/10">
              {prT.cardInflowsFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setCurrentRoute('deposit')}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
          >
            {prT.cardInflowsCta}
          </button>
        </div>

        {/* Custodial Management */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-[#0a0a0a] border-2 border-amber-500 space-y-6 flex flex-col justify-between relative shadow-2xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow">
            {prT.cardManagementTag}
          </div>
          <div className="space-y-4">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
              {prT.cardManagementTag}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {prT.cardManagementTitle}
            </h3>
            <div className="pt-2">
              <span className="font-serif text-5xl font-bold text-white">0.35%</span>
              <span className="text-gray-400 text-xs block mt-1">
                {prT.cardManagementFeeLabel}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-white/10">
              {prT.cardManagementFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setCurrentRoute('investments')}
            className="w-full py-3 rounded-xl bg-white hover:bg-stone-200 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            {prT.cardManagementCta}
          </button>
        </div>

        {/* Capital Redemptions */}
        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              {prT.cardOutflowsTag}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {prT.cardOutflowsTitle}
            </h3>
            <div className="pt-2">
              <span className="font-serif text-5xl font-bold text-white">0.25%</span>
              <span className="text-gray-400 text-xs block mt-1">
                {prT.cardOutflowsFeeLabel}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-white/10">
              {prT.cardOutflowsFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setCurrentRoute('withdraw')}
            className="w-full py-3 rounded-xl bg-[#050505] border border-white/10 hover:border-amber-500 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {prT.cardOutflowsCta}
          </button>
        </div>
      </div>
    </div>
  );
};
