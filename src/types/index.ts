export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ar' | 'pt' | 'ru' | 'it';

export type UserRole = 'investor' | 'admin' | 'kyc_analyst' | 'finance_controller';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: UserRole;
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  authProvider?: 'email' | 'google';
  depositoryAccountId?: string;
  twoFactorEnabled?: boolean;
  is2FAEnabled: boolean;
  twoFactorSecret?: string;
  kycStatus: 'not_started' | 'in_progress' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'additional_info_required';
  kycTier: 1 | 2 | 3;
  createdAt: string;
  avatarUrl?: string;
  institutionName?: string;
  accountType: 'individual' | 'institutional' | 'family_office';
}

export interface BankPaymentDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber?: string;
  swiftBic: string;
  iban?: string;
  bankAddress: string;
  referencePattern: string;
  currency: string;
}

export interface CryptoPaymentDetails {
  asset: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'SOL';
  network: string;
  walletAddress: string;
  memoTag?: string;
  qrCodeUrl?: string;
  confirmationThreshold: number;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_transfer' | 'crypto';
  name: string;
  enabled: boolean;
  currencyOrAsset?: string;
  minDeposit?: number;
  maxDeposit?: number;
  minAmount?: number;
  maxAmount?: number;
  feePercent?: number;
  processingTime?: string;
  instructions: string;
  bankDetails?: BankPaymentDetails;
  cryptoDetails?: CryptoPaymentDetails;
  // Flat properties for compatibility
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  currency?: string;
  asset?: string;
  network?: string;
  walletAddress?: string;
  memoTag?: string;
  requiredConfirmations?: number;
  updatedAt: string;
  version: number;
}

export type DepositStatus = 
  | 'initiated' 
  | 'awaiting_payment' 
  | 'proof_submitted' 
  | 'pending_manual_review' 
  | 'verifying' 
  | 'verified' 
  | 'cleared' 
  | 'posted' 
  | 'settled' 
  | 'rejected' 
  | 'needs_info';

export interface DepositSubmission {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  methodId: string;
  methodName: string;
  methodType: 'bank_transfer' | 'crypto';
  amount: number;
  currencyOrAsset: string;
  txHashOrReference: string;
  senderAccountOrWallet?: string;
  proofDocumentUrl?: string;
  proofFileName?: string;
  customerNotes?: string;
  status: DepositStatus;
  adminReviewNotes?: string;
  adminReviewedBy?: string;
  adminReviewedAt?: string;
  createdAt: string;
  ledgerJournalId?: string;
}

export type WithdrawalStatus = 
  | 'requested' 
  | 'pending_verification' 
  | 'pending_review' 
  | 'approved' 
  | 'processing' 
  | 'completed' 
  | 'rejected';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userFullName: string;
  amount: number;
  currency: string;
  destinationType: 'bank' | 'crypto';
  destinationDetails: string;
  fee: number;
  netAmount: number;
  status: WithdrawalStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  txHashOrReference?: string;
}

export interface InvestmentPlan {
  id: string;
  code: string;
  name: string;
  category: 'Fixed Income' | 'Quantitative Strategies' | 'Private Equity' | 'Real Estate Debt' | 'Green Infrastructure' | 'Sovereign Treasury';
  riskLevel: 'Conservative' | 'Moderate' | 'Growth' | 'Opportunistic';
  projectedApy: number;
  durationDays: number;
  minInvestment: number;
  maxInvestment: number;
  managementFeePercent: number;
  liquidity: 'Daily' | 'Quarterly' | 'End of Term' | '30-Day Notice';
  description: string;
  objective: string;
  strategy: string;
  assetAllocation: { asset: string; percentage: number }[];
  active: boolean;
}

export interface UserInvestment {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  planCode: string;
  principalAmount: number;
  currentValue: number;
  totalAccruedProfit: number;
  projectedApy: number;
  startDate: string;
  maturityDate: string;
  status: 'active' | 'matured' | 'cancelled';
  nextPayoutDate: string;
}

export interface LedgerTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment_allocation' | 'yield_distribution' | 'fee_charge' | 'refund';
  amount: number;
  currency: string;
  direction: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed' | 'processing';
  description: string;
  referenceId: string;
  createdAt: string;
  category: string;
}

export interface KycCase {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  residentialAddress: string;
  idType: 'passport' | 'national_id' | 'drivers_license';
  idNumber: string;
  documentFrontUrl?: string;
  documentBackUrl?: string;
  proofOfAddressUrl?: string;
  sourceOfWealth: string;
  riskAppetite: 'low' | 'medium' | 'high';
  netWorthBracket: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected' | 'additional_info_required';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'money' | 'investment' | 'security' | 'compliance' | 'service';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface PromotionalCampaign {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  ctaText: string;
  ctaTarget: string;
  active: boolean;
  placement: 'homepage_banner' | 'dashboard_top' | 'modal_offer';
  targetAudience: 'all' | 'new_users' | 'accredited';
  clicks: number;
  impressions: number;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'warning' | 'denied';
}

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'deposit' | 'withdrawal' | 'kyc' | 'investment' | 'technical';
  priority: 'normal' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved';
  createdAt: string;
  messages: {
    id: string;
    sender: 'user' | 'agent' | 'system';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}
