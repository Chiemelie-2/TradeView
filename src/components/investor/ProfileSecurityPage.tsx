import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { Shield, KeyRound, Smartphone, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ProfileSecurityPage: React.FC = () => {
  const { user, setUser, showToast, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const profT = pageT.investorPages.profile;

  const [twoFaActive, setTwoFaActive] = useState(user.twoFactorEnabled);

  const toggle2Fa = () => {
    const nextState = !twoFaActive;
    setTwoFaActive(nextState);
    setUser(prev => ({ ...prev, twoFactorEnabled: nextState }));
    showToast(
      nextState ? '2FA Enabled' : '2FA Disabled',
      nextState ? 'Two-factor authenticator protection is active for all withdrawals.' : 'Warning: Two-factor authentication has been disabled.',
      nextState ? 'success' : 'warning'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
          {profT.badge}
        </span>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          {profT.title}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          {profT.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">{profT.cardProfile}</h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-500 block font-mono">Full Name:</span>
              <span className="font-semibold text-white text-sm">{user.fullName}</span>
            </div>
            <div>
              <span className="text-gray-500 block font-mono">Email Address:</span>
              <span className="font-semibold text-white">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-500 block font-mono">User ID / Reference:</span>
              <span className="font-mono text-amber-400">{user.id}</span>
            </div>
            <div>
              <span className="text-gray-500 block font-mono">Compliance Tier:</span>
              <span className="font-semibold text-amber-400">Tier {user.kycTier} Accredited</span>
            </div>
          </div>
        </div>

        {/* 2FA Security Card */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">{profT.card2Fa}</h3>
              <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                twoFaActive ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-rose-950/50 text-rose-400 border border-rose-500/40'
              }`}>
                {twoFaActive ? 'ACTIVE' : 'DISABLED'}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Require a time-based one-time password (TOTP) from Google Authenticator or hardware YubiKey on every capital withdrawal.
            </p>
          </div>

          <button
            onClick={toggle2Fa}
            className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              twoFaActive
                ? 'bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
                : 'bg-amber-500 hover:bg-amber-400 text-black'
            }`}
          >
            {twoFaActive ? 'Disable Authenticator' : profT.enable2Fa}
          </button>
        </div>
      </div>

      {/* Active Hardware Sessions */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-4">
        <h3 className="font-serif text-lg font-bold text-white">{profT.activeSessions}</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                <span>MacBook Pro (macOS 15.0 - Chrome)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono">Current Session</span>
              </div>
              <span className="text-[11px] font-mono text-gray-500">IP: 198.51.100.82 • Zurich, Switzerland</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">Active Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
