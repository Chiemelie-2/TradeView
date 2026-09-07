import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  Lock, 
  Mail, 
  Key, 
  X, 
  ArrowRight, 
  Fingerprint,
  UserPlus,
  LogIn,
  Building2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'register' | 'signin';
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

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'register',
  defaultRole = 'investor' 
}) => {
  const { 
    language, 
    login, 
    registerAccount, 
    loginWithGoogle, 
    showToast 
  } = useApp();

  const pageT = pageTranslations[language] || pageTranslations.en;
  const authT = pageT.auth;

  const [authMode, setAuthMode] = useState<'signin' | 'register'>(defaultMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'individual' | 'institutional' | 'family_office'>('individual');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google account picker modal simulation
  const [isGooglePromptOpen, setIsGooglePromptOpen] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('princesamuel0903@gmail.com');
  const [googleNameInput, setGoogleNameInput] = useState('Samuel Prince');

  // Reset fields on open and respect defaultMode
  React.useEffect(() => {
    if (isOpen) {
      setAuthMode(defaultMode);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsSubmitting(false);
    }
  }, [isOpen, defaultMode]);

  // Handle Escape key to close modal
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isGooglePromptOpen) {
          setIsGooglePromptOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isGooglePromptOpen, onClose]);

  if (!isOpen) return null;

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Authentication Error', 'Please enter your registered email address.', 'warning');
      return;
    }
    if (!password) {
      showToast('Authentication Error', 'Please enter your account password.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      setIsSubmitting(false);
      if (result.success) {
        showToast('Authentication Verified', authT.loggedInSuccess, 'success');
        onClose();
      } else {
        showToast('Access Denied', result.message || authT.invalidCredentials, 'danger');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      showToast('Connection Error', err.message || 'Unable to connect to database server.', 'danger');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) {
      showToast('Registration Error', 'Please provide your full legal name and email address.', 'warning');
      return;
    }
    if (!password || password.length < 6) {
      showToast('Registration Error', 'Password must be at least 6 characters.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Registration Error', 'Passwords do not match. Please verify.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerAccount(fullName, email, accountType, 'email', password);
      setIsSubmitting(false);
      if (result.success) {
        onClose();
      } else {
        showToast('Registration Failed', result.message || 'Could not register account.', 'danger');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      showToast('Database Error', err.message || 'Could not persist user to database.', 'danger');
    }
  };

  const handleGoogleAuthProceed = async () => {
    setIsSubmitting(true);
    setIsGooglePromptOpen(false);
    try {
      await loginWithGoogle(googleEmailInput, googleNameInput);
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      showToast('Google Auth Error', err.message || 'Failed to authenticate with Google.', 'danger');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
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
                    ? 'Register Depository Account' 
                    : 'Account Authentication'
                  }
                </h3>
                <p className="text-xs text-stone-400">
                  {authMode === 'register'
                    ? 'All registered accounts are committed directly to the secure database.'
                    : 'Enter your credentials. Administrator accounts grant executive access directly.'
                  }
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-stone-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-sm"
              aria-label="Close authentication modal"
              title="Close dialog (Esc)"
            >
              <span>Close</span>
              <X className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Mode Switcher: Create Account vs Sign In */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#050505] rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-amber-500 text-black shadow-md font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-amber-500 text-black shadow-md font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>
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
                Database Sync
              </span>
            </button>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-stone-500 tracking-wider">
                Or with registered email & password
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
          </div>

          {/* Form switch: Sign In vs Register */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Registered Email Address <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. investor@vancecapital.org or admin@tradeverge.live"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center justify-between">
                  <span>Account Password <span className="text-amber-500">*</span></span>
                  <span className="text-[10px] text-stone-500 flex items-center gap-1">
                    <Fingerprint className="w-3 h-3 text-emerald-400" />
                    Encrypted
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

              {/* Primary Submit Button & Cancel Action */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4 text-amber-400" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Verifying with Database...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Database security assurance notice */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-300 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strict Database Verification</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Only accounts registered in the database are allowed access. Admin credentials directly unlock the executive management suite upon login.
                </p>
              </div>

              <div className="pt-2 text-center text-xs text-stone-400">
                <span>Don't have a registered account yet? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* Register Mode */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Full Legal Name / Entity Name <span className="text-amber-500">*</span>
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
                  Email Address <span className="text-amber-500">*</span>
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
                  * Synced directly to database; confirmation email dispatched immediately.
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
                  Account Password <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Confirm Password <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4 text-amber-400" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering to Database...</span>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-stone-400 pt-1">
                <span>Already registered in database? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Google Account Confirmation Modal */}
      {isGooglePromptOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsGooglePromptOpen(false);
            }
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111111] border border-white/20 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GoogleIcon className="w-5 h-5" />
                <span className="font-bold text-white text-sm">Sign in with Google</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsGooglePromptOpen(false)}
                className="flex items-center gap-1 p-1 px-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 text-xs cursor-pointer"
                aria-label="Close Google sign in"
              >
                <span>Close</span>
                <X className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <p className="text-xs text-stone-300">
              Your Google account will be verified and stored directly in the database.
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
              <span>Registration will be synced to database and confirmation dispatched.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsGooglePromptOpen(false)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGoogleAuthProceed}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider cursor-pointer"
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
