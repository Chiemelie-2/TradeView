import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  X, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Fingerprint 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'investor' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole = 'investor' }) => {
  const { language, login, showToast } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const authT = pageT.auth;

  const [selectedRole, setSelectedRole] = useState<'investor' | 'admin'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default role when opening
  React.useEffect(() => {
    if (isOpen) {
      setSelectedRole(defaultRole);
      if (defaultRole === 'admin') {
        setEmail('admin@tradeverge.live');
        setPassword('••••••••••••');
      } else {
        setEmail('a.montgomery@vancecapital.org');
        setPassword('••••••••••••');
      }
    }
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleRoleTabChange = (role: 'investor' | 'admin') => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@tradeverge.live');
      setPassword('••••••••••••');
    } else {
      setEmail('a.montgomery@vancecapital.org');
      setPassword('••••••••••••');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Authentication Error', 'Please enter your authorized email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(email, password, selectedRole);
      setIsSubmitting(false);
      if (result.success) {
        showToast('Authentication Verified', authT.loggedInSuccess, 'success');
        onClose();
      } else {
        showToast('Access Denied', result.message || authT.invalidCredentials, 'danger');
      }
    }, 450);
  };

  const handleQuickDemoInvestor = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login('a.montgomery@vancecapital.org', 'demo123', 'investor');
      setIsSubmitting(false);
      showToast('Investor Portal Unlocked', 'Authenticated as Sir Arthur Montgomery (Family Office Tier 2).', 'success');
      onClose();
    }, 250);
  };

  const handleQuickDemoAdmin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login('admin@tradeverge.live', 'admin123', 'admin');
      setIsSubmitting(false);
      showToast('Admin Clearance Granted', 'Authenticated as Marcus Vance (Chief Compliance Officer).', 'success');
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Top Banner Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {selectedRole === 'admin' ? authT.adminTitle : authT.investorTitle}
                </h3>
                <p className="text-xs text-stone-400">
                  {selectedRole === 'admin' ? authT.adminDesc : authT.investorDesc}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Explicit Role Tabs for Strict Separation */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#050505] rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => handleRoleTabChange('investor')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'investor'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{authT.investorTab}</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{authT.adminTab}</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center justify-between">
              <span>{authT.emailLabel}</span>
              {selectedRole === 'admin' && (
                <span className="text-[10px] text-amber-500 font-mono font-semibold">@tradeverge.live only</span>
              )}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'admin' ? 'admin@tradeverge.live' : 'investor@vancecapital.org'}
                className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center justify-between">
              <span>{authT.passwordLabel}</span>
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <Fingerprint className="w-3 h-3 text-emerald-400" />
                {authT.twoFaBadge}
              </span>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Session Settings */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-400 hover:text-stone-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-black text-amber-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span>{authT.rememberMe}</span>
            </label>
            <span className="text-stone-500 text-[11px] hover:text-amber-400 cursor-pointer">
              {authT.forgotPassword}
            </span>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
          >
            {isSubmitting ? (
              <span>{authT.signingIn}</span>
            ) : (
              <>
                <span>{authT.signInButton}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Differentiated Role Notice */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-400 leading-relaxed">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p>{authT.roleDifferentiatedNotice}</p>
            </div>
          </div>

          {/* Quick Demo Role Buttons for Effortless Verification */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold text-center">
              {authT.demoCredentialsTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoInvestor}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white group-hover:text-amber-400">Investor Role</span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[10px] text-stone-400 truncate">Arthur Montgomery</div>
                <div className="text-[9px] text-stone-500 font-mono">Unlocks Investor Portal</div>
              </button>

              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-amber-400">Admin Role</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-[10px] text-stone-300 truncate">Marcus Vance (CCO)</div>
                <div className="text-[9px] text-amber-500/80 font-mono">Unlocks Admin Console</div>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
