import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { ShieldCheck, Lock, Landmark, FileText, ChevronRight, Globe, CheckCircle2 } from 'lucide-react';
import { languageList } from '../../i18n/translations';
import { pageTranslations } from '../../i18n/pageTranslations';

export const Footer: React.FC = () => {
  const { 
    setCurrentRoute, 
    setLanguage, 
    language, 
    isAuthenticated, 
    user, 
    openAuthModal 
  } = useApp();

  const pageT = pageTranslations[language] || pageTranslations.en;
  const fT = pageT.footer;

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminConsoleClick = () => {
    if (isAuthenticated && user.role === 'admin') {
      navigate('admin');
    } else {
      openAuthModal('admin');
    }
  };

  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-white/10 text-xs mt-auto">
      {/* Institutional Reassurance Bar */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-amber-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{fT.segregatedLedgers}</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                {fT.segregatedLedgersDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-amber-500 shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{fT.tier1Custody}</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                {fT.tier1CustodyDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-amber-500 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{fT.deterministicExecution}</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                {fT.deterministicExecutionDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-amber-500 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{fT.continuousSettlement}</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                {fT.continuousSettlementDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-black font-black shadow-md">
                <span className="font-serif font-black text-sm text-black tracking-wider">TV</span>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight uppercase italic">
                TradeVerge<span className="text-amber-500">.live</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {fT.brandDesc}
            </p>
            
            {/* 10 Language Select Pill */}
            <div className="pt-2">
              <label className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Localized Language (10 Regions)</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-[#0f0f0f] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {languageList.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Investment Vehicles */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              {fT.colInvestments}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('investments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sovereign Treasury Alpha
                </button>
              </li>
              <li>
                <button onClick={() => navigate('investments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Quantitative Market-Neutral
                </button>
              </li>
              <li>
                <button onClick={() => navigate('investments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Private Credit & Senior Debt
                </button>
              </li>
              <li>
                <button onClick={() => navigate('investments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Clean Energy Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => navigate('investments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Pre-IPO Private Equity
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              {fT.colPlatform}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('how_it_works')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  How It Works (11 Steps)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pricing')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Pricing & Custody Fees
                </button>
              </li>
              <li>
                <button onClick={() => navigate('security')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Multi-Sig Cold Storage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('education')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Wealth Research & Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Corporate Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Gateways & Protected Admin Link */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              {fT.colPortals}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('dashboard')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Investor Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('deposit')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Bank & Crypto Deposit
                </button>
              </li>
              <li>
                <button onClick={() => navigate('kyc')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  KYC Onboarding
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Institutional Concierge Desk
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAdminConsoleClick}
                  className="text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Admin Control Console</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers from TradeVerge Specification */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4 text-[11px] text-gray-500 leading-relaxed">
          <p className="p-3.5 rounded-xl bg-[#0f0f0f] border border-white/10 text-gray-400 font-mono text-[10px]">
            <strong className="text-white uppercase">Authoritative System Statement:</strong> {fT.disclaimerTitle}
          </p>
          <p>
            {fT.disclaimerBody}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-gray-400">
            <p>© {new Date().getFullYear()} TradeVerge.live Capital Markets Group. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => navigate('legal')} className="hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </button>
              <button onClick={() => navigate('legal')} className="hover:text-white transition-colors cursor-pointer">
                Privacy Notice
              </button>
              <button onClick={() => navigate('legal')} className="hover:text-white transition-colors cursor-pointer">
                AML / KYC Policy
              </button>
              <button onClick={() => navigate('legal')} className="hover:text-white transition-colors cursor-pointer">
                Risk Disclosure
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
