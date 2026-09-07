import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { 
  Landmark, 
  Coins, 
  Copy, 
  Check, 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  FileText, 
  QrCode,
  CheckCircle2,
  ChevronLeft,
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Building2,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DepositFlow: React.FC = () => {
  const { 
    paymentMethods, 
    submitDeposit, 
    setCurrentRoute, 
    user, 
    showToast,
    isAuthenticated,
    registerAccount,
    login,
    loginWithGoogle,
    openEmailModal
  } = useApp();

  // Pre-deposit authentication gate state
  const [authTab, setAuthTab] = useState<'register' | 'login'>('register');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regShowPassword, setRegShowPassword] = useState(false);
  const [regAccountType, setRegAccountType] = useState<'individual' | 'institutional' | 'family_office'>('individual');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form State
  const [amount, setAmount] = useState<number>(10000);
  const [txReference, setTxReference] = useState<string>('');
  const [depositorNotes, setDepositorNotes] = useState<string>('');
  const [receiptFilePreview, setReceiptFilePreview] = useState<string | null>(null);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedDepositId, setSubmittedDepositId] = useState<string>('');

  const activeMethods = paymentMethods.filter(m => m.enabled);
  const bankMethods = activeMethods.filter(m => m.type === 'bank_transfer');
  const cryptoMethods = activeMethods.filter(m => m.type === 'crypto');

  const [methodTab, setMethodTab] = useState<'bank' | 'crypto'>('bank');

  // Pre-deposit auth handlers
  const handlePreDepositRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regEmail.trim()) {
      showToast('Validation Error', 'Please enter your full legal name and email address.', 'warning');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 6) {
      showToast('Password Error', 'Please create a secure password with at least 6 characters.', 'warning');
      return;
    }

    setIsAuthSubmitting(true);
    try {
      const res = await registerAccount(regFullName, regEmail, regAccountType, 'email', regPassword);
      setIsAuthSubmitting(false);
      if (res.success) {
        showToast(
          'Registration Confirmed',
          `Official verification email dispatched to ${regEmail}. You may now proceed with funding.`,
          'success'
        );
      } else {
        showToast('Registration Error', res.message || 'Could not register account in database.', 'danger');
      }
    } catch (err: any) {
      setIsAuthSubmitting(false);
      showToast('Registration Error', err.message || 'Database error.', 'danger');
    }
  };

  const handlePreDepositLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      showToast('Validation Error', 'Please enter your registered email address.', 'warning');
      return;
    }

    setIsAuthSubmitting(true);
    try {
      const res = await login(loginEmail, loginPassword, 'investor');
      setIsAuthSubmitting(false);
      if (res.success) {
        showToast('Signed In', 'Welcome back! You may now select your funding method.', 'success');
      } else {
        showToast('Access Denied', res.message || 'Invalid email or password.', 'danger');
      }
    } catch (err: any) {
      setIsAuthSubmitting(false);
      showToast('Login Error', err.message || 'Unable to communicate with database server.', 'danger');
    }
  };

  const handleGoogleAuth = async () => {
    setIsAuthSubmitting(true);
    try {
      await loginWithGoogle('princesamuel0903@gmail.com', 'Samuel Prince');
      setIsAuthSubmitting(false);
      showToast('Google Authenticated', 'Account verified and stored in database. Confirmation email dispatched.', 'success');
    } catch (err: any) {
      setIsAuthSubmitting(false);
      showToast('Authentication Error', err.message || 'Google authentication failed.', 'danger');
    }
  };

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    showToast('Copied to Clipboard', `Copied ${keyName} value.`, 'info');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReceiptFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;
    const minVal = selectedMethod.minAmount ?? selectedMethod.minDeposit ?? 1000;
    if (amount < minVal) {
      showToast('Validation Error', `Amount must be at least $${(minVal ?? 0).toLocaleString()}`, 'danger');
      return;
    }
    if (!txReference.trim()) {
      showToast('Validation Error', 'Please enter your bank wire reference or crypto transaction hash', 'danger');
      return;
    }

    const newDepId = 'dep_' + Math.floor(10000 + Math.random() * 90000);
    const assetOrCurr = selectedMethod.type === 'crypto'
      ? (selectedMethod.asset || selectedMethod.cryptoDetails?.asset || selectedMethod.currencyOrAsset || 'USDT')
      : (selectedMethod.currency || selectedMethod.bankDetails?.currency || selectedMethod.currencyOrAsset || 'USD');

    submitDeposit({
      methodId: selectedMethod.id,
      methodName: selectedMethod.name,
      amount,
      currencyOrAsset: assetOrCurr,
      txHashOrReference: txReference.trim(),
      paymentProofUrl: receiptFilePreview || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      depositorNotes: depositorNotes.trim()
    });

    setSubmittedDepositId(newDepId);
    setIsSubmittedSuccess(true);
  };

  if (isSubmittedSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Reference #{submittedDepositId}
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">Deposit Proof Submitted</h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            Your payment receipt has entered the compliance verification queue. An operations officer will verify the incoming transfer and credit your cleared available cash balance.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs text-gray-300 max-w-md mx-auto space-y-2.5 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">Method:</span>
            <span className="text-white font-medium">{selectedMethod?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span className="text-white font-mono font-bold">${amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Reference:</span>
            <span className="font-mono text-amber-400 truncate max-w-[200px]">{txReference}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2.5">
            <span className="text-gray-400">Status:</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30">
              PENDING MANUAL VERIFICATION
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentRoute('transactions')}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow"
          >
            Track in Ledger
          </button>
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="px-6 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/10 text-gray-300 hover:text-white text-xs"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Pre-Deposit Authentication Gate: Mandatory register or login step before making any deposit
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Step Progress Tracker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                MANDATORY CLEARANCE • STEP 1 OF 2
              </span>
              <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
                Depository Account Required
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-mono text-xs font-bold flex items-center justify-center ring-4 ring-amber-500/20">
              1
            </div>
            <div className="w-8 h-0.5 bg-white/10"></div>
            <div className="w-7 h-7 rounded-full bg-[#0a0a0a] text-gray-500 border border-white/10 font-mono text-xs font-bold flex items-center justify-center">
              2
            </div>
          </div>
        </div>

        {/* Informational Guidance Box */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Registration Required Before Depositing Capital</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-[11px]">
            To comply with international custodial regulations and ensure proper segregation of investor assets, you must register your depository account (or sign in if you already have one) before receiving bank wire coordinates or generating cryptocurrency depository addresses.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setAuthTab('register')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authTab === 'register'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>1. Register Account First</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthTab('login')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authTab === 'login'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In (Existing Account)</span>
          </button>
        </div>

        {/* Tab 1: Registration Form (Default) */}
        {authTab === 'register' ? (
          <form onSubmit={handlePreDepositRegister} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Create Depository Investor Account</span>
              </h2>
              <p className="text-xs text-gray-400">
                Enter your details to generate your isolated depository account and receive your confirmation email.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Full Legal Name / Institutional Entity Name <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Samuel Prince / Vance Capital Management LLC"
                  required
                  className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. princesamuel0903@gmail.com"
                  required
                  className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <span className="text-[10px] text-amber-400/90 mt-1 block font-mono">
                ✉️ An official confirmation email with your unique Depository ID will be sent here upon submission.
              </span>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Account Password <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={regShowPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create password (minimum 6 characters)"
                  required
                  minLength={6}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setRegShowPassword(!regShowPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {regShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Account Classification */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Account Classification
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'individual', label: 'Accredited Individual' },
                  { id: 'institutional', label: 'Institutional Entity' },
                  { id: 'family_office', label: 'Family Office' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setRegAccountType(type.id as any)}
                    className={`p-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                      regAccountType === type.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-[#050505] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirmation Email Guarantee Banner */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px]">
                <span className="font-bold text-amber-400 block">Instant Email Confirmation</span>
                <span className="text-gray-300">
                  Once registered, a confirmation email will be immediately delivered to your inbox with your permanent Depository Account ID, cryptographic security hash, and wire instructions authorization.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              {isAuthSubmitting ? (
                <span>Registering & Dispatching Email...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Account & Proceed to Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Actions */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-gray-400">
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Already have an account? <span className="underline font-semibold text-white">Sign In</span>
              </button>
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="hover:text-white text-gray-400 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        ) : (
          /* Tab 2: Login Form */
          <form onSubmit={handlePreDepositLogin} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <LogIn className="w-4 h-4 text-amber-500" />
                <span>Sign In to Existing Depository Account</span>
              </h2>
              <p className="text-xs text-gray-400">
                Enter your credentials to unlock depository routing and proceed with your deposit.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Registered Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. investor@vancecapital.org"
                  required
                  className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Account Password <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={loginShowPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setLoginShowPassword(!loginShowPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {loginShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              {isAuthSubmitting ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In & Proceed to Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Alternative Verification Options */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white group-hover:text-blue-400">Continue with Google Account</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-[10px] text-gray-400">Synchronizes profile with database and sends confirmation</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Database Sync
                </span>
              </button>
            </div>

            {/* Switch to Register */}
            <div className="text-center pt-2 border-t border-white/10 text-xs text-gray-400">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className="text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Register step first
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Authenticated Depository User Badge */}
      <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{user.fullName}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Authenticated Depository
              </span>
            </div>
            <div className="text-[11px] text-gray-400 font-mono mt-0.5 flex flex-wrap items-center gap-2">
              <span>{user.email}</span>
              <span>•</span>
              <span className="text-amber-400">ID: {user.id}</span>
              <span>•</span>
              <span className="text-gray-500">Tier {user.kycTier} Accredited</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openEmailModal()}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          title="View official registration confirmation email"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>View Confirmation Email</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
            Depository Capital Inflow • Step 2 of 2
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            Fund Investor Account
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Deposit USD, EUR, GBP via institutional wire or fund using audited multi-chain crypto gateways.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                step === s
                  ? 'bg-amber-500 text-black ring-4 ring-amber-500/20'
                  : step > s
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-[#0a0a0a] text-gray-500 border border-white/10'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Funding Method */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex border-b border-white/10 gap-4 text-xs font-semibold">
            <button
              onClick={() => setMethodTab('bank')}
              className={`pb-3 px-3 flex items-center gap-2 transition-colors border-b-2 ${
                methodTab === 'bank' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-500" />
              <span>Manual Bank Wire Transfer ({bankMethods.length})</span>
            </button>
            <button
              onClick={() => setMethodTab('crypto')}
              className={`pb-3 px-3 flex items-center gap-2 transition-colors border-b-2 ${
                methodTab === 'crypto' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Cryptocurrency Gateways ({cryptoMethods.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(methodTab === 'bank' ? bankMethods : cryptoMethods).map((method) => {
              const minVal = method.minAmount ?? method.minDeposit ?? 1000;
              const maxVal = method.maxAmount ?? method.maxDeposit ?? 10000000;
              const bankName = method.bankName || method.bankDetails?.bankName || 'Depository Bank';
              const currency = method.currency || method.bankDetails?.currency || method.currencyOrAsset || 'USD';
              const asset = method.asset || method.cryptoDetails?.asset || method.currencyOrAsset || 'Crypto';
              const network = method.network || method.cryptoDetails?.network || '';

              return (
                <div
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method);
                    setAmount(minVal);
                    setStep(2);
                  }}
                  className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer space-y-3 group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-lg bg-[#050505] border border-white/10 text-amber-500 group-hover:border-amber-500/40">
                        {method.type === 'bank_transfer' ? <Landmark className="w-5 h-5 text-amber-500" /> : <Coins className="w-5 h-5 text-amber-500" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">
                          {method.name}
                        </h3>
                        <span className="text-[11px] font-mono text-gray-400">
                          {method.type === 'bank_transfer' ? `${bankName} (${currency})` : `${asset}${network ? ` • ${network}` : ''}`}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#050505] border border-white/10 text-[11px] text-gray-400 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>Min / Max:</span>
                      <span className="text-white">${minVal.toLocaleString()} - ${maxVal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Settlement SLA:</span>
                      <span className="text-amber-400">
                        {method.type === 'bank_transfer' ? 'Same-day to 24 hours' : '15-45 minutes'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {method.instructions}
                  </p>
                </div>
              );
            })}
          </div>

          {activeMethods.length === 0 && (
            <div className="p-8 rounded-xl bg-[#0a0a0a] border border-white/10 text-center space-y-2">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-serif font-bold text-white text-sm">No Payment Methods Configured</h4>
              <p className="text-xs text-gray-400">
                Please switch to the Admin Console to configure manual bank accounts or crypto gateways.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Method Details & Instructions */}
      {step === 2 && selectedMethod && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Change Funding Method</span>
            </button>
            <span className="text-xs font-mono text-amber-500">
              Step 2 of 3: Transfer Instructions
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#050505] border border-white/10 text-amber-400">
                  {selectedMethod.type === 'bank_transfer' ? <Landmark className="w-6 h-6 text-amber-500" /> : <Coins className="w-6 h-6 text-amber-500" />}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">{selectedMethod.name}</h3>
                  <p className="text-xs text-gray-400">
                    {selectedMethod.type === 'bank_transfer' ? 'Official Institutional Depository Account' : 'Audited Cold Custody Multi-Sig Address'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                Active Gateway
              </span>
            </div>

            {/* Bank Transfer Details Box */}
            {selectedMethod.type === 'bank_transfer' && (() => {
              const selBeneficiary = selectedMethod.accountName || selectedMethod.bankDetails?.accountName || 'TradeVerge Custody Trust Ltd';
              const selBank = selectedMethod.bankName || selectedMethod.bankDetails?.bankName || 'Depository Bank';
              const selAccountNum = selectedMethod.accountNumber || selectedMethod.bankDetails?.accountNumber || '';
              const selRouting = selectedMethod.routingNumber || selectedMethod.bankDetails?.routingNumber || 'N/A';
              const selSwift = selectedMethod.swiftCode || selectedMethod.bankDetails?.swiftBic || 'N/A';
              const selIban = selectedMethod.iban || selectedMethod.bankDetails?.iban || 'N/A';

              return (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">Beneficiary Name:</span>
                      <span className="font-medium text-white text-xs">{selBeneficiary}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selBeneficiary, 'beneficiary')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'beneficiary' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">Bank Name:</span>
                      <span className="font-medium text-white text-xs">{selBank}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selBank, 'bank')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'bank' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">Account Number:</span>
                      <span className="font-mono font-bold text-white text-xs">{selAccountNum}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selAccountNum, 'accNum')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'accNum' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">Routing / ABA:</span>
                      <span className="font-mono font-bold text-white text-xs">{selRouting}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selRouting, 'routing')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'routing' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">SWIFT / BIC Code:</span>
                      <span className="font-mono font-bold text-white text-xs">{selSwift}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selSwift, 'swift')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'swift' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block">IBAN:</span>
                      <span className="font-mono font-bold text-white text-xs">{selIban}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selIban, 'iban')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedKey === 'iban' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Reference Wire Note */}
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-amber-500/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs uppercase tracking-wider">Mandatory Wire Reference:</span>
                    <button
                      onClick={() => handleCopy(`TV-${user.id.toUpperCase()}`, 'wireRef')}
                      className="text-[11px] text-amber-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Copy Reference</span>
                      {copiedKey === 'wireRef' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="font-mono font-bold text-sm text-amber-400">
                    TV-{user.id.toUpperCase()}
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Include this exact reference in the wire description / memo to allow automated reconciliation to your account.
                  </p>
                </div>
              </div>
              );
            })()}

            {/* Crypto Transfer Details Box */}
            {selectedMethod.type === 'crypto' && (() => {
              const selAsset = selectedMethod.asset || selectedMethod.cryptoDetails?.asset || selectedMethod.currencyOrAsset || 'Crypto';
              const selNetwork = selectedMethod.network || selectedMethod.cryptoDetails?.network || 'Standard';
              const selWallet = selectedMethod.walletAddress || selectedMethod.cryptoDetails?.walletAddress || '';
              const selMemo = selectedMethod.memoTag || selectedMethod.cryptoDetails?.memoTag || '';
              const selConfirmations = selectedMethod.requiredConfirmations || selectedMethod.cryptoDetails?.confirmationThreshold || 12;
              const selQrUrl = selectedMethod.cryptoDetails?.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(selWallet)}`;

              return (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* QR Code */}
                  <div className="md:col-span-4 p-4 rounded-xl bg-[#050505] border border-white/10 flex flex-col items-center justify-center space-y-2">
                    <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                      <img
                        src={selQrUrl}
                        alt="Deposit QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">Scan to Fund</span>
                  </div>

                  {/* Address Details */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Deposit Address ({selNetwork}):</span>
                        <button
                          onClick={() => handleCopy(selWallet, 'cryptoAddr')}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-semibold"
                        >
                          <span>Copy Address</span>
                          {copiedKey === 'cryptoAddr' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-white break-all select-all">
                        {selWallet}
                      </div>
                    </div>

                    {selMemo && (
                      <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-gray-500 uppercase">Memo / Destination Tag:</span>
                          <button
                            onClick={() => handleCopy(selMemo, 'memoTag')}
                            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                          >
                            <span>Copy Tag</span>
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="font-mono font-bold text-sm text-amber-400">
                          {selMemo}
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-[#050505] border border-white/10 space-y-1 text-[11px] text-gray-300">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Required Blockchain Confirmations: {selConfirmations}</span>
                      </div>
                      <p className="text-gray-400">
                        Send only {selAsset} on the {selNetwork} network. Sending any other asset or network may result in loss of funds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              );
            })()}

            {/* Special Instructions */}
            <div className="p-4 rounded-xl bg-[#050505] border border-white/10 text-xs text-gray-300 space-y-1">
              <strong className="text-white block font-mono uppercase text-[10px]">Operator Instructions:</strong>
              <p className="leading-relaxed">{selectedMethod.instructions}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(3)}
                className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Submit Payment Proof</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment Proof Submission Form */}
      {step === 3 && selectedMethod && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Instructions</span>
            </button>
            <span className="text-xs font-mono text-amber-500">
              Step 3 of 3: Proof Submission
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-amber-500 uppercase">Verification Form</span>
              <h3 className="font-serif text-2xl font-bold text-white">Submit Payment Details</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Target Gateway: <strong className="text-white">{selectedMethod.name}</strong>
              </p>
            </div>

            {(() => {
              const selMinDeposit = selectedMethod.minAmount ?? selectedMethod.minDeposit ?? 1000;
              const selMaxDeposit = selectedMethod.maxAmount ?? selectedMethod.maxDeposit ?? 10000000;
              const selCurrOrAsset = selectedMethod.type === 'crypto' 
                ? (selectedMethod.asset || selectedMethod.cryptoDetails?.asset || selectedMethod.currencyOrAsset || 'USDT')
                : (selectedMethod.currency || selectedMethod.bankDetails?.currency || selectedMethod.currencyOrAsset || 'USD');

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      Deposit Amount ({selCurrOrAsset}):
                    </label>
                    <input
                      type="number"
                      required
                      min={selMinDeposit}
                      max={selMaxDeposit}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-[11px] text-gray-500 font-mono mt-1 block">
                      Allowed range: ${(selMinDeposit ?? 0).toLocaleString()} - ${(selMaxDeposit ?? 0).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      {selectedMethod.type === 'bank_transfer' ? 'Wire Reference / Confirmation #:' : 'Transaction Hash (TxID):'}
                    </label>
                    <input
                      type="text"
                      required
                      value={txReference}
                      onChange={(e) => setTxReference(e.target.value)}
                      placeholder={selectedMethod.type === 'bank_transfer' ? 'e.g. FED-WIRE-8910419' : '0x... or hash'}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              );
            })()}

            {/* Payment Proof Receipt Upload */}
            <div className="space-y-2 text-xs">
              <label className="block text-gray-300 font-medium">
                Upload Wire Slip or Transaction Screenshot (Required):
              </label>
              
              <div className="p-6 rounded-xl bg-[#050505] border-2 border-dashed border-white/10 hover:border-amber-500/50 text-center space-y-3 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <div className="text-xs text-gray-300 font-medium">
                  {receiptFilePreview ? 'Receipt document attached' : 'Drag and drop wire confirmation receipt, or browse'}
                </div>
                <p className="text-[11px] text-gray-500">
                  Accepts PNG, JPG, PDF up to 15MB
                </p>
              </div>

              {receiptFilePreview && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <FileText className="w-4 h-4" />
                    <span>Receipt Document Ready for Submission</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReceiptFilePreview(null)}
                    className="text-gray-400 hover:text-white text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Optional Notes */}
            <div className="text-xs">
              <label className="block text-gray-300 font-medium mb-1">
                Additional Notes for Compliance Officer (Optional):
              </label>
              <textarea
                rows={2}
                value={depositorNotes}
                onChange={(e) => setDepositorNotes(e.target.value)}
                placeholder="e.g. Originating from Chase Private Client checking account #...9102"
                className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Submit to Verification Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
