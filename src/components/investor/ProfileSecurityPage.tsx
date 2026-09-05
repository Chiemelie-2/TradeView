import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  Shield, 
  KeyRound, 
  Smartphone, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Mail,
  Globe,
  MessageSquare,
  Key,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { isSmartsuppConfigured } from '../../services/smartsuppService';
import { isGoogleTranslateConfigured } from '../../services/googleTranslate';

export const ProfileSecurityPage: React.FC = () => {
  const { 
    user, 
    setUser, 
    showToast, 
    language,
    openGoogleVerifyModal,
    openEmailModal,
    openSmartsuppModal,
    openTranslateModal
  } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const profT = pageT.investorPages.profile;

  const [twoFaActive, setTwoFaActive] = useState(user.twoFactorEnabled);
  const smartsuppReady = isSmartsuppConfigured();
  const translateReady = isGoogleTranslateConfigured();

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

      {/* Google Email Verification & Registration Confirmation Card */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-emerald-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>Google Email Verification</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                  Confirmed
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Authorized identity credential linked to TradeVerge institutional registry
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openGoogleVerifyModal}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors cursor-pointer border border-white/10"
            >
              Inspect Certificate
            </button>
            <button
              onClick={openEmailModal}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              View Verification Email
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-500 block">Registered Email</span>
            <span className="font-semibold text-white truncate block mt-0.5">{user.email}</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <CheckCircle2 className="w-3 h-3" /> Delivery Confirmed
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-500 block">Depository ID</span>
            <span className="font-mono text-amber-400 block mt-0.5">{user.depositoryAccountId || 'TV-CH-99482-DEPO'}</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-mono">Segregated Escrow</span>
          </div>
          <div className="p-3 rounded-xl bg-[#050505] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-gray-500 block">Auth Channel</span>
            <span className="font-semibold text-white block mt-0.5">Google OAuth & Verified SMTP</span>
            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
              {user.emailVerifiedAt ? new Date(user.emailVerifiedAt).toLocaleDateString() : 'Verified Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Integration API Keys (Google Cloud Translator & Smartsupp) */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-5">
        <div>
          <h3 className="font-serif text-lg font-bold text-white">Client API & Service Integrations</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure your personal API keys for Google Cloud Translation and Smartsupp Live Chat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Google Cloud Translator */}
          <div className="p-4 rounded-xl bg-[#050505] border border-blue-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Google Cloud Translator</h4>
                  <span className="text-[10px] text-gray-400">v2 Neural Translation API</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                translateReady 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
                {translateReady ? 'CONFIGURED' : 'KEY PENDING'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Enables continuous neural translations across 10 official languages with custom quota tracking.
            </p>
            <button
              type="button"
              onClick={openTranslateModal}
              className="w-full py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{translateReady ? 'Update Google Cloud API Key' : 'Add Google Cloud API Key'}</span>
            </button>
          </div>

          {/* Smartsupp Live Chat */}
          <div className="p-4 rounded-xl bg-[#050505] border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Smartsupp Live Chat</h4>
                  <span className="text-[10px] text-gray-400">Real-time Operator Widget</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                smartsuppReady 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
                {smartsuppReady ? 'ACTIVE' : 'KEY PENDING'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Injects the official Smartsupp client script for direct agent chat, visitor tracking, and offline routing.
            </p>
            <button
              type="button"
              onClick={openSmartsuppModal}
              className="w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{smartsuppReady ? 'Manage Smartsupp Key' : 'Add Smartsupp Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
