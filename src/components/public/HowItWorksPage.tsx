import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  ShieldCheck, 
  ArrowRight,
  Database,
  Lock,
  Layers,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentRoute, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const hwT = pageT.publicPages.howItWorks;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {hwT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {hwT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {hwT.subtitle}
        </p>
      </div>

      {/* Multi-Step Interactive Flow */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {hwT.steps.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Step Number Dot */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 rounded-full bg-[#0a0a0a] border-2 border-amber-500 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              {step.step}
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 transition-all space-y-2">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Security & Verification Card */}
      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-amber-500 text-xs font-mono font-semibold uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>{hwT.securityBadge}</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-white">
          {hwT.securityTitle}
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
          {hwT.securityDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {hwT.securityPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0a0a0a] to-[#050505] border border-amber-500/30 text-center space-y-4 shadow-2xl">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          {hwT.ctaTitle}
        </h3>
        <p className="text-xs text-gray-300 max-w-md mx-auto">
          {hwT.ctaDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            {hwT.ctaButton}
          </button>
          <button
            onClick={() => setCurrentRoute('investments')}
            className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-stone-200 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {hwT.explorePlansButton}
          </button>
        </div>
      </div>
    </div>
  );
};
