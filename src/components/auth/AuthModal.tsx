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
  Briefcase, 
  Fingerprint,
  UserPlus,
  LogIn,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'investor' | 'admin';
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole = 'investor' }) => {
  const { 
    language, 
    login, 
    registerAccount, 
    loginWithGoogle, 
    showToast 
  } = useApp();

  const pageT = pageTranslations[language] || pageTranslations.en;
  const authT = pageT.auth;

  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [selectedRole, setSelectedRole] = useState<'investor' | 'admin'>(defaultRole);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'individual' | 'institutional' | 'family_office'>('individual');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google account picker modal simulation
  const [isGooglePromptOpen, setIsGooglePromptOpen] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('princesamuel0903@gmail.com');
  const [googleNameInput, setGoogleNameInput] = useState('Samuel Prince');

  // Sync default credentials
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

  const handleSignInSubmit = (e: React.FormEvent) => {
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
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) {
      showToast('Registration Error', 'Please provide your full legal name and email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerAccount(fullName, email, accountType, 'email', password);
      setIsSubmitting(false);
      onClose();
    }, 450);
  };

  const handleGoogleAuthProceed = () => {
    setIsSubmitting(true);
    setIsGooglePromptOpen(false);
    setTimeout(() => {
      loginWithGoogle(googleEmailInput, googleNameInput);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const handleQuickDemoInvestor = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login('a.montgomery@vancecapital.org', 'demo123', 'investor');
      setIsSubmitting(false);
      showToast('Investor Portal Unlocked', 'Authenticated as Sir Arthur Montgomery (Family Office Tier 2).', 'success');
      onClose();
    }, 200);
  };

  const handleQuickDemoAdmin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login('admin@tradeverge.live', 'admin123', 'admin');
      setIsSubmitting(false);
      showToast('Admin Clearance Granted', 'Authenticated as Marcus Vance (Chief Compliance Officer).', 'success');
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {authMode === 'register' 
                    ? 'Register Institutional Depository Account' 
                    : (selectedRole === 'admin' ? authT.adminTitle : authT.investorTitle)
                  }
                </h3>
                <p className="text-xs text-stone-400">
                  {authMode === 'register'
                    ? 'Automatic verification email dispatched upon registration.'
                    : (selectedRole === 'admin' ? authT.adminDesc : authT.investorDesc)
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher: Sign In vs Register */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#050505] rounded-xl border border-white/5 mb-3">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Client Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Account</span>
            </button>
          </div>

          {/* Role selector in signin mode */}
          {authMode === 'signin' && (
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#050505]/50 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => handleRoleTabChange('investor')}
                className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedRole === 'investor'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3 h-3 text-amber-400" />
                <span>{authT.investorTab}</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabChange('admin')}
                className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3 h-3 text-amber-500" />
                <span>{authT.adminTab}</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* Prominent Google Single Sign-On Button */}
          <div>
            <button
              type="button"
              onClick={() => setIsGooglePromptOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm hover:border-white/30 cursor-pointer group"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>{authMode === 'register' ? 'Register with Google Account' : 'Continue with Google'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono ml-auto">
                Instant Verification
              </span>
            </button>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-stone-500 tracking-wider">
                Or continue with institutional email
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
          </div>

          {/* Form switch: Sign In vs Register */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
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

              {/* Quick Demo Credentials */}
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
          ) : (
            /* Register Mode */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Full Legal Name / Entity Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Samuel Prince / Vance Family Office LLC"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. princesamuel0903@gmail.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <span className="text-[10px] text-amber-400/90 mt-1 block">
                  * An official cryptographic confirmation email will be delivered to this address upon registration.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Account Classification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'individual', label: 'Accredited Individual' },
                    { id: 'institutional', label: 'Institutional Entity' },
                    { id: 'family_office', label: 'Family Office' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAccountType(t.id as any)}
                      className={`p-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                        accountType === t.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-[#050505] border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Account Password / Master Passphrase
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create robust passphrase"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Registration Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-stone-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    By registering, an off-balance-sheet segregated custodial sub-ledger is provisioned. An automated onboarding confirmation with your Depository ID and verification token will be dispatched to your email immediately.
                  </p>
                </div>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Dispatching Registration...</span>
                ) : (
                  <>
                    <span>Register Account & Send Verification Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>

      {/* Google Account Confirmation Modal */}
      {isGooglePromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/20 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GoogleIcon className="w-5 h-5" />
                <span className="font-bold text-white text-sm">Sign in with Google</span>
              </div>
              <button 
                onClick={() => setIsGooglePromptOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-300">
              TradeVerge Private Wealth will verify your email and provision your segregated custodial account.
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Google Email Address</label>
                <input
                  type="email"
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Automated registration confirmation will be sent to this email.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsGooglePromptOpen(false)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGoogleAuthProceed}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
              >
                Verify & Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
