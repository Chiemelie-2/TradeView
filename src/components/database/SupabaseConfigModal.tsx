import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  KeyRound, 
  Sparkles, 
  Layers, 
  Terminal,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  clearSupabaseConfig, 
  testSupabaseConnection,
  supabaseDb
} from '../../lib/supabase';
import { initialPaymentMethods, initialInvestmentPlans } from '../../data/seedData';
import { useApp } from '../../context/AppContext';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncRequested?: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose, onSyncRequested }) => {
  const { showToast, reloadFromSupabase } = useApp();
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [status, setStatus] = useState<{ testing: boolean; message: string | null; success: boolean | null }>({
    testing: false,
    message: null,
    success: null
  });
  const [activeTab, setActiveTab] = useState<'config' | 'schema'>('config');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cfg = getSupabaseConfig();
      setUrl(cfg.url);
      setAnonKey(cfg.anonKey);
      setStatus({
        testing: false,
        message: cfg.isConfigured ? 'Supabase credentials currently loaded.' : null,
        success: cfg.isConfigured ? true : null
      });
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setStatus({
        testing: false,
        message: 'Please provide both your Supabase Project URL and Anon Key.',
        success: false
      });
      return;
    }

    setStatus({ testing: true, message: 'Verifying connection to Supabase...', success: null });
    const res = await testSupabaseConnection(url.trim(), anonKey.trim());
    setStatus({
      testing: false,
      message: res.message,
      success: res.success
    });

    if (res.success) {
      showToast('Supabase Connected', 'Successfully reached your Supabase project.', 'success');
    } else {
      showToast('Connection Failed', res.message, 'error');
    }
  };

  const handleSave = async () => {
    if (!url.trim() || !anonKey.trim()) {
      showToast('Missing Credentials', 'Please enter your Supabase URL and Anon Key.', 'warning');
      return;
    }

    setStatus({ testing: true, message: 'Validating & saving configuration...', success: null });
    const res = await testSupabaseConnection(url.trim(), anonKey.trim());

    if (!res.success && !res.message.includes('Tables not created yet')) {
      setStatus({ testing: false, message: res.message, success: false });
      showToast('Connection Error', res.message, 'error');
      return;
    }

    saveSupabaseConfig(url.trim(), anonKey.trim());
    setStatus({ testing: false, message: 'Supabase database linked successfully!', success: true });
    showToast('Database Linked', 'Application is now connected to your Supabase database.', 'success');
    
    if (reloadFromSupabase) {
      await reloadFromSupabase();
    }
    if (onSyncRequested) {
      onSyncRequested();
    }
  };

  const handleDisconnect = () => {
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    setStatus({ testing: false, message: 'Supabase database disconnected.', success: null });
    showToast('Database Disconnected', 'Cleared stored Supabase keys.', 'info');
    if (reloadFromSupabase) {
      reloadFromSupabase();
    }
  };

  const handleCopySchema = () => {
    const schemaText = `-- ==============================================================================
-- TradeVerge Institutional Platform - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  country TEXT DEFAULT 'United States',
  role TEXT DEFAULT 'investor',
  is_email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMPTZ,
  auth_provider TEXT DEFAULT 'email',
  depository_account_id TEXT,
  two_factor_enabled BOOLEAN DEFAULT false,
  is_2fa_enabled BOOLEAN DEFAULT false,
  two_factor_secret TEXT,
  kyc_status TEXT DEFAULT 'not_started',
  kyc_tier INT DEFAULT 1,
  account_type TEXT DEFAULT 'individual',
  institution_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.investment_plans (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  projected_apy NUMERIC NOT NULL,
  duration_days INT NOT NULL,
  min_investment NUMERIC NOT NULL,
  max_investment NUMERIC NOT NULL,
  management_fee_percent NUMERIC DEFAULT 0,
  liquidity TEXT NOT NULL,
  description TEXT,
  objective TEXT,
  strategy TEXT,
  asset_allocation JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.investments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.investment_plans(id),
  plan_name TEXT NOT NULL,
  plan_code TEXT NOT NULL,
  principal_amount NUMERIC NOT NULL,
  current_value NUMERIC NOT NULL,
  total_accrued_profit NUMERIC DEFAULT 0,
  projected_apy NUMERIC NOT NULL,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  maturity_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  next_payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  direction TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT NOT NULL,
  reference_id TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_methods (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  currency_or_asset TEXT,
  min_amount NUMERIC DEFAULT 100,
  max_amount NUMERIC DEFAULT 10000000,
  fee_percent NUMERIC DEFAULT 0,
  processing_time TEXT DEFAULT 'Instant - 24 Hours',
  instructions TEXT,
  bank_details JSONB,
  crypto_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.deposit_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_full_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  method_id TEXT NOT NULL,
  method_name TEXT NOT NULL,
  method_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency_or_asset TEXT NOT NULL,
  tx_hash_or_reference TEXT NOT NULL,
  sender_account_or_wallet TEXT,
  proof_document_url TEXT,
  proof_file_name TEXT,
  customer_notes TEXT,
  status TEXT DEFAULT 'proof_submitted',
  admin_review_notes TEXT,
  admin_reviewed_by TEXT,
  admin_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.withdrawal_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_full_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  destination_type TEXT NOT NULL,
  destination_details TEXT NOT NULL,
  fee NUMERIC DEFAULT 0,
  net_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'requested',
  tx_hash_or_reference TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kyc_cases (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth TEXT,
  nationality TEXT,
  residential_address TEXT,
  id_type TEXT,
  id_number TEXT,
  document_front_url TEXT,
  document_back_url TEXT,
  proof_of_address_url TEXT,
  source_of_wealth TEXT,
  risk_appetite TEXT DEFAULT 'medium',
  net_worth_bracket TEXT,
  status TEXT DEFAULT 'submitted',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'money',
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'success',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposit_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of active investment plans" ON public.investment_plans FOR SELECT USING (true);
CREATE POLICY "Allow all access to investment plans" ON public.investment_plans FOR ALL USING (true);
CREATE POLICY "Allow public read of payment methods" ON public.payment_methods FOR SELECT USING (true);
CREATE POLICY "Allow all access to payment methods" ON public.payment_methods FOR ALL USING (true);
CREATE POLICY "Allow all access to profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Allow all access to investments" ON public.investments FOR ALL USING (true);
CREATE POLICY "Allow all access to transactions" ON public.transactions FOR ALL USING (true);
CREATE POLICY "Allow all access to deposit_submissions" ON public.deposit_submissions FOR ALL USING (true);
CREATE POLICY "Allow all access to withdrawal_requests" ON public.withdrawal_requests FOR ALL USING (true);
CREATE POLICY "Allow all access to kyc_cases" ON public.kyc_cases FOR ALL USING (true);
CREATE POLICY "Allow all access to notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow all access to audit_logs" ON public.audit_logs FOR ALL USING (true);`;

    navigator.clipboard.writeText(schemaText);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
    showToast('Schema Copied', 'Paste this SQL directly into your Supabase SQL Editor.', 'info');
  };

  const handleBootstrapSeed = async () => {
    setSeeding(true);
    try {
      // Push investment plans
      for (const plan of initialInvestmentPlans) {
        await supabaseDb.upsertInvestmentPlan(plan);
      }
      // Push payment gateways
      for (const pm of initialPaymentMethods) {
        await supabaseDb.upsertPaymentMethod(pm);
      }
      showToast('Seeding Complete', 'Starter investment plans and payment gateways written to Supabase.', 'success');
      if (reloadFromSupabase) {
        await reloadFromSupabase();
      }
    } catch (e: any) {
      showToast('Seeding Notice', e?.message || 'Some tables may need the SQL migration run first.', 'warning');
    } finally {
      setSeeding(false);
    }
  };

  const isCurrentlyLinked = Boolean(getSupabaseConfig().isConfigured);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#070707]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-serif">Link Supabase Database</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isCurrentlyLinked 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isCurrentlyLinked ? 'CONNECTED' : 'NOT LINKED'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Connect your real Supabase PostgreSQL database to replace any placeholder data with live tables.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-[#070707] px-5 gap-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('config')}
                className={`py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'config'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>API Credentials & Link</span>
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'schema'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>PostgreSQL Schema (SQL)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-300">
              {activeTab === 'config' ? (
                <div className="space-y-4">
                  {/* Step 1 & Info */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-medium text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Where to find your Supabase credentials:</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" /></a> &gt; Select Project &gt; <strong>Project Settings &gt; API</strong>. Copy your <strong>Project URL</strong> and <strong>anon public API key</strong>.
                    </p>
                  </div>

                  {/* URL Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 block">
                      Supabase Project URL
                    </label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-white/10 focus:border-emerald-500 focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  {/* Anon Key Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 block">
                      Supabase Anon Key (public)
                    </label>
                    <input
                      type="password"
                      value={anonKey}
                      onChange={(e) => setAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-white/10 focus:border-emerald-500 focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  {/* Status Banner */}
                  {status.message && (
                    <div className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
                      status.success === true
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                        : status.success === false
                        ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                        : 'bg-white/5 border border-white/10 text-gray-300'
                    }`}>
                      {status.success === true ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : status.success === false ? (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 animate-spin" />
                      )}
                      <span>{status.message}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleTestConnection}
                        disabled={status.testing}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border border-white/10"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${status.testing ? 'animate-spin' : ''}`} />
                        <span>Test Connection</span>
                      </button>

                      {isCurrentlyLinked && (
                        <button
                          type="button"
                          onClick={handleDisconnect}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Disconnect</span>
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={status.testing || !url || !anonKey}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save & Link Database</span>
                    </button>
                  </div>

                  {/* Quick Seed Feature */}
                  {isCurrentlyLinked && (
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-white font-medium block">Bootstrap Initial Records</span>
                        <span className="text-[11px] text-gray-400">Insert starter investment tiers and payment gateways into your linked Supabase tables.</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleBootstrapSeed}
                        disabled={seeding}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs transition-colors border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
                        <span>{seeding ? 'Seeding...' : 'Seed Starter Tables'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Database Migration SQL</h4>
                      <p className="text-[11px] text-gray-400">
                        Paste this into your <strong>Supabase SQL Editor</strong> and hit <strong>Run</strong> to create all tables and RLS policies.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySchema}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                    </button>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#050505]">
                    <pre className="p-4 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-[300px] leading-relaxed">
{`-- Run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.profiles (...);
CREATE TABLE IF NOT EXISTS public.investment_plans (...);
CREATE TABLE IF NOT EXISTS public.investments (...);
CREATE TABLE IF NOT EXISTS public.transactions (...);
CREATE TABLE IF NOT EXISTS public.payment_methods (...);
CREATE TABLE IF NOT EXISTS public.deposit_submissions (...);
CREATE TABLE IF NOT EXISTS public.withdrawal_requests (...);
CREATE TABLE IF NOT EXISTS public.kyc_cases (...);
CREATE TABLE IF NOT EXISTS public.notifications (...);
CREATE TABLE IF NOT EXISTS public.audit_logs (...);

-- Click "Copy SQL Schema" button above to copy the full DDL.`}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#070707] flex items-center justify-between text-[11px] text-gray-400">
              <span>Environment: Supports both UI keys and <code className="text-emerald-400 font-mono">VITE_SUPABASE_URL</code></span>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
