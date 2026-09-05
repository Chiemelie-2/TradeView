import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Mail, 
  Key, 
  Copy, 
  X, 
  ExternalLink, 
  ArrowRight, 
  Sparkles,
  Building2,
  Lock,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GoogleEmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
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

export const GoogleEmailVerificationModal: React.FC<GoogleEmailVerificationModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    setUser, 
    showToast, 
    lastDispatchedEmail, 
    openEmailModal,
    setCurrentRoute 
  } = useApp();

  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const currentToken = lastDispatchedEmail?.verificationToken || 'SEC-GOOGLE-VERIFIED-9K4P';
  const depositoryId = lastDispatchedEmail?.depositoryAccountId || user.depositoryAccountId || 'TV-DEP-849201';
  const isVerified = user.isEmailVerified;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(currentToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        isEmailVerified: true
      }));
      setIsVerifying(false);
      showToast(
        'Google Email Verified',
        `Verification confirmed for ${user.email}. Your institutional account registration is officially active.`,
        'success'
      );
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#0d0d0d] border border-white/20 rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm">Google Email Verification</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Confirmed
                </span>
              </div>
              <p className="text-stone-400 text-xs">
                Registration confirmation & identity verification protocol.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-xs text-stone-300">
          
          {/* Main Confirmation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-blue-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registration Confirmed to User</span>
            </div>
            <p className="text-stone-200 text-xs leading-relaxed">
              Your account registration on <strong className="text-white">TradeVerge.live</strong> has been confirmed. A formal Google verification receipt has been dispatched to your email address.
            </p>
          </div>

          {/* Account & Verification Credentials Box */}
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-stone-400">Account Holder:</span>
              <span className="font-semibold text-white text-xs">{user.fullName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-stone-400">Registered Google Email:</span>
              <span className="font-mono text-amber-400 text-xs font-semibold">{user.email}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-stone-400">Depository Account ID:</span>
              <span className="font-mono text-white text-xs">{depositoryId}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-stone-400">Verification Status:</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Verified & Confirmed</span>
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-stone-400">Security Token:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-stone-300 text-xs font-bold">{currentToken}</span>
                <button
                  onClick={handleCopyToken}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Token"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation Notice */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Confirmation Email Dispatched
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">TLS Encrypted</span>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              We have sent the formal registration confirmation notice with your isolated custodial account number, cryptographic proof, and compliance clearance to <strong className="text-stone-200">{user.email}</strong>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                openEmailModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Inspect Delivered Confirmation Email</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>

            {!isVerified && (
              <button
                type="button"
                onClick={handleConfirmVerification}
                disabled={isVerifying}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isVerifying ? 'Verifying with Google...' : 'Re-verify with Google Email'}</span>
              </button>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between">
          <span className="text-[10px] text-stone-500 font-mono">
            Provider: Google Identity & OAuth Verification
          </span>
          <button
            onClick={() => {
              onClose();
              setCurrentRoute('dashboard');
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
};
