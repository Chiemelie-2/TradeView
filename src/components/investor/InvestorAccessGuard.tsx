import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, LogIn, UserPlus } from 'lucide-react';

interface InvestorAccessGuardProps {
  onOpenSignIn: () => void;
  onOpenRegister: () => void;
}

export const InvestorAccessGuard: React.FC<InvestorAccessGuardProps> = ({
  onOpenSignIn,
  onOpenRegister
}) => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mx-auto mb-6 shadow-inner">
          <Shield className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-mono font-semibold mb-4">
          <Lock className="w-3 h-3" />
          <span>CLIENT AUTHENTICATION REQUIRED</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-3">
          Investor Depository Portal
        </h2>

        <p className="text-xs text-stone-400 leading-relaxed mb-6">
          Access to segregated custody accounts, deposit channels, transaction ledgers, and portfolio analytics requires registered investor authentication.
        </p>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-400 text-left mb-6 font-mono space-y-1">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>256-bit AES cryptographic custody</span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Email verification on registration</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={onOpenRegister}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Account</span>
          </button>

          <button
            onClick={onOpenSignIn}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
          >
            <LogIn className="w-3.5 h-3.5 text-stone-400" />
            <span>Sign In to Existing Account</span>
          </button>

          <button
            onClick={() => setCurrentRoute('home')}
            className="w-full py-2 text-[11px] text-stone-500 hover:text-stone-400 transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
