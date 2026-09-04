import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Landmark, Coins, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WithdrawalFlow: React.FC = () => {
  const { availableCash, submitWithdrawal, setCurrentRoute, user, showToast } = useApp();

  const [destinationType, setDestinationType] = useState<'bank' | 'crypto'>('bank');
  const [amount, setAmount] = useState<number>(5000);
  const [destinationDetails, setDestinationDetails] = useState<string>('');
  const [twoFaCode, setTwoFaCode] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fee = amount * 0.0025; // 0.25% fee
  const netAmount = Math.max(0, amount - fee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.kycStatus !== 'approved') {
      showToast('KYC Required', 'Tier 2 KYC approval is mandatory prior to capital redemption.', 'danger');
      return;
    }
    const res = submitWithdrawal(amount, destinationType, destinationDetails, twoFaCode);
    if (res.success) {
      setIsSuccess(true);
    } else {
      showToast('Withdrawal Failed', res.message, 'danger');
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-white">Withdrawal Queued</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Your redemption request of ${amount.toLocaleString()} USD has been authenticated with 2FA and placed in the compliance disbursement queue.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs text-gray-300 space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">Destination:</span>
            <span className="font-mono text-white truncate max-w-[200px]">{destinationDetails}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Custodial Fee (0.25%):</span>
            <span className="font-mono text-gray-400">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-white">
            <span>Net Disbursed:</span>
            <span className="font-mono text-amber-400">${netAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
          Depository Outflow
        </span>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Request Capital Redemption
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Withdraw cleared funds to your registered bank account or verified crypto wallet.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6 shadow-2xl">
        {/* Cleared Balance Preview */}
        <div className="p-4 rounded-xl bg-[#050505] border border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Available Cleared Balance:</span>
            <div className="font-mono font-bold text-xl text-white">
              ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAmount(availableCash)}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Redeem Max
          </button>
        </div>

        {/* Destination Type Toggle */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setDestinationType('bank')}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
              destinationType === 'bank'
                ? 'bg-amber-500 text-black font-bold border-amber-500'
                : 'bg-[#050505] text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Bank Wire (USD/EUR)</span>
          </button>
          <button
            type="button"
            onClick={() => setDestinationType('crypto')}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
              destinationType === 'crypto'
                ? 'bg-amber-500 text-black font-bold border-amber-500'
                : 'bg-[#050505] text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Crypto Wallet Address</span>
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5 text-xs">
          <label className="block text-gray-300 font-medium">Withdrawal Amount (USD):</label>
          <input
            type="number"
            required
            min="100"
            max={availableCash}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Destination Account / Address */}
        <div className="space-y-1.5 text-xs">
          <label className="block text-gray-300 font-medium">
            {destinationType === 'bank'
              ? 'Bank Wire Details (IBAN / Account #, Bank Name, SWIFT):'
              : 'Destination Cryptocurrency Address (BTC / USDT TRC20 / ETH):'}
          </label>
          <input
            type="text"
            required
            value={destinationDetails}
            onChange={(e) => setDestinationDetails(e.target.value)}
            placeholder={
              destinationType === 'bank'
                ? 'e.g. JPMorgan Chase, Acct # 981240192, Routing 021000021'
                : 'e.g. 0x71C... or TQr9...'
            }
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* 2FA Authenticator Code */}
        <div className="space-y-1.5 text-xs">
          <label className="block text-gray-300 font-medium">
            Two-Factor Authenticator Code (6 Digits):
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={twoFaCode}
            onChange={(e) => setTwoFaCode(e.target.value)}
            placeholder="123456"
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono tracking-widest text-center focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Fee & Net Summary */}
        <div className="p-3.5 rounded-xl bg-[#050505] border border-white/10 space-y-1.5 text-xs text-gray-300">
          <div className="flex justify-between">
            <span className="text-gray-400">Custody Handling Fee (0.25%):</span>
            <span className="font-mono text-gray-400">${fee.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between font-bold text-white border-t border-white/10 pt-1.5">
            <span>Net Disbursed Amount:</span>
            <span className="font-mono text-amber-400 text-sm">${netAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={amount > availableCash || amount <= 0}
          className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Authenticate & Authorize Redemption</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
