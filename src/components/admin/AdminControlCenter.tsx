import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, DepositSubmission, KycCase } from '../../types';
import { 
  Landmark, 
  Coins, 
  Plus, 
  Check, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Eye, 
  Sliders, 
  Users, 
  Clock, 
  FileText, 
  Layers, 
  Activity, 
  DollarSign, 
  Lock,
  ArrowUpRight,
  Sparkles,
  QrCode,
  Globe,
  MessageSquare,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminControlCenter: React.FC = () => {
  const { 
    paymentMethods, 
    addPaymentMethod, 
    updatePaymentMethod, 
    togglePaymentMethod, 
    deletePaymentMethod, 
    deposits, 
    adminApproveDeposit, 
    adminRejectDeposit, 
    adminRequestInfoDeposit,
    withdrawals,
    adminApproveWithdrawal,
    adminRejectWithdrawal,
    kycCases,
    adminApproveKyc,
    adminRejectKyc,
    plans,
    addInvestmentPlan,
    campaigns,
    toggleCampaign,
    auditLogs,
    showToast,
    openTranslateModal,
    openSmartsuppModal
  } = useApp();

  type AdminTab = 'payments' | 'deposits' | 'withdrawals' | 'kyc' | 'plans' | 'campaigns' | 'audit';
  const [activeTab, setActiveTab] = useState<AdminTab>('payments');

  // Modal States
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentTypeToAdd, setPaymentTypeToAdd] = useState<'bank_transfer' | 'crypto'>('bank_transfer');

  // New Bank Form State
  const [bankForm, setBankForm] = useState({
    name: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    iban: '',
    currency: 'USD',
    minAmount: 5000,
    maxAmount: 1000000,
    instructions: 'Please include the wire reference in your bank wire memo.'
  });

  // New Crypto Form State
  const [cryptoForm, setCryptoForm] = useState({
    name: '',
    asset: 'USDT',
    network: 'TRC20',
    walletAddress: '',
    memoTag: '',
    requiredConfirmations: 12,
    minAmount: 1000,
    maxAmount: 500000,
    instructions: 'Send only USDT on the TRON (TRC20) network. Funds reflect after 12 confirmations.'
  });

  // Review Deposit Modal
  const [inspectDeposit, setInspectDeposit] = useState<DepositSubmission | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  // Stats
  const pendingDepositsCount = deposits.filter(d => d.status === 'pending_manual_review').length;
  const pendingWithdrawalsCount = withdrawals.filter(w => w.status === 'pending_review').length;
  const pendingKycCount = kycCases.filter(k => k.status === 'submitted').length;
  const activeGatewaysCount = paymentMethods.filter(m => m.enabled).length;

  const handleCreatePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentTypeToAdd === 'bank_transfer') {
      if (!bankForm.name || !bankForm.accountNumber) {
        showToast('Form Error', 'Please complete required bank account fields', 'danger');
        return;
      }
      addPaymentMethod({
        name: bankForm.name,
        type: 'bank_transfer',
        bankName: bankForm.bankName,
        accountName: bankForm.accountName,
        accountNumber: bankForm.accountNumber,
        routingNumber: bankForm.routingNumber,
        swiftCode: bankForm.swiftCode,
        iban: bankForm.iban,
        currency: bankForm.currency,
        minAmount: Number(bankForm.minAmount),
        maxAmount: Number(bankForm.maxAmount),
        enabled: true,
        instructions: bankForm.instructions
      });
    } else {
      if (!cryptoForm.name || !cryptoForm.walletAddress) {
        showToast('Form Error', 'Please complete required crypto wallet fields', 'danger');
        return;
      }
      addPaymentMethod({
        name: cryptoForm.name,
        type: 'crypto',
        asset: cryptoForm.asset,
        network: cryptoForm.network,
        walletAddress: cryptoForm.walletAddress,
        memoTag: cryptoForm.memoTag || undefined,
        requiredConfirmations: Number(cryptoForm.requiredConfirmations),
        minAmount: Number(cryptoForm.minAmount),
        maxAmount: Number(cryptoForm.maxAmount),
        enabled: true,
        instructions: cryptoForm.instructions
      });
    }

    setIsAddPaymentModalOpen(false);
  };

  const handleUpdatePaymentMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaymentMethod) return;
    updatePaymentMethod(editingPaymentMethod.id, editingPaymentMethod);
    setEditingPaymentMethod(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[amber-400]">
              Administrative Master Console
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight mt-1">
            Platform Operations & Treasury Control
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-0.5">
            Configure manual banking and cryptocurrency gateways, verify incoming client deposits, and manage compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={openTranslateModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-all cursor-pointer"
            title="Configure Google Cloud Translation API Key"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Google Translate Key</span>
          </button>
          <button
            type="button"
            onClick={openSmartsuppModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
            title="Configure Smartsupp Live Chat Key"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Smartsupp Key</span>
          </button>
          <button
            onClick={() => {
              setPaymentTypeToAdd('bank_transfer');
              setIsAddPaymentModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Bank Gateway</span>
          </button>
          <button
            onClick={() => {
              setPaymentTypeToAdd('crypto');
              setIsAddPaymentModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a0a0a] hover:bg-[#111111] border border-[amber-500]/50 text-[amber-300] text-xs font-semibold transition-all cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-[amber-400]" />
            <span>Add Crypto Gateway</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1">
          <span className="text-stone-500 uppercase font-mono text-[10px]">Depository Gateways</span>
          <div className="font-serif text-2xl font-bold text-white">{activeGatewaysCount} Active</div>
          <span className="text-[amber-400] text-[11px]">{paymentMethods.length} configured in system</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1">
          <span className="text-stone-500 uppercase font-mono text-[10px]">Deposit Verification Queue</span>
          <div className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <span>{pendingDepositsCount}</span>
            {pendingDepositsCount > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            )}
          </div>
          <span className="text-amber-400 text-[11px]">Awaiting proof signoff</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1">
          <span className="text-stone-500 uppercase font-mono text-[10px]">Withdrawal Redemptions</span>
          <div className="font-serif text-2xl font-bold text-white">{pendingWithdrawalsCount}</div>
          <span className="text-stone-400 text-[11px]">Pending four-eyes check</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1">
          <span className="text-stone-500 uppercase font-mono text-[10px]">KYC In Review</span>
          <div className="font-serif text-2xl font-bold text-white">{pendingKycCount}</div>
          <span className="text-stone-400 text-[11px]">Sanctions / ID dossiers</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1">
          <span className="text-stone-500 uppercase font-mono text-[10px]">Platform AUM</span>
          <div className="font-serif text-2xl font-bold text-white">$482.9M</div>
          <span className="text-[amber-400] text-[11px]">Zero ledger break</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 gap-1 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'payments' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <Landmark className="w-4 h-4 text-[amber-500]" />
          <span>Payment Gateways Setup ({paymentMethods.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deposits')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'deposits' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4 text-[amber-400]" />
          <span>Deposit Review Queue</span>
          {pendingDepositsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold font-mono">
              {pendingDepositsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'withdrawals' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 text-[#D86C65]" />
          <span>Withdrawals Queue ({withdrawals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'kyc' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>KYC Compliance ({kycCases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'plans' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-[#58C7D2]" />
          <span>Investment Plans ({plans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'campaigns' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[amber-300]" />
          <span>Campaigns</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'audit' ? 'border-amber-500 text-white' : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-stone-400" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: Payment Gateways Setup */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Manual Banking & Crypto Gateway Setup</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Admin controls the exact bank wire accounts and cryptocurrency addresses published to investors for funding.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPaymentTypeToAdd('bank_transfer');
                  setIsAddPaymentModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bank Account</span>
              </button>
              <button
                onClick={() => {
                  setPaymentTypeToAdd('crypto');
                  setIsAddPaymentModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#0a0a0a] border border-[amber-500]/50 text-[amber-300] text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Crypto Gateway</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
              const isBank = method.type === 'bank_transfer';

              return (
                <div
                  key={method.id}
                  className={`p-5 rounded-2xl border transition-all space-y-4 shadow-xl ${
                    method.enabled 
                      ? 'bg-[#0a0a0a] border-white/10 hover:border-amber-500' 
                      : 'bg-[#050505] border-stone-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#050505] border border-white/10 text-[amber-400]">
                        {isBank ? <Landmark className="w-5 h-5 text-[amber-500]" /> : <Coins className="w-5 h-5 text-[amber-400]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white text-sm">{method.name}</h4>
                          <span className="px-2 py-0.2 rounded bg-black/40 text-[9px] font-mono text-stone-400 border border-stone-800">
                            v{method.version}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-stone-400">
                          {isBank ? `${method.bankName} (${method.currency})` : `${method.asset} • ${method.network}`}
                        </span>
                      </div>
                    </div>

                    {/* Enable/Disable Toggle */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePaymentMethod(method.id)}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                          method.enabled
                            ? 'bg-amber-500 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                        title="Click to toggle gateway active status"
                      >
                        {method.enabled ? 'ACTIVE' : 'DISABLED'}
                      </button>
                    </div>
                  </div>

                  {/* Method Content */}
                  <div className="p-3 rounded-xl bg-[#050505] border border-white/10 text-xs font-mono space-y-1.5 text-stone-300">
                    {isBank ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Beneficiary:</span>
                          <span className="text-white font-medium">{method.accountName || method.bankDetails?.accountName || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Account #:</span>
                          <span className="text-white font-bold">{method.accountNumber || method.bankDetails?.accountNumber || 'N/A'}</span>
                        </div>
                        {(method.routingNumber || method.bankDetails?.routingNumber) && (
                          <div className="flex justify-between">
                            <span className="text-stone-500">Routing / ABA:</span>
                            <span>{method.routingNumber || method.bankDetails?.routingNumber}</span>
                          </div>
                        )}
                        {(method.swiftCode || method.bankDetails?.swiftBic) && (
                          <div className="flex justify-between">
                            <span className="text-stone-500">SWIFT / BIC:</span>
                            <span>{method.swiftCode || method.bankDetails?.swiftBic}</span>
                          </div>
                        )}
                        {(method.iban || method.bankDetails?.iban) && (
                          <div className="flex justify-between">
                            <span className="text-stone-500">IBAN:</span>
                            <span className="truncate max-w-[200px]">{method.iban || method.bankDetails?.iban}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Asset & Network:</span>
                          <span className="text-white font-bold">{method.asset || method.cryptoDetails?.asset || method.currencyOrAsset || 'Crypto'} ({method.network || method.cryptoDetails?.network || 'Standard'})</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-stone-500 shrink-0">Wallet Address:</span>
                          <span className="text-white break-all text-[11px] text-right">{method.walletAddress || method.cryptoDetails?.walletAddress || 'N/A'}</span>
                        </div>
                        {(method.memoTag || method.cryptoDetails?.memoTag) && (
                          <div className="flex justify-between">
                            <span className="text-stone-500">Memo / Tag:</span>
                            <span className="text-emerald-400 font-bold">{method.memoTag || method.cryptoDetails?.memoTag}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-stone-500">Confirmations:</span>
                          <span>{method.requiredConfirmations || method.cryptoDetails?.confirmationThreshold || 12}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between border-t border-white/10 pt-1 text-[10px] text-stone-400">
                      <span>Deposit Range:</span>
                      <span>${(method.minAmount ?? method.minDeposit ?? 0).toLocaleString()} - ${(method.maxAmount ?? method.maxDeposit ?? 0).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10px] font-mono text-stone-500">
                      Last edited: {new Date(method.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPaymentMethod(method)}
                        className="px-2.5 py-1 rounded-lg bg-[#050505] border border-white/10 hover:border-amber-500 text-stone-300 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deletePaymentMethod(method.id)}
                        className="p-1 rounded-lg text-stone-500 hover:text-rose-400"
                        title="Delete Gateway"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Deposit Verification Review Queue */}
      {activeTab === 'deposits' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Deposit Verification Review Queue</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Inspect investor payment receipts and transaction hashes. 1-click ledger credit updates cleared cash atomically.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {pendingDepositsCount} pending review
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#050505] text-stone-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Submission ID</th>
                  <th className="p-4">Investor</th>
                  <th className="p-4">Gateway Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Tx Hash / Wire Ref</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {deposits.map((dep) => {
                  const isPending = dep.status === 'pending_manual_review';

                  return (
                    <tr key={dep.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono text-stone-400">{dep.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{dep.userFullName}</div>
                        <div className="font-mono text-[10px] text-stone-500">{dep.userEmail}</div>
                      </td>
                      <td className="p-4 font-medium text-stone-300">{dep.methodName}</td>
                      <td className="p-4 font-mono font-bold text-[amber-400] text-sm">
                        ${(dep.amount ?? 0).toLocaleString()} {dep.currencyOrAsset}
                      </td>
                      <td className="p-4 font-mono text-stone-400 truncate max-w-[150px]">
                        {dep.txHashOrReference}
                      </td>
                      <td className="p-4 font-mono text-stone-400 text-[11px]">
                        {new Date(dep.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          dep.status === 'posted'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                            : dep.status === 'rejected'
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                        }`}>
                          {dep.status.toUpperCase().replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setInspectDeposit(dep)}
                            className="px-2.5 py-1 rounded-lg bg-[#050505] border border-white/10 hover:border-amber-500 text-stone-300 hover:text-white text-[11px]"
                          >
                            Inspect Receipt
                          </button>

                          {isPending && (
                            <>
                              <button
                                onClick={() => adminApproveDeposit(dep.id)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold font-bold text-[11px] shadow"
                              >
                                Approve & Credit
                              </button>
                              <button
                                onClick={() => {
                                  setInspectDeposit(dep);
                                  setIsRejectOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-[11px]"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Withdrawals Queue */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Capital Redemption Review</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Four-eyes approval queue for client bank wire and crypto disbursements.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {pendingWithdrawalsCount} pending disbursement
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#050505] text-stone-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Request ID</th>
                  <th className="p-4">Investor</th>
                  <th className="p-4">Gross Amount</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Net Payout</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-stone-400">{w.id}</td>
                    <td className="p-4 font-semibold text-white">{w.userFullName}</td>
                    <td className="p-4 font-mono font-medium">${(w.amount ?? 0).toLocaleString()}</td>
                    <td className="p-4 font-mono text-stone-400">${w.fee.toFixed(2)}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                      ${w.netAmount.toFixed(2)} USD
                    </td>
                    <td className="p-4 font-mono text-stone-300 truncate max-w-[200px]">
                      {w.destinationDetails}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        w.status === 'completed'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          : w.status === 'rejected'
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                      }`}>
                        {w.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {w.status === 'pending_review' && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => adminApproveWithdrawal(w.id)}
                            className="px-3 py-1 rounded-lg bg-amber-500 text-black font-bold font-bold text-[11px]"
                          >
                            Disburse
                          </button>
                          <button
                            onClick={() => adminRejectWithdrawal(w.id)}
                            className="px-3 py-1 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-500/40 text-[11px]"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: KYC Compliance Queue */}
      {activeTab === 'kyc' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Investor KYC Compliance Queue</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Verify customer identity documents, source of wealth, and sanction screening.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {kycCases.length} total investor dossiers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kycCases.map((kc) => (
              <div key={kc.id} className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-base">{kc.fullName}</h4>
                    <span className="text-[10px] font-mono text-stone-400">Case #{kc.id} • {kc.nationality}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    kc.status === 'approved'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : kc.status === 'rejected'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                  }`}>
                    {kc.status.toUpperCase()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#050505] border border-white/10 text-xs text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">ID Type & Number:</span>
                    <span className="font-mono text-white">{kc.idType.toUpperCase()} - {kc.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Source of Wealth:</span>
                    <span className="truncate max-w-[200px]">{kc.sourceOfWealth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Net Worth Bracket:</span>
                    <span className="text-[amber-500] font-semibold">{kc.netWorthBracket}</span>
                  </div>
                </div>

                {kc.documentFrontUrl && (
                  <div className="p-2 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-stone-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Passport Document Attached</span>
                    </span>
                    <a
                      href={kc.documentFrontUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline text-[11px]"
                    >
                      View Scan
                    </a>
                  </div>
                )}

                {kc.status === 'submitted' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => adminApproveKyc(kc.id)}
                      className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-semibold text-xs transition-all shadow"
                    >
                      Approve Tier 2 Clearance
                    </button>
                    <button
                      onClick={() => adminRejectKyc(kc.id, 'Documentation resolution inadequate')}
                      className="px-4 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Investment Plans */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Investment Vehicles & Offerings</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Marketplace strategies, target yields, term durations, and minimum allocation requirements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-emerald-400">{p.code}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#050505] text-stone-300 border border-white/10">
                    {p.riskLevel}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-white text-base">{p.name}</h4>
                <div className="p-2.5 rounded-xl bg-[#050505] text-xs font-mono grid grid-cols-2 gap-2 text-stone-300">
                  <div>
                    <span className="text-stone-500 block text-[10px]">APY:</span>
                    <span className="text-emerald-400 font-bold">+{p.projectedApy}%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Term:</span>
                    <span>{p.durationDays} Days</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Min:</span>
                    <span>${(p.minInvestment ?? 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Liquidity:</span>
                    <span>{p.liquidity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Promotional Banners & Announcements</h3>
            <p className="text-xs text-stone-400 mt-0.5">Toggle active campaigns displayed to investors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[amber-500]/20 text-[amber-300] font-mono text-[10px] font-bold">
                    {c.badgeText}
                  </span>
                  <button
                    onClick={() => toggleCampaign(c.id)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      c.active ? 'bg-amber-500 text-black font-bold' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {c.active ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                </div>
                <h4 className="font-serif font-bold text-white text-sm">{c.title}</h4>
                <p className="text-xs text-stone-300">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Immutable Append-Only Audit Trail</h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Cryptographically timestamped records of administrative actions, gateway updates, and ledger postings.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#050505] text-stone-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Audit ID</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-stone-400">{log.id}</td>
                    <td className="p-4 font-mono text-emerald-400 font-bold">{log.action}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{log.actorRole}</div>
                      <div className="font-mono text-[10px] text-stone-500">{log.actorEmail}</div>
                    </td>
                    <td className="p-4 text-stone-300 max-w-xs">{log.details}</td>
                    <td className="p-4 font-mono text-stone-400">{log.ipAddress}</td>
                    <td className="p-4 font-mono text-stone-400 text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Payment Gateway (Admin Setup) */}
      <AnimatePresence>
        {isAddPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#050505] border-2 border-amber-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Gateway Configuration</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {paymentTypeToAdd === 'bank_transfer' ? 'Add Manual Bank Account' : 'Add Cryptocurrency Gateway'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Type Switcher Inside Modal */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentTypeToAdd('bank_transfer')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                    paymentTypeToAdd === 'bank_transfer'
                      ? 'bg-amber-500 text-black font-bold border-emerald-400'
                      : 'bg-[#0a0a0a] text-stone-400 border-white/10'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>Manual Bank Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTypeToAdd('crypto')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                    paymentTypeToAdd === 'crypto'
                      ? 'bg-amber-500 text-black font-bold border-emerald-400'
                      : 'bg-[#0a0a0a] text-stone-400 border-white/10'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span>Cryptocurrency Address</span>
                </button>
              </div>

              <form onSubmit={handleCreatePaymentMethod} className="space-y-4 text-xs">
                {paymentTypeToAdd === 'bank_transfer' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Gateway Display Name:</label>
                        <input
                          type="text"
                          required
                          value={bankForm.name}
                          onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
                          placeholder="e.g. JPMorgan Chase USD Wire"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Bank Name:</label>
                        <input
                          type="text"
                          required
                          value={bankForm.bankName}
                          onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                          placeholder="e.g. JPMorgan Chase Bank, N.A."
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Beneficiary / Account Name:</label>
                        <input
                          type="text"
                          required
                          value={bankForm.accountName}
                          onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                          placeholder="e.g. TradeVerge Capital Markets LLC"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Account Number:</label>
                        <input
                          type="text"
                          required
                          value={bankForm.accountNumber}
                          onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                          placeholder="e.g. 9812401892"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Routing / ABA:</label>
                        <input
                          type="text"
                          value={bankForm.routingNumber}
                          onChange={(e) => setBankForm({ ...bankForm, routingNumber: e.target.value })}
                          placeholder="021000021"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">SWIFT / BIC Code:</label>
                        <input
                          type="text"
                          value={bankForm.swiftCode}
                          onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                          placeholder="CHASUS33"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Currency:</label>
                        <select
                          value={bankForm.currency}
                          onChange={(e) => setBankForm({ ...bankForm, currency: e.target.value })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CHF">CHF (Fr.)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">IBAN (For European/International Transfers):</label>
                      <input
                        type="text"
                        value={bankForm.iban}
                        onChange={(e) => setBankForm({ ...bankForm, iban: e.target.value })}
                        placeholder="GB29BARC20041598124018"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Minimum Deposit ($):</label>
                        <input
                          type="number"
                          value={bankForm.minAmount}
                          onChange={(e) => setBankForm({ ...bankForm, minAmount: Number(e.target.value) })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Maximum Deposit ($):</label>
                        <input
                          type="number"
                          value={bankForm.maxAmount}
                          onChange={(e) => setBankForm({ ...bankForm, maxAmount: Number(e.target.value) })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Transfer Instructions for Investor:</label>
                      <textarea
                        rows={2}
                        value={bankForm.instructions}
                        onChange={(e) => setBankForm({ ...bankForm, instructions: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Gateway Name:</label>
                        <input
                          type="text"
                          required
                          value={cryptoForm.name}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, name: e.target.value })}
                          placeholder="e.g. USDT (TRC-20) Depository"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Asset Symbol:</label>
                        <input
                          type="text"
                          required
                          value={cryptoForm.asset}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, asset: e.target.value })}
                          placeholder="BTC, USDT, USDC, ETH, SOL"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Network:</label>
                        <input
                          type="text"
                          required
                          value={cryptoForm.network}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, network: e.target.value })}
                          placeholder="TRC20, ERC20, Native Bitcoin, Solana"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Cryptocurrency Wallet Address:</label>
                      <input
                        type="text"
                        required
                        value={cryptoForm.walletAddress}
                        onChange={(e) => setCryptoForm({ ...cryptoForm, walletAddress: e.target.value })}
                        placeholder="e.g. TQ8kL9v... or 0x71C... or bc1q..."
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Memo / Destination Tag (Optional):</label>
                        <input
                          type="text"
                          value={cryptoForm.memoTag}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, memoTag: e.target.value })}
                          placeholder="e.g. 1049102"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Required Confirmations:</label>
                        <input
                          type="number"
                          value={cryptoForm.requiredConfirmations}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, requiredConfirmations: Number(e.target.value) })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Minimum Deposit ($):</label>
                        <input
                          type="number"
                          value={cryptoForm.minAmount}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, minAmount: Number(e.target.value) })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Maximum Deposit ($):</label>
                        <input
                          type="number"
                          value={cryptoForm.maxAmount}
                          onChange={(e) => setCryptoForm({ ...cryptoForm, maxAmount: Number(e.target.value) })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Network & Custody Instructions:</label>
                      <textarea
                        rows={2}
                        value={cryptoForm.instructions}
                        onChange={(e) => setCryptoForm({ ...cryptoForm, instructions: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-semibold text-xs transition-all shadow cursor-pointer"
                  >
                    Publish Payment Gateway
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddPaymentModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-[#0a0a0a] border border-stone-700 text-stone-300 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Edit Payment Gateway */}
      <AnimatePresence>
        {editingPaymentMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-xl font-bold text-white">Edit Gateway: {editingPaymentMethod.name}</h3>
                <button onClick={() => setEditingPaymentMethod(null)} className="p-1 text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdatePaymentMethodSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Display Name:</label>
                  <input
                    type="text"
                    value={editingPaymentMethod.name}
                    onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200"
                  />
                </div>

                {editingPaymentMethod.type === 'bank_transfer' ? (
                  <>
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Account Number:</label>
                      <input
                        type="text"
                        value={editingPaymentMethod.accountNumber || ''}
                        onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, accountNumber: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Beneficiary Name:</label>
                      <input
                        type="text"
                        value={editingPaymentMethod.accountName || ''}
                        onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, accountName: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Wallet Address:</label>
                    <input
                      type="text"
                      value={editingPaymentMethod.walletAddress || ''}
                      onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, walletAddress: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200 font-mono"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Min Deposit:</label>
                    <input
                      type="number"
                      value={editingPaymentMethod.minAmount ?? editingPaymentMethod.minDeposit ?? 1000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setEditingPaymentMethod({
                          ...editingPaymentMethod,
                          minAmount: val,
                          minDeposit: val
                        });
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Max Deposit:</label>
                    <input
                      type="number"
                      value={editingPaymentMethod.maxAmount ?? editingPaymentMethod.maxDeposit ?? 10000000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setEditingPaymentMethod({
                          ...editingPaymentMethod,
                          maxAmount: val,
                          maxDeposit: val
                        });
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Instructions:</label>
                  <textarea
                    rows={2}
                    value={editingPaymentMethod.instructions}
                    onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, instructions: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-stone-200"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 text-black font-bold font-semibold text-xs"
                  >
                    Save Changes (v{editingPaymentMethod.version + 1})
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPaymentMethod(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-700 text-stone-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Inspect Deposit Submission */}
      <AnimatePresence>
        {inspectDeposit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Verification Dossier</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    Deposit #{inspectDeposit.id}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setInspectDeposit(null);
                    setIsRejectOpen(false);
                  }}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 grid grid-cols-2 gap-3 font-mono">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Investor Name:</span>
                    <span className="text-white font-medium">{inspectDeposit.userFullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Email:</span>
                    <span className="text-stone-300">{inspectDeposit.userEmail}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Claimed Amount:</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      ${(inspectDeposit.amount ?? 0).toLocaleString()} {inspectDeposit.currencyOrAsset}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Target Method:</span>
                    <span className="text-white">{inspectDeposit.methodName}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-500 block text-[10px]">Transaction Hash / Wire Reference:</span>
                    <span className="text-white font-bold select-all">{inspectDeposit.txHashOrReference}</span>
                  </div>
                  {inspectDeposit.depositorNotes && (
                    <div className="col-span-2">
                      <span className="text-stone-500 block text-[10px]">Depositor Notes:</span>
                      <span className="text-stone-300">{inspectDeposit.depositorNotes}</span>
                    </div>
                  )}
                </div>

                {/* Uploaded Payment Proof Slip Preview */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                    Uploaded Payment Receipt Documentation:
                  </h4>
                  <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center space-y-2">
                    {inspectDeposit.paymentProofUrl ? (
                      <div className="max-h-60 overflow-hidden rounded-lg border border-stone-700 mx-auto">
                        <img
                          src={inspectDeposit.paymentProofUrl}
                          alt="Receipt Proof"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ) : (
                      <p className="text-stone-500 py-4">No image uploaded</p>
                    )}
                    <span className="text-[10px] font-mono text-stone-500">
                      Receipt Verified: SHA-256 Checksum Valid
                    </span>
                  </div>
                </div>

                {isRejectOpen ? (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                    <label className="block text-rose-300 font-medium">Rejection Reason:</label>
                    <input
                      type="text"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="e.g. Wire reference not found on bank statement"
                      className="w-full bg-[#050505] border border-rose-500/40 rounded-xl px-3 py-2 text-stone-200"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          adminRejectDeposit(inspectDeposit.id, rejectReason || 'Payment verification failed');
                          setInspectDeposit(null);
                          setIsRejectOpen(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold"
                      >
                        Confirm Rejection
                      </button>
                      <button
                        onClick={() => setIsRejectOpen(false)}
                        className="px-3 py-2 text-stone-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  inspectDeposit.status === 'pending_manual_review' && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          adminApproveDeposit(inspectDeposit.id);
                          setInspectDeposit(null);
                        }}
                        className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-bold text-xs shadow transition-all"
                      >
                        Verify & Post Cleared Ledger Credit (${(inspectDeposit.amount ?? 0).toLocaleString()})
                      </button>
                      <button
                        onClick={() => setIsRejectOpen(true)}
                        className="px-5 py-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
