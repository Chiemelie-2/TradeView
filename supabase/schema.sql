-- ==============================================================================
-- TradeVerge Institutional Platform - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- ==============================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  country TEXT DEFAULT 'United States',
  role TEXT DEFAULT 'investor' CHECK (role IN ('investor', 'admin', 'kyc_analyst', 'finance_controller')),
  is_email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMPTZ,
  auth_provider TEXT DEFAULT 'email',
  depository_account_id TEXT,
  two_factor_enabled BOOLEAN DEFAULT false,
  is_2fa_enabled BOOLEAN DEFAULT false,
  two_factor_secret TEXT,
  kyc_status TEXT DEFAULT 'not_started' CHECK (kyc_status IN ('not_started', 'in_progress', 'submitted', 'processing', 'approved', 'rejected', 'additional_info_required')),
  kyc_tier INT DEFAULT 1,
  account_type TEXT DEFAULT 'individual' CHECK (account_type IN ('individual', 'institutional', 'family_office')),
  institution_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INVESTMENT PLANS TABLE
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

-- 3. USER INVESTMENTS / PORTFOLIO TABLE
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
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'matured', 'cancelled')),
  next_payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRANSACTIONS & FINANCIAL LEDGER TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'investment_allocation', 'yield_distribution', 'fee_charge', 'refund')),
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  direction TEXT NOT NULL CHECK (direction IN ('credit', 'debit')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('completed', 'pending', 'failed', 'processing')),
  description TEXT NOT NULL,
  reference_id TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAYMENT METHODS / GATEWAYS TABLE
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('bank_transfer', 'crypto')),
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

-- 6. DEPOSIT SUBMISSIONS TABLE
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

-- 7. WITHDRAWAL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.withdrawal_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_full_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  destination_type TEXT NOT NULL CHECK (destination_type IN ('bank', 'crypto')),
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

-- 8. KYC CASES & IDENTITY VERIFICATION TABLE
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

-- 9. NOTIFICATIONS TABLE
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

-- 10. AUDIT LOGS TABLE
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

-- 11. CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_text TEXT,
  cta_text TEXT,
  cta_target TEXT,
  active BOOLEAN DEFAULT true,
  placement TEXT DEFAULT 'dashboard_top',
  target_audience TEXT DEFAULT 'all',
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS
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
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Permissive development policies for client integration
CREATE POLICY "Allow public read of active investment plans" ON public.investment_plans FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to investment plans" ON public.investment_plans FOR ALL USING (true);

CREATE POLICY "Allow public read of payment methods" ON public.payment_methods FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to payment methods" ON public.payment_methods FOR ALL USING (true);

CREATE POLICY "Allow users full access to own profile" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Allow users full access to own investments" ON public.investments FOR ALL USING (true);
CREATE POLICY "Allow users full access to own transactions" ON public.transactions FOR ALL USING (true);
CREATE POLICY "Allow users full access to own deposits" ON public.deposit_submissions FOR ALL USING (true);
CREATE POLICY "Allow users full access to own withdrawals" ON public.withdrawal_requests FOR ALL USING (true);
CREATE POLICY "Allow users full access to own kyc" ON public.kyc_cases FOR ALL USING (true);
CREATE POLICY "Allow users full access to own notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow all access to audit logs" ON public.audit_logs FOR ALL USING (true);
CREATE POLICY "Allow all access to campaigns" ON public.campaigns FOR ALL USING (true);
