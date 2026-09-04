import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KycCase } from '../../types';
import { pageTranslations } from '../../i18n/pageTranslations';
import { ShieldCheck, Upload, CheckCircle2, Clock, XCircle, ArrowRight, ChevronLeft, FileText } from 'lucide-react';

export const KycWizard: React.FC = () => {
  const { user, submitKyc, kycCases, setCurrentRoute, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const kycT = pageT.investorPages.kyc;

  const activeCase = kycCases.find(k => k.userId === user.id) || null;
  const isApproved = user.kycStatus === 'approved';
  const isSubmitted = user.kycStatus === 'submitted';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState(user.fullName || '');
  const [dob, setDob] = useState('1985-06-15');
  const [nationality, setNationality] = useState('United States');
  const [address, setAddress] = useState('100 Wall Street, Penthouse B, New York, NY 10005');
  const [idType, setIdType] = useState<'passport' | 'drivers_license' | 'national_id'>('passport');
  const [idNumber, setIdNumber] = useState('P98124018');
  const [sourceOfWealth, setSourceOfWealth] = useState('Business Profits, Private Equity & Real Estate');
  const [netWorth, setNetWorth] = useState('$5M - $10M');
  const [riskAppetite, setRiskAppetite] = useState<'conservative' | 'medium' | 'high'>('medium');

  const [docFront, setDocFront] = useState<string | null>('https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKyc({
      fullName,
      dateOfBirth: dob,
      nationality,
      residentialAddress: address,
      idType,
      idNumber,
      sourceOfWealth,
      netWorthBracket: netWorth,
      riskAppetite,
      documentFrontUrl: docFront || undefined
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
          {kycT.badge}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            {kycT.title}
          </h1>
          <div className="flex items-center gap-2">
            {isApproved ? (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>TIER 2 APPROVED</span>
              </span>
            ) : isSubmitted ? (
              <span className="px-3 py-1 rounded-full bg-amber-950/40 text-amber-400 font-mono text-xs font-bold border border-amber-500/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>IN COMPLIANCE REVIEW</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-zinc-900 text-gray-400 font-mono text-xs font-bold border border-white/10">
                PENDING SUBMISSION
              </span>
            )}
          </div>
        </div>
      </div>

      {isApproved ? (
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-amber-500/40 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Tier 2 Institutional Verification Active</h2>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            Your accredited identity has been verified and cleared by Compliance. Unlimited strategy allocation and priority wire redemptions are fully unlocked.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentRoute('investments')}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow"
            >
              Browse Strategies
            </button>
          </div>
        </div>
      ) : isSubmitted ? (
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-950/40 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Application In Review</h2>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            Your documents were received and are undergoing automated sanctions and manual KYC officer inspection. Review typically concludes in 2-4 hours.
          </p>
          <div className="p-4 rounded-xl bg-[#050505] border border-white/10 text-xs text-gray-400 max-w-sm mx-auto font-mono text-left space-y-1">
            <div>Reference Case: #{activeCase?.id || 'KYC-9812'}</div>
            <div>Submitted by: {user.fullName}</div>
            <div>ID Type: {activeCase?.idType?.toUpperCase() || 'PASSPORT'}</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6 shadow-2xl">
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Nationality</label>
                <input
                  type="text"
                  required
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-1">ID Document Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value as any)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="passport">Passport (Recommended)</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="national_id">National Identity Card</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">ID Number / Passport Number</label>
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Residential Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Source of Wealth</label>
                <input
                  type="text"
                  required
                  value={sourceOfWealth}
                  onChange={(e) => setSourceOfWealth(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-1">Net Worth Bracket</label>
                <select
                  value={netWorth}
                  onChange={(e) => setNetWorth(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="$1M - $5M">$1M - $5M USD</option>
                  <option value="$5M - $10M">$5M - $10M USD</option>
                  <option value="$10M - $25M">$10M - $25M USD</option>
                  <option value="$25M+">$25M+ Institutional</option>
                </select>
              </div>
            </div>

            {/* Document Upload Simulation */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Upload Government ID Document:
              </label>
              <div className="p-5 rounded-xl bg-[#050505] border-2 border-dashed border-white/10 text-center space-y-2">
                <Upload className="w-6 h-6 text-amber-400 mx-auto" />
                <span className="text-xs text-gray-300 block font-medium">Passport_scan_verified.jpg attached</span>
                <span className="text-[10px] text-gray-500 font-mono">Size: 2.4 MB • SHA-256 Validated</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-400 leading-relaxed">
              I certify under penalty of perjury that the documentation and declarations provided herein are true, accurate, and correspond to lawful source of funds.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{kycT.submitButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
