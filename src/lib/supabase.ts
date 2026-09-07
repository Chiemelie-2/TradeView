import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  UserProfile, 
  InvestmentPlan, 
  UserInvestment, 
  LedgerTransaction, 
  PaymentMethod, 
  DepositSubmission, 
  WithdrawalRequest, 
  KycCase, 
  InAppNotification, 
  PromotionalCampaign, 
  AuditLogEntry 
} from '../types';

const STORAGE_KEY_URL = 'tv_supabase_url';
const STORAGE_KEY_KEY = 'tv_supabase_anon_key';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

// Retrieve config from localStorage first, then fallback to Vite environment variables
export const getSupabaseConfig = (): SupabaseConfig => {
  let url = '';
  let anonKey = '';

  try {
    url = localStorage.getItem(STORAGE_KEY_URL) || '';
    anonKey = localStorage.getItem(STORAGE_KEY_KEY) || '';
  } catch {
    // ignore
  }

  // Fallback to environment variables
  const metaEnv = (import.meta as any)?.env;
  if (!url && metaEnv?.VITE_SUPABASE_URL) {
    url = metaEnv.VITE_SUPABASE_URL;
  }
  if (!anonKey && metaEnv?.VITE_SUPABASE_ANON_KEY) {
    anonKey = metaEnv.VITE_SUPABASE_ANON_KEY;
  }

  return {
    url: url.trim(),
    anonKey: anonKey.trim(),
    isConfigured: Boolean(url.trim() && anonKey.trim())
  };
};

export const isSupabaseConfigured = (): boolean => {
  return getSupabaseConfig().isConfigured;
};

// Singleton Supabase Client
let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const config = getSupabaseConfig();
  if (!config.isConfigured) {
    return null;
  }

  if (!clientInstance) {
    try {
      clientInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    } catch (e) {
      console.error('Failed to create Supabase client:', e);
      return null;
    }
  }

  return clientInstance;
};

export const saveSupabaseConfig = (url: string, anonKey: string): void => {
  try {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    // Invalidate client instance so it re-initializes with new credentials
    clientInstance = null;
  } catch (e) {
    console.error('Error saving Supabase config:', e);
  }
};

export const clearSupabaseConfig = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
    clientInstance = null;
  } catch (e) {
    console.error('Error clearing Supabase config:', e);
  }
};

// Test connection by making a lightweight request
export const testSupabaseConnection = async (url: string, anonKey: string): Promise<{ success: boolean; message: string }> => {
  if (!url || !anonKey) {
    return { success: false, message: 'URL and Anon Key are required.' };
  }

  try {
    // Validate URL structure
    new URL(url);
  } catch {
    return { success: false, message: 'Invalid Supabase URL format. Example: https://xyzcompany.supabase.co' };
  }

  try {
    const testClient = createClient(url, anonKey);
    // Ping profiles or public schema
    const { error } = await testClient.from('profiles').select('id').limit(1);
    
    // If the table doesn't exist yet, Supabase returns error with code '42P01' (relation does not exist)
    // which still confirms valid authentication against the project!
    if (error) {
      if (error.code === '42P01') {
        return { 
          success: true, 
          message: 'Connected to Supabase! (Tables not created yet — please run the provided SQL Schema in your Supabase SQL Editor).' 
        };
      }
      if (error.message?.includes('JWT') || error.message?.includes('apikey') || error.code === 'PGRST301') {
        return { success: false, message: `Authentication error: ${error.message}` };
      }
    }

    return { success: true, message: 'Successfully connected to your Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error connecting to Supabase.' };
  }
};

// ==========================================
// DYNAMIC SUPABASE DATABASE SERVICES
// ==========================================

export const supabaseDb = {
  // Profiles
  async getProfile(userId: string): Promise<UserProfile | null> {
    const sb = getSupabaseClient();
    if (!sb) return null;
    const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
    if (error || !data) return null;
    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      phone: data.phone || '',
      country: data.country || 'United States',
      role: data.role || 'investor',
      isEmailVerified: Boolean(data.is_email_verified),
      emailVerifiedAt: data.email_verified_at,
      authProvider: data.auth_provider,
      depositoryAccountId: data.depository_account_id,
      twoFactorEnabled: Boolean(data.two_factor_enabled),
      is2FAEnabled: Boolean(data.is_2fa_enabled),
      twoFactorSecret: data.two_factor_secret,
      kycStatus: data.kyc_status || 'not_started',
      kycTier: data.kyc_tier || 1,
      createdAt: data.created_at,
      avatarUrl: data.avatar_url,
      institutionName: data.institution_name,
      accountType: data.account_type || 'individual'
    };
  },

  async upsertProfile(profile: UserProfile): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('profiles').upsert({
      id: profile.id,
      full_name: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      country: profile.country,
      role: profile.role,
      is_email_verified: profile.isEmailVerified,
      email_verified_at: profile.emailVerifiedAt,
      auth_provider: profile.authProvider,
      depository_account_id: profile.depositoryAccountId,
      two_factor_enabled: profile.twoFactorEnabled,
      is_2fa_enabled: profile.is2FAEnabled,
      two_factor_secret: profile.twoFactorSecret,
      kyc_status: profile.kycStatus,
      kyc_tier: profile.kycTier,
      institution_name: profile.institutionName,
      account_type: profile.accountType,
      avatar_url: profile.avatarUrl,
      updated_at: new Date().toISOString()
    });
    if (error) {
      console.error('Supabase upsertProfile error:', error);
      return false;
    }
    return true;
  },

  // Investment Plans
  async getInvestmentPlans(): Promise<InvestmentPlan[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    const { data, error } = await sb.from('investment_plans').select('*').order('min_investment', { ascending: true });
    if (error || !data) return [];
    return data.map((p: any) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      riskLevel: p.risk_level,
      projectedApy: Number(p.projected_apy),
      durationDays: Number(p.duration_days),
      minInvestment: Number(p.min_investment),
      maxInvestment: Number(p.max_investment),
      managementFeePercent: Number(p.management_fee_percent || 0),
      liquidity: p.liquidity,
      description: p.description || '',
      objective: p.objective || '',
      strategy: p.strategy || '',
      assetAllocation: p.asset_allocation || [],
      active: Boolean(p.active)
    }));
  },

  async upsertInvestmentPlan(plan: InvestmentPlan): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('investment_plans').upsert({
      id: plan.id,
      code: plan.code,
      name: plan.name,
      category: plan.category,
      risk_level: plan.riskLevel,
      projected_apy: plan.projectedApy,
      duration_days: plan.durationDays,
      min_investment: plan.minInvestment,
      max_investment: plan.maxInvestment,
      management_fee_percent: plan.managementFeePercent,
      liquidity: plan.liquidity,
      description: plan.description,
      objective: plan.objective,
      strategy: plan.strategy,
      asset_allocation: plan.assetAllocation,
      active: plan.active,
      updated_at: new Date().toISOString()
    });
    if (error) {
      console.error('Supabase upsertInvestmentPlan error:', error);
      return false;
    }
    return true;
  },

  // User Investments / Portfolio
  async getUserInvestments(userId?: string): Promise<UserInvestment[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('investments').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((i: any) => ({
      id: i.id,
      userId: i.user_id,
      planId: i.plan_id,
      planName: i.plan_name,
      planCode: i.plan_code,
      principalAmount: Number(i.principal_amount),
      currentValue: Number(i.current_value),
      totalAccruedProfit: Number(i.total_accrued_profit || 0),
      projectedApy: Number(i.projected_apy),
      startDate: i.start_date,
      maturityDate: i.maturity_date,
      status: i.status,
      nextPayoutDate: i.next_payout_date
    }));
  },

  async createInvestment(inv: UserInvestment): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('investments').insert({
      id: inv.id,
      user_id: inv.userId,
      plan_id: inv.planId,
      plan_name: inv.planName,
      plan_code: inv.planCode,
      principal_amount: inv.principalAmount,
      current_value: inv.currentValue,
      total_accrued_profit: inv.totalAccruedProfit,
      projected_apy: inv.projectedApy,
      start_date: inv.startDate,
      maturity_date: inv.maturityDate,
      status: inv.status,
      next_payout_date: inv.nextPayoutDate
    });
    if (error) {
      console.error('Supabase createInvestment error:', error);
      return false;
    }
    return true;
  },

  // Transactions
  async getTransactions(userId?: string): Promise<LedgerTransaction[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('transactions').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((t: any) => ({
      id: t.id,
      userId: t.user_id,
      type: t.type,
      amount: Number(t.amount),
      currency: t.currency || 'USD',
      direction: t.direction,
      status: t.status,
      description: t.description,
      referenceId: t.reference_id,
      createdAt: t.created_at,
      category: t.category
    }));
  },

  async createTransaction(tx: LedgerTransaction): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('transactions').insert({
      id: tx.id,
      user_id: tx.userId,
      type: tx.type,
      amount: tx.amount,
      currency: tx.currency,
      direction: tx.direction,
      status: tx.status,
      description: tx.description,
      reference_id: tx.referenceId,
      category: tx.category,
      created_at: tx.createdAt
    });
    if (error) {
      console.error('Supabase createTransaction error:', error);
      return false;
    }
    return true;
  },

  // Payment Methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    const { data, error } = await sb.from('payment_methods').select('*').order('name', { ascending: true });
    if (error || !data) return [];
    return data.map((m: any) => ({
      id: m.id,
      type: m.type,
      name: m.name,
      enabled: Boolean(m.enabled),
      currencyOrAsset: m.currency_or_asset,
      minAmount: Number(m.min_amount),
      maxAmount: Number(m.max_amount),
      minDeposit: Number(m.min_amount),
      maxDeposit: Number(m.max_amount),
      feePercent: Number(m.fee_percent || 0),
      processingTime: m.processing_time,
      instructions: m.instructions,
      bankDetails: m.bank_details,
      cryptoDetails: m.crypto_details,
      bankName: m.bank_details?.bankName,
      accountName: m.bank_details?.accountName,
      accountNumber: m.bank_details?.accountNumber,
      routingNumber: m.bank_details?.routingNumber,
      swiftCode: m.bank_details?.swiftBic,
      iban: m.bank_details?.iban,
      currency: m.bank_details?.currency || m.currency_or_asset,
      asset: m.crypto_details?.asset || m.currency_or_asset,
      network: m.crypto_details?.network,
      walletAddress: m.crypto_details?.walletAddress,
      memoTag: m.crypto_details?.memoTag,
      requiredConfirmations: m.crypto_details?.confirmationThreshold || 12,
      updatedAt: m.updated_at,
      version: 1
    }));
  },

  async upsertPaymentMethod(method: PaymentMethod): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('payment_methods').upsert({
      id: method.id,
      type: method.type,
      name: method.name,
      enabled: method.enabled,
      currency_or_asset: method.currencyOrAsset || method.currency || method.asset,
      min_amount: method.minAmount || method.minDeposit || 100,
      max_amount: method.maxAmount || method.maxDeposit || 10000000,
      fee_percent: method.feePercent || 0,
      processing_time: method.processingTime,
      instructions: method.instructions,
      bank_details: method.bankDetails || (method.type === 'bank_transfer' ? {
        bankName: method.bankName,
        accountName: method.accountName,
        accountNumber: method.accountNumber,
        routingNumber: method.routingNumber,
        swiftBic: method.swiftCode,
        iban: method.iban,
        currency: method.currency || 'USD',
        referencePattern: 'TV-{{USER_ID}}-DEP'
      } : null),
      crypto_details: method.cryptoDetails || (method.type === 'crypto' ? {
        asset: method.asset || 'USDT',
        network: method.network || 'ERC-20',
        walletAddress: method.walletAddress,
        memoTag: method.memoTag,
        confirmationThreshold: method.requiredConfirmations || 12
      } : null),
      updated_at: new Date().toISOString()
    });
    if (error) {
      console.error('Supabase upsertPaymentMethod error:', error);
      return false;
    }
    return true;
  },

  async deletePaymentMethod(id: string): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('payment_methods').delete().eq('id', id);
    return !error;
  },

  // Deposit Submissions
  async getDeposits(userId?: string): Promise<DepositSubmission[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('deposit_submissions').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      userId: d.user_id,
      userFullName: d.user_full_name,
      userEmail: d.user_email,
      methodId: d.method_id,
      methodName: d.method_name,
      methodType: d.method_type,
      amount: Number(d.amount),
      currencyOrAsset: d.currency_or_asset,
      txHashOrReference: d.tx_hash_or_reference,
      senderAccountOrWallet: d.sender_account_or_wallet,
      proofDocumentUrl: d.proof_document_url,
      proofFileName: d.proof_file_name,
      customerNotes: d.customer_notes,
      status: d.status,
      adminReviewNotes: d.admin_review_notes,
      adminReviewedBy: d.admin_reviewed_by,
      adminReviewedAt: d.admin_reviewed_at,
      createdAt: d.created_at
    }));
  },

  async createDepositSubmission(deposit: DepositSubmission): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('deposit_submissions').insert({
      id: deposit.id,
      user_id: deposit.userId,
      user_full_name: deposit.userFullName,
      user_email: deposit.userEmail,
      method_id: deposit.methodId,
      method_name: deposit.methodName,
      method_type: deposit.methodType,
      amount: deposit.amount,
      currency_or_asset: deposit.currencyOrAsset,
      tx_hash_or_reference: deposit.txHashOrReference,
      sender_account_or_wallet: deposit.senderAccountOrWallet,
      proof_document_url: deposit.proofDocumentUrl,
      proof_file_name: deposit.proofFileName,
      customerNotes: deposit.customerNotes,
      status: deposit.status,
      created_at: deposit.createdAt
    });
    if (error) {
      console.error('Supabase createDepositSubmission error:', error);
      return false;
    }
    return true;
  },

  async updateDepositStatus(id: string, status: string, notes?: string, reviewer?: string): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('deposit_submissions').update({
      status,
      admin_review_notes: notes,
      admin_reviewed_by: reviewer,
      admin_reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', id);
    return !error;
  },

  // Withdrawal Requests
  async getWithdrawals(userId?: string): Promise<WithdrawalRequest[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('withdrawal_requests').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((w: any) => ({
      id: w.id,
      userId: w.user_id,
      userFullName: w.user_full_name,
      amount: Number(w.amount),
      currency: w.currency || 'USD',
      destinationType: w.destination_type,
      destinationDetails: w.destination_details,
      fee: Number(w.fee || 0),
      netAmount: Number(w.net_amount),
      status: w.status,
      createdAt: w.created_at,
      reviewedAt: w.reviewed_at,
      reviewedBy: w.reviewed_by,
      txHashOrReference: w.tx_hash_or_reference
    }));
  },

  async createWithdrawalRequest(req: WithdrawalRequest): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('withdrawal_requests').insert({
      id: req.id,
      user_id: req.userId,
      user_full_name: req.userFullName,
      amount: req.amount,
      currency: req.currency,
      destination_type: req.destinationType,
      destination_details: req.destinationDetails,
      fee: req.fee,
      net_amount: req.netAmount,
      status: req.status,
      created_at: req.createdAt
    });
    if (error) {
      console.error('Supabase createWithdrawalRequest error:', error);
      return false;
    }
    return true;
  },

  async updateWithdrawalStatus(id: string, status: string, txRef?: string, reviewer?: string): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('withdrawal_requests').update({
      status,
      tx_hash_or_reference: txRef,
      reviewed_by: reviewer,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', id);
    return !error;
  },

  // KYC Cases
  async getKycCases(userId?: string): Promise<KycCase[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('kyc_cases').select('*').order('submitted_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((k: any) => ({
      id: k.id,
      userId: k.user_id,
      fullName: k.full_name,
      dateOfBirth: k.date_of_birth,
      nationality: k.nationality,
      residentialAddress: k.residential_address,
      idType: k.id_type,
      idNumber: k.id_number,
      documentFrontUrl: k.document_front_url,
      documentBackUrl: k.document_back_url,
      proofOfAddressUrl: k.proof_of_address_url,
      sourceOfWealth: k.source_of_wealth,
      riskAppetite: k.risk_appetite,
      netWorthBracket: k.net_worth_bracket,
      status: k.status,
      submittedAt: k.submitted_at,
      reviewedAt: k.reviewed_at,
      reviewedBy: k.reviewed_by,
      rejectionReason: k.rejection_reason
    }));
  },

  async submitKycCase(kyc: KycCase): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('kyc_cases').upsert({
      id: kyc.id,
      user_id: kyc.userId,
      full_name: kyc.fullName,
      date_of_birth: kyc.dateOfBirth,
      nationality: kyc.nationality,
      residential_address: kyc.residentialAddress,
      id_type: kyc.idType,
      id_number: kyc.idNumber,
      document_front_url: kyc.documentFrontUrl,
      document_back_url: kyc.documentBackUrl,
      proof_of_address_url: kyc.proofOfAddressUrl,
      source_of_wealth: kyc.sourceOfWealth,
      risk_appetite: kyc.riskAppetite,
      net_worth_bracket: kyc.netWorthBracket,
      status: kyc.status,
      submitted_at: kyc.submittedAt
    });
    return !error;
  },

  async updateKycStatus(id: string, status: string, reason?: string, reviewer?: string): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('kyc_cases').update({
      status,
      rejection_reason: reason,
      reviewed_by: reviewer,
      reviewed_at: new Date().toISOString()
    }).eq('id', id);
    return !error;
  },

  // Notifications
  async getNotifications(userId?: string): Promise<InAppNotification[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    let query = sb.from('notifications').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((n: any) => ({
      id: n.id,
      userId: n.user_id,
      title: n.title,
      message: n.message,
      category: n.category,
      read: Boolean(n.read),
      createdAt: n.created_at,
      actionUrl: n.action_url
    }));
  },

  async createNotification(notif: InAppNotification): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('notifications').insert({
      id: notif.id,
      user_id: notif.userId,
      title: notif.title,
      message: notif.message,
      category: notif.category,
      read: notif.read,
      action_url: notif.actionUrl,
      created_at: notif.createdAt
    });
    return !error;
  },

  async markNotificationRead(id: string): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('notifications').update({ read: true }).eq('id', id);
    return !error;
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    const sb = getSupabaseClient();
    if (!sb) return [];
    const { data, error } = await sb.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(100);
    if (error || !data) return [];
    return data.map((l: any) => ({
      id: l.id,
      actorId: l.actor_id,
      actorEmail: l.actor_email,
      actorRole: l.actor_role,
      action: l.action,
      resource: l.resource,
      resourceId: l.resource_id,
      details: l.details,
      ipAddress: l.ip_address,
      timestamp: l.timestamp,
      status: l.status
    }));
  },

  async createAuditLog(log: AuditLogEntry): Promise<boolean> {
    const sb = getSupabaseClient();
    if (!sb) return false;
    const { error } = await sb.from('audit_logs').insert({
      id: log.id,
      actor_id: log.actorId,
      actor_email: log.actorEmail,
      actor_role: log.actorRole,
      action: log.action,
      resource: log.resource,
      resource_id: log.resourceId,
      details: log.details,
      ip_address: log.ipAddress,
      timestamp: log.timestamp,
      status: log.status
    });
    return !error;
  },

  // Namespaced convenience helpers
  paymentMethods: {
    getAll: () => supabaseDb.getPaymentMethods(),
    create: (method: PaymentMethod) => supabaseDb.upsertPaymentMethod(method),
    update: (id: string, updates: Partial<PaymentMethod>) => {
      const sb = getSupabaseClient();
      if (!sb) return Promise.resolve(false);
      return sb.from('payment_methods').update({
        ...updates,
        updated_at: new Date().toISOString()
      }).eq('id', id).then(({ error }) => !error);
    },
    delete: (id: string) => supabaseDb.deletePaymentMethod(id),
  },
  investmentPlans: {
    getAll: () => supabaseDb.getInvestmentPlans(),
    create: (plan: InvestmentPlan) => supabaseDb.upsertInvestmentPlan(plan),
    update: (id: string, updates: Partial<InvestmentPlan>) => {
      const sb = getSupabaseClient();
      if (!sb) return Promise.resolve(false);
      return sb.from('investment_plans').update({
        ...updates,
        updated_at: new Date().toISOString()
      }).eq('id', id).then(({ error }) => !error);
    },
  },
  deposits: {
    getAll: (userId?: string) => supabaseDb.getDeposits(userId),
    create: (deposit: DepositSubmission) => supabaseDb.createDepositSubmission(deposit),
    updateStatus: (id: string, status: string, notes?: string, reviewer?: string) => supabaseDb.updateDepositStatus(id, status, notes, reviewer),
  },
  investments: {
    getAll: (userId?: string) => supabaseDb.getUserInvestments(userId),
    create: (inv: UserInvestment) => supabaseDb.createInvestment(inv),
  },
  withdrawals: {
    getAll: (userId?: string) => supabaseDb.getWithdrawals(userId),
    create: (w: WithdrawalRequest) => supabaseDb.createWithdrawalRequest(w),
    updateStatus: (id: string, status: string, reviewer?: string) => supabaseDb.updateWithdrawalStatus(id, status, undefined, reviewer),
  },
  transactions: {
    getAll: (userId?: string) => supabaseDb.getTransactions(userId),
    create: (tx: LedgerTransaction) => supabaseDb.createTransaction(tx),
  },
  kyc: {
    getAll: (userId?: string) => supabaseDb.getKycCases(userId),
    submit: (k: KycCase) => supabaseDb.submitKycCase(k),
    updateStatus: (id: string, status: string, notes?: string, reviewer?: string) => supabaseDb.updateKycStatus(id, status, notes, reviewer),
  },
  notifications: {
    getAll: (userId?: string) => supabaseDb.getNotifications(userId),
    create: (n: InAppNotification) => supabaseDb.createNotification(n),
    markRead: (id: string) => supabaseDb.markNotificationRead(id),
  },
  auditLogs: {
    getAll: () => supabaseDb.getAuditLogs(),
    create: (log: AuditLogEntry) => supabaseDb.createAuditLog(log),
  },
  campaigns: {
    getAll: async (): Promise<PromotionalCampaign[]> => [],
  }
};
