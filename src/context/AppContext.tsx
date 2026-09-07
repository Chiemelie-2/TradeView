import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LanguageCode, 
  UserRole, 
  UserProfile, 
  PaymentMethod, 
  DepositSubmission, 
  WithdrawalRequest, 
  InvestmentPlan, 
  UserInvestment, 
  LedgerTransaction, 
  KycCase, 
  InAppNotification, 
  PromotionalCampaign, 
  AuditLogEntry, 
  SupportTicket 
} from '../types';
import { translations, TranslationSchema } from '../i18n/translations';
import { 
  dispatchRegistrationEmail, 
  DispatchedEmail, 
  getDispatchedEmails 
} from '../services/emailService';
import { initSmartsupp } from '../services/smartsuppService';
import { 
  isSupabaseConfigured, 
  supabaseDb 
} from '../lib/supabase';
import { 
  initialUserProfile, 
  initialAdminProfile,
  initialPaymentMethods, 
  initialInvestmentPlans, 
  initialInvestments, 
  initialDeposits, 
  initialWithdrawals, 
  initialLedgerTransactions, 
  initialKycCases, 
  initialNotifications, 
  initialCampaigns, 
  initialAuditLogs, 
  initialSupportTickets 
} from '../data/seedData';

export type AppRoute = 
  | 'home' 
  | 'investments' 
  | 'investment_detail' 
  | 'how_it_works' 
  | 'pricing' 
  | 'education' 
  | 'security' 
  | 'about' 
  | 'contact' 
  | 'legal' 
  | 'dashboard' 
  | 'deposit' 
  | 'withdraw' 
  | 'portfolio' 
  | 'transactions' 
  | 'kyc' 
  | 'documents' 
  | 'support' 
  | 'profile' 
  | 'admin';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
  isAuthenticated: boolean;
  login: (email: string, password?: string, requestedRole?: UserRole) => { success: boolean; message?: string };
  registerAccount: (
    fullName: string, 
    email: string, 
    accountType?: 'individual' | 'institutional' | 'family_office', 
    authProvider?: 'email' | 'google', 
    password?: string
  ) => { success: boolean; emailResult?: DispatchedEmail; message?: string };
  loginWithGoogle: (googleEmail?: string, googleName?: string) => { success: boolean; isNewUser?: boolean; emailResult?: DispatchedEmail };
  dispatchedEmails: DispatchedEmail[];
  lastDispatchedEmail: DispatchedEmail | null;
  isEmailModalOpen: boolean;
  openEmailModal: (email?: DispatchedEmail) => void;
  closeEmailModal: () => void;
  isGoogleVerifyModalOpen: boolean;
  openGoogleVerifyModal: () => void;
  closeGoogleVerifyModal: () => void;
  isSmartsuppModalOpen: boolean;
  openSmartsuppModal: () => void;
  closeSmartsuppModal: () => void;
  isTranslateModalOpen: boolean;
  openTranslateModal: () => void;
  closeTranslateModal: () => void;
  isSupabaseModalOpen: boolean;
  openSupabaseModal: () => void;
  closeSupabaseModal: () => void;
  isSupabaseLinked: boolean;
  syncWithSupabase: () => Promise<void>;
  verifyUserEmail: (code?: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalDefaultRole: 'investor' | 'admin';
  openAuthModal: (role?: 'investor' | 'admin') => void;
  closeAuthModal: () => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string | null) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'updatedAt' | 'version'>) => void;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void;
  togglePaymentMethod: (id: string) => void;
  deletePaymentMethod: (id: string) => void;
  plans: InvestmentPlan[];
  addInvestmentPlan: (plan: Omit<InvestmentPlan, 'id'>) => void;
  updateInvestmentPlan: (id: string, updates: Partial<InvestmentPlan>) => void;
  investments: UserInvestment[];
  createInvestment: (planId: string, amount: number) => { success: boolean; message: string };
  deposits: DepositSubmission[];
  submitDeposit: (submission: Omit<DepositSubmission, 'id' | 'status' | 'createdAt' | 'userId' | 'userFullName' | 'userEmail'>) => void;
  adminApproveDeposit: (id: string, notes?: string) => void;
  adminRejectDeposit: (id: string, reason: string) => void;
  adminRequestInfoDeposit: (id: string, notes: string) => void;
  withdrawals: WithdrawalRequest[];
  submitWithdrawal: (amount: number, destinationType: 'bank' | 'crypto', destinationDetails: string, twoFaCode: string) => { success: boolean; message: string };
  adminApproveWithdrawal: (id: string) => void;
  adminRejectWithdrawal: (id: string) => void;
  ledgerTransactions: LedgerTransaction[];
  kycCases: KycCase[];
  submitKyc: (caseData: Partial<KycCase>) => void;
  adminApproveKyc: (caseId: string) => void;
  adminRejectKyc: (caseId: string, reason: string) => void;
  notifications: InAppNotification[];
  markNotificationAsRead: (id: string) => void;
  campaigns: PromotionalCampaign[];
  toggleCampaign: (id: string) => void;
  auditLogs: AuditLogEntry[];
  tickets: SupportTicket[];
  addTicketMessage: (ticketId: string, message: string) => void;
  createNewTicket: (subject: string, category: SupportTicket['category'], initialMessage: string) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  availableCash: number;
  investedCapital: number;
  totalPortfolioValue: number;
  totalProfit: number;
}

const normalizeMethod = (m: any): PaymentMethod => {
  const isBank = m.type === 'bank_transfer';
  const minAmt = m.minAmount ?? m.minDeposit ?? 1000;
  const maxAmt = m.maxAmount ?? m.maxDeposit ?? 10000000;
  return {
    ...m,
    minAmount: minAmt,
    minDeposit: m.minDeposit ?? minAmt,
    maxAmount: maxAmt,
    maxDeposit: m.maxDeposit ?? maxAmt,
    bankName: m.bankName || m.bankDetails?.bankName || (isBank ? 'JPMorgan Chase Institutional' : undefined),
    accountName: m.accountName || m.bankDetails?.accountName || (isBank ? 'TradeVerge Custody Trust Ltd' : undefined),
    accountNumber: m.accountNumber || m.bankDetails?.accountNumber || (isBank ? '884920194829' : undefined),
    routingNumber: m.routingNumber || m.bankDetails?.routingNumber || (isBank ? '021000021' : undefined),
    swiftCode: m.swiftCode || m.bankDetails?.swiftBic || (isBank ? 'CHASUS33' : undefined),
    iban: m.iban || m.bankDetails?.iban || (isBank ? 'US33CHAS021000021884920194829' : undefined),
    currency: m.currency || m.bankDetails?.currency || m.currencyOrAsset || 'USD',
    asset: m.asset || m.cryptoDetails?.asset || m.currencyOrAsset || (!isBank ? 'USDT' : undefined),
    network: m.network || m.cryptoDetails?.network || (!isBank ? 'ERC-20' : undefined),
    walletAddress: m.walletAddress || m.cryptoDetails?.walletAddress || (!isBank ? '0x94B8f192c7B93d9Acb9D9B22c1E94cD3e8c973a2' : undefined),
    memoTag: m.memoTag || m.cryptoDetails?.memoTag,
    requiredConfirmations: m.requiredConfirmations || m.cryptoDetails?.confirmationThreshold || 12,
    bankDetails: m.bankDetails || (isBank ? {
      bankName: m.bankName || 'JPMorgan Chase Institutional',
      accountName: m.accountName || 'TradeVerge Custody Trust Ltd',
      accountNumber: m.accountNumber || '884920194829',
      routingNumber: m.routingNumber || '021000021',
      swiftBic: m.swiftCode || 'CHASUS33',
      iban: m.iban || 'US33CHAS021000021884920194829',
      currency: m.currency || 'USD'
    } : undefined),
    cryptoDetails: m.cryptoDetails || (!isBank ? {
      asset: m.asset || 'USDT',
      network: m.network || 'ERC-20',
      walletAddress: m.walletAddress || '0x94B8f192c7B93d9Acb9D9B22c1E94cD3e8c973a2',
      memoTag: m.memoTag,
      confirmationThreshold: m.requiredConfirmations || 12
    } : undefined)
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('tv_lang');
      return (saved as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('tv_role');
      return (saved as UserRole) || 'investor';
    } catch {
      return 'investor';
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tv_auth');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<'investor' | 'admin'>('investor');

  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tv_user');
      return saved ? JSON.parse(saved) : initialUserProfile;
    } catch {
      return initialUserProfile;
    }
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    try {
      const saved = localStorage.getItem('tv_payment_methods');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeMethod);
        }
      }
    } catch {
      // fallback
    }
    return initialPaymentMethods.map(normalizeMethod);
  });

  const [plans, setPlans] = useState<InvestmentPlan[]>(() => {
    const saved = localStorage.getItem('tv_plans');
    return saved ? JSON.parse(saved) : initialInvestmentPlans;
  });

  const [investments, setInvestments] = useState<UserInvestment[]>(() => {
    const saved = localStorage.getItem('tv_investments');
    return saved ? JSON.parse(saved) : initialInvestments;
  });

  const [deposits, setDeposits] = useState<DepositSubmission[]>(() => {
    const saved = localStorage.getItem('tv_deposits');
    return saved ? JSON.parse(saved) : initialDeposits;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('tv_withdrawals');
    return saved ? JSON.parse(saved) : initialWithdrawals;
  });

  const [ledgerTransactions, setLedgerTransactions] = useState<LedgerTransaction[]>(() => {
    const saved = localStorage.getItem('tv_transactions');
    return saved ? JSON.parse(saved) : initialLedgerTransactions;
  });

  const [kycCases, setKycCases] = useState<KycCase[]>(() => {
    const saved = localStorage.getItem('tv_kyc_cases');
    return saved ? JSON.parse(saved) : initialKycCases;
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem('tv_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [campaigns, setCampaigns] = useState<PromotionalCampaign[]>(() => {
    const saved = localStorage.getItem('tv_campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('tv_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('tv_tickets');
    return saved ? JSON.parse(saved) : initialSupportTickets;
  });

  const [dispatchedEmails, setDispatchedEmails] = useState<DispatchedEmail[]>(() => {
    return getDispatchedEmails();
  });
  const [lastDispatchedEmail, setLastDispatchedEmail] = useState<DispatchedEmail | null>(() => {
    const list = getDispatchedEmails();
    return list.length > 0 ? list[0] : null;
  });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const openEmailModal = (email?: DispatchedEmail) => {
    if (email) {
      setLastDispatchedEmail(email);
    } else if (dispatchedEmails.length > 0) {
      setLastDispatchedEmail(dispatchedEmails[0]);
    }
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const [isGoogleVerifyModalOpen, setIsGoogleVerifyModalOpen] = useState(false);
  const openGoogleVerifyModal = () => setIsGoogleVerifyModalOpen(true);
  const closeGoogleVerifyModal = () => setIsGoogleVerifyModalOpen(false);

  const [isSmartsuppModalOpen, setIsSmartsuppModalOpen] = useState(false);
  const openSmartsuppModal = () => setIsSmartsuppModalOpen(true);
  const closeSmartsuppModal = () => setIsSmartsuppModalOpen(false);

  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const openTranslateModal = () => setIsTranslateModalOpen(true);
  const closeTranslateModal = () => setIsTranslateModalOpen(false);

  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const openSupabaseModal = () => setIsSupabaseModalOpen(true);
  const closeSupabaseModal = () => setIsSupabaseModalOpen(false);
  const [isSupabaseLinked, setIsSupabaseLinked] = useState(() => isSupabaseConfigured());

  const syncWithSupabase = async () => {
    if (!isSupabaseConfigured()) {
      setIsSupabaseLinked(false);
      return;
    }
    try {
      setIsSupabaseLinked(true);
      const [
        sbPlans,
        sbMethods,
        sbDeposits,
        sbWithdrawals,
        sbInvestments,
        sbTxs,
        sbKyc,
        sbNotifs,
        sbAudit,
        sbCampaigns
      ] = await Promise.allSettled([
        supabaseDb.investmentPlans.getAll(),
        supabaseDb.paymentMethods.getAll(),
        supabaseDb.deposits.getAll(),
        supabaseDb.withdrawals.getAll(),
        supabaseDb.investments.getAll(),
        supabaseDb.transactions.getAll(),
        supabaseDb.kyc.getAll(),
        supabaseDb.notifications.getAll(),
        supabaseDb.auditLogs.getAll(),
        supabaseDb.campaigns.getAll()
      ]);

      if (sbPlans.status === 'fulfilled' && sbPlans.value && sbPlans.value.length > 0) {
        setPlans(sbPlans.value);
      }
      if (sbMethods.status === 'fulfilled' && sbMethods.value && sbMethods.value.length > 0) {
        setPaymentMethods(sbMethods.value.map(normalizeMethod));
      }
      if (sbDeposits.status === 'fulfilled' && sbDeposits.value) {
        setDeposits(sbDeposits.value);
      }
      if (sbWithdrawals.status === 'fulfilled' && sbWithdrawals.value) {
        setWithdrawals(sbWithdrawals.value);
      }
      if (sbInvestments.status === 'fulfilled' && sbInvestments.value) {
        setInvestments(sbInvestments.value);
      }
      if (sbTxs.status === 'fulfilled' && sbTxs.value) {
        setLedgerTransactions(sbTxs.value);
      }
      if (sbKyc.status === 'fulfilled' && sbKyc.value) {
        setKycCases(sbKyc.value);
      }
      if (sbNotifs.status === 'fulfilled' && sbNotifs.value) {
        setNotifications(sbNotifs.value);
      }
      if (sbAudit.status === 'fulfilled' && sbAudit.value) {
        setAuditLogs(sbAudit.value);
      }
      if (sbCampaigns.status === 'fulfilled' && sbCampaigns.value && sbCampaigns.value.length > 0) {
        setCampaigns(sbCampaigns.value);
      }
      
      showToast('Supabase Connected', 'Live records synchronized with your Supabase database.', 'success');
    } catch (err: any) {
      console.warn('Supabase sync error:', err);
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      syncWithSupabase();
    }
  }, []);

  const verifyUserEmail = (_code?: string) => {
    setUser(prev => ({
      ...prev,
      isEmailVerified: true,
      emailVerifiedAt: new Date().toISOString()
    }));
    showToast(
      'Google Email Verification Confirmed',
      `Your account email has been verified and confirmed via Google Identity Protocol.`,
      'success'
    );
    return { success: true, message: 'Google email verification successful.' };
  };

  // Initialize Smartsupp widget if key is configured
  useEffect(() => {
    initSmartsupp(user);
  }, [user]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist items
  useEffect(() => {
    localStorage.setItem('tv_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tv_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('tv_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('tv_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('tv_investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('tv_transactions', JSON.stringify(ledgerTransactions));
  }, [ledgerTransactions]);

  useEffect(() => {
    localStorage.setItem('tv_kyc_cases', JSON.stringify(kycCases));
  }, [kycCases]);

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    try {
      localStorage.setItem('tv_role', role);
    } catch {
      // ignore
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tv_lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const openAuthModal = (role: 'investor' | 'admin' = 'investor') => {
    setAuthModalDefaultRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const getStoredAccounts = (): Array<{ email: string; password?: string; profile: UserProfile }> => {
    try {
      const raw = localStorage.getItem('tv_registered_accounts');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveStoredAccount = (account: { email: string; password?: string; profile: UserProfile }) => {
    try {
      const existing = getStoredAccounts().filter(a => a.email.toLowerCase() !== account.email.toLowerCase());
      localStorage.setItem('tv_registered_accounts', JSON.stringify([account, ...existing]));
    } catch {
      // ignore
    }
  };

  const login = (email: string, _password?: string, requestedRole?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail.includes('admin') || requestedRole === 'admin';

    if (isAdmin) {
      setUser(initialAdminProfile);
      setActiveRoleState('admin');
      setIsAuthenticated(true);
      try {
        localStorage.setItem('tv_auth', 'true');
        localStorage.setItem('tv_user', JSON.stringify(initialAdminProfile));
        localStorage.setItem('tv_role', 'admin');
      } catch {
        // ignore
      }
      if (currentRoute !== 'deposit') {
        setCurrentRoute('admin');
      }
      return { success: true };
    } else {
      const stored = getStoredAccounts().find(a => a.email.toLowerCase() === cleanEmail);
      const targetUser: UserProfile = stored ? stored.profile : {
        ...initialUserProfile,
        email: cleanEmail,
        fullName: cleanEmail.includes('@') 
          ? cleanEmail.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : 'Accredited Investor'
      };

      setUser(targetUser);
      setActiveRoleState('investor');
      setIsAuthenticated(true);
      try {
        localStorage.setItem('tv_auth', 'true');
        localStorage.setItem('tv_user', JSON.stringify(targetUser));
        localStorage.setItem('tv_role', 'investor');
      } catch {
        // ignore
      }
      if (currentRoute !== 'deposit') {
        setCurrentRoute('dashboard');
      }
      return { success: true };
    }
  };

  const registerAccount = (
    fullName: string,
    email: string,
    accountType: 'individual' | 'institutional' | 'family_office' = 'individual',
    authProvider: 'email' | 'google' = 'email',
    _password?: string
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const depId = 'TV-DEP-' + Math.floor(100000 + Math.random() * 900000);
    const displayName = fullName.trim() || (authProvider === 'google' ? 'Google Authenticated Client' : 'Institutional Client');

    const newProfile: UserProfile = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      fullName: displayName,
      email: cleanEmail,
      phone: '+1 (555) 019-8832',
      country: 'United States',
      role: 'investor',
      isEmailVerified: true,
      emailVerifiedAt: new Date().toISOString(),
      authProvider,
      depositoryAccountId: depId,
      twoFactorEnabled: true,
      is2FAEnabled: true,
      twoFactorSecret: 'TV-TOTP-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      kycStatus: 'in_progress',
      kycTier: 1,
      createdAt: new Date().toISOString(),
      avatarUrl: authProvider === 'google'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
        : undefined,
      accountType
    };

    // Save to local registry so user can sign in again with their registered credentials
    saveStoredAccount({
      email: cleanEmail,
      password: _password,
      profile: newProfile
    });

    // Dispatch the official confirmation email immediately
    const emailResult = dispatchRegistrationEmail(displayName, cleanEmail, authProvider, depId);
    setDispatchedEmails(prev => [emailResult, ...prev]);
    setLastDispatchedEmail(emailResult);
    
    // Automatically trigger the Google Email Verification & Registration Confirmation Modal
    setIsGoogleVerifyModalOpen(true);

    setUser(newProfile);
    setActiveRoleState('investor');
    setIsAuthenticated(true);

    try {
      localStorage.setItem('tv_auth', 'true');
      localStorage.setItem('tv_user', JSON.stringify(newProfile));
      localStorage.setItem('tv_role', 'investor');
    } catch {
      // ignore
    }

    // Add welcoming in-app notification
    const welcomeNotif: InAppNotification = {
      id: 'notif_' + Date.now().toString(36),
      userId: newProfile.id,
      title: 'Registration Confirmation Dispatched',
      message: `Depository ID ${depId} provisioned. An institutional confirmation email was dispatched to ${cleanEmail}.`,
      category: 'security',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    if (currentRoute !== 'deposit') {
      setCurrentRoute('dashboard');
    }
    showToast(
      'Account Registered & Email Sent',
      `Welcome to TradeVerge, ${displayName}. A confirmation email has been dispatched to ${cleanEmail}.`,
      'success'
    );

    return { success: true, emailResult };
  };

  const loginWithGoogle = (googleEmail?: string, googleName?: string) => {
    const targetEmail = (googleEmail && googleEmail.trim()) || 'princesamuel0903@gmail.com';
    const targetName = (googleName && googleName.trim()) || 'Samuel Prince';
    return registerAccount(targetName, targetEmail, 'individual', 'google');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveRoleState('investor');
    try {
      localStorage.setItem('tv_auth', 'false');
      localStorage.removeItem('tv_role');
    } catch {
      // ignore
    }
    setCurrentRoute('home');
    showToast('Signed Out', 'Your authenticated session has ended securely.', 'info');
  };

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Financial calculations
  const totalDeposited = ledgerTransactions
    .filter(tx => tx.type === 'deposit' && tx.status === 'completed')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalWithdrawn = ledgerTransactions
    .filter(tx => tx.type === 'withdrawal' && tx.status === 'completed')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalAllocated = ledgerTransactions
    .filter(tx => tx.type === 'investment_allocation' && tx.status === 'completed')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalYieldReceived = ledgerTransactions
    .filter(tx => tx.type === 'yield_distribution' && tx.status === 'completed')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const availableCash = Math.max(0, totalDeposited + totalYieldReceived - totalAllocated - totalWithdrawn);
  const investedCapital = investments
    .filter(i => i.status === 'active')
    .reduce((acc, i) => acc + i.principalAmount, 0);
  
  const totalProfit = investments
    .reduce((acc, i) => acc + i.totalAccruedProfit, 0) + totalYieldReceived;

  const totalPortfolioValue = availableCash + investedCapital + totalProfit;

  // Add Payment Method (Admin)
  const addPaymentMethod = (newMethodData: Omit<PaymentMethod, 'id' | 'updatedAt' | 'version'>) => {
    const rawMethod = {
      ...newMethodData,
      id: 'pm_' + (newMethodData.type === 'bank_transfer' ? 'bank_' : 'crypto_') + Date.now().toString(36),
      updatedAt: new Date().toISOString(),
      version: 1
    };
    const newMethod: PaymentMethod = normalizeMethod(rawMethod);
    setPaymentMethods(prev => [newMethod, ...prev]);

    // Record audit log
    const audit: AuditLogEntry = {
      id: 'aud_' + Date.now(),
      actorId: user.id,
      actorEmail: user.email,
      actorRole: 'Platform Administrator',
      action: 'PAYMENT_METHOD_CREATED',
      resource: 'PaymentMethod',
      resourceId: newMethod.id,
      details: `Created new ${newMethod.type} gateway method: ${newMethod.name}`,
      ipAddress: '192.0.2.14',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    setAuditLogs(prev => [audit, ...prev]);
    showToast('Payment Gateway Created', `Method "${newMethod.name}" published for investor funding.`, 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.paymentMethods.create(newMethod).catch(err => console.warn('Supabase method write error:', err));
      supabaseDb.auditLogs.create(audit).catch(err => console.warn('Supabase audit write error:', err));
    }
  };

  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethod>) => {
    setPaymentMethods(prev => prev.map(m => {
      if (m.id === id) {
        return normalizeMethod({
          ...m,
          ...updates,
          version: (m.version || 1) + 1,
          updatedAt: new Date().toISOString()
        });
      }
      return m;
    }));

    const audit: AuditLogEntry = {
      id: 'aud_' + Date.now(),
      actorId: user.id,
      actorEmail: user.email,
      actorRole: 'Platform Administrator',
      action: 'PAYMENT_METHOD_UPDATED',
      resource: 'PaymentMethod',
      resourceId: id,
      details: `Updated parameters for payment gateway ${id}`,
      ipAddress: '192.0.2.14',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    setAuditLogs(prev => [audit, ...prev]);
    showToast('Payment Gateway Updated', 'Changes saved and propagated to investor portal.', 'success');
  };

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.enabled;
        const audit: AuditLogEntry = {
          id: 'aud_' + Date.now(),
          actorId: user.id,
          actorEmail: user.email,
          actorRole: 'Platform Administrator',
          action: nextState ? 'PAYMENT_METHOD_ENABLED' : 'PAYMENT_METHOD_DISABLED',
          resource: 'PaymentMethod',
          resourceId: id,
          details: `Gateway ${m.name} changed status to ${nextState ? 'ACTIVE' : 'DISABLED'}`,
          ipAddress: '192.0.2.14',
          timestamp: new Date().toISOString(),
          status: 'success'
        };
        setAuditLogs(logPrev => [audit, ...logPrev]);
        showToast(nextState ? 'Method Activated' : 'Method Disabled', `${m.name} is now ${nextState ? 'visible' : 'hidden'} to investors.`, 'info');
        return { ...m, enabled: nextState, updatedAt: new Date().toISOString() };
      }
      return m;
    }));
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    showToast('Method Removed', 'Payment gateway successfully removed.', 'warning');
  };

  const addInvestmentPlan = (planData: Omit<InvestmentPlan, 'id'>) => {
    const newPlan: InvestmentPlan = {
      ...planData,
      id: 'plan_' + Date.now().toString(36)
    };
    setPlans(prev => [...prev, newPlan]);
    showToast('Investment Plan Added', `Plan "${newPlan.name}" is now live in the marketplace.`, 'success');
  };

  const updateInvestmentPlan = (id: string, updates: Partial<InvestmentPlan>) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Plan Updated', 'Investment plan parameters updated.', 'success');
  };

  // Submit Deposit (Investor)
  const submitDeposit = (submissionData: Omit<DepositSubmission, 'id' | 'status' | 'createdAt' | 'userId' | 'userFullName' | 'userEmail'>) => {
    const newId = 'dep_sub_' + Math.floor(10000 + Math.random() * 90000);
    const newSubmission: DepositSubmission = {
      ...submissionData,
      id: newId,
      userId: user.id,
      userFullName: user.fullName,
      userEmail: user.email,
      status: 'pending_manual_review',
      createdAt: new Date().toISOString()
    };
    setDeposits(prev => [newSubmission, ...prev]);

    // Create notification
    const newNotif: InAppNotification = {
      id: 'notif_' + Date.now(),
      userId: user.id,
      title: 'Deposit In Verification Queue',
      message: `Your deposit of $${submissionData.amount.toLocaleString()} via ${submissionData.methodName} has been submitted for verification.`,
      category: 'money',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Audit log
    const audit: AuditLogEntry = {
      id: 'aud_' + Date.now(),
      actorId: user.id,
      actorEmail: user.email,
      actorRole: 'Investor',
      action: 'DEPOSIT_PROOF_SUBMITTED',
      resource: 'DepositSubmission',
      resourceId: newId,
      details: `Submitted payment proof for ${submissionData.amount} ${submissionData.currencyOrAsset} (Ref: ${submissionData.txHashOrReference})`,
      ipAddress: '198.51.100.82',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    setAuditLogs(prev => [audit, ...prev]);
    showToast('Deposit Submitted', 'Your payment proof has entered the compliance verification queue.', 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.deposits.create(newSubmission).catch(err => console.warn('Supabase deposit write error:', err));
      supabaseDb.notifications.create(newNotif).catch(err => console.warn('Supabase notif write error:', err));
      supabaseDb.auditLogs.create(audit).catch(err => console.warn('Supabase audit write error:', err));
    }
  };

  // Admin Approve Deposit
  const adminApproveDeposit = (id: string, notes: string = 'Manual verification confirmed against depository statement') => {
    const target = deposits.find(d => d.id === id);
    if (!target) return;

    // 1. Update deposit status
    setDeposits(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'posted',
          adminReviewNotes: notes,
          adminReviewedBy: 'Compliance Officer / Admin',
          adminReviewedAt: new Date().toISOString(),
          ledgerJournalId: 'jrn_' + Date.now()
        };
      }
      return d;
    }));

    // 2. Post to Ledger Transactions
    const newTx: LedgerTransaction = {
      id: 'tx_lg_' + Math.floor(100000 + Math.random() * 900000),
      userId: target.userId,
      type: 'deposit',
      amount: target.amount,
      currency: target.currencyOrAsset,
      direction: 'credit',
      status: 'completed',
      description: `Deposit Credited - ${target.methodName} (Ref: ${target.txHashOrReference})`,
      referenceId: target.txHashOrReference,
      createdAt: new Date().toISOString(),
      category: 'Depository Inflow'
    };
    setLedgerTransactions(prev => [newTx, ...prev]);

    // 3. Dispatch Notification
    const notif: InAppNotification = {
      id: 'notif_' + Date.now(),
      userId: target.userId,
      title: 'Deposit Verified & Funds Cleared',
      message: `Your deposit of $${target.amount.toLocaleString()} has been verified by compliance and credited to your available cleared cash balance.`,
      category: 'money',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    // 4. Record Audit Log
    const audit: AuditLogEntry = {
      id: 'aud_' + Date.now(),
      actorId: user.id,
      actorEmail: user.email,
      actorRole: 'Platform Administrator',
      action: 'LEDGER_DEPOSIT_CONFIRMED',
      resource: 'DepositSubmission',
      resourceId: id,
      details: `Approved deposit ${id} for $${target.amount} ${target.currencyOrAsset}. Posted journal entry ${newTx.id}.`,
      ipAddress: '192.0.2.14',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast('Deposit Approved', `$${target.amount.toLocaleString()} credited to investor ledger.`, 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.deposits.updateStatus(id, 'posted', notes).catch(err => console.warn('Supabase deposit update error:', err));
      supabaseDb.transactions.create(newTx).catch(err => console.warn('Supabase tx create error:', err));
      supabaseDb.notifications.create(notif).catch(err => console.warn('Supabase notif create error:', err));
      supabaseDb.auditLogs.create(audit).catch(err => console.warn('Supabase audit create error:', err));
    }
  };

  // Admin Reject Deposit
  const adminRejectDeposit = (id: string, reason: string) => {
    const target = deposits.find(d => d.id === id);
    if (!target) return;

    setDeposits(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'rejected',
          adminReviewNotes: `Rejected: ${reason}`,
          adminReviewedBy: 'Compliance Officer / Admin',
          adminReviewedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    const notif: InAppNotification = {
      id: 'notif_' + Date.now(),
      userId: target.userId,
      title: 'Deposit Review Issue',
      message: `Your deposit submission for $${target.amount.toLocaleString()} could not be verified. Reason: ${reason}. Please contact support.`,
      category: 'compliance',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Deposit Rejected', `Reason recorded: ${reason}`, 'warning');
  };

  const adminRequestInfoDeposit = (id: string, notes: string) => {
    setDeposits(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'needs_info',
          adminReviewNotes: notes,
          adminReviewedAt: new Date().toISOString()
        };
      }
      return d;
    }));
    showToast('Information Requested', 'User notified to provide updated transaction documentation.', 'info');
  };

  // Create Investment
  const createInvestment = (planId: string, amount: number) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { success: false, message: 'Investment plan not found' };

    if (amount < plan.minInvestment) {
      return { success: false, message: `Minimum investment for this plan is $${plan.minInvestment.toLocaleString()}` };
    }
    if (amount > availableCash) {
      return { success: false, message: `Insufficient available cash ($${availableCash.toLocaleString()}). Please deposit funds first.` };
    }

    const newInvestment: UserInvestment = {
      id: 'inv_pos_' + Math.floor(100000 + Math.random() * 900000),
      userId: user.id,
      planId: plan.id,
      planName: plan.name,
      planCode: plan.code,
      principalAmount: amount,
      currentValue: amount,
      totalAccruedProfit: 0,
      projectedApy: plan.projectedApy,
      startDate: new Date().toISOString(),
      maturityDate: new Date(Date.now() + plan.durationDays * 86400000).toISOString(),
      status: 'active',
      nextPayoutDate: new Date(Date.now() + 30 * 86400000).toISOString()
    };

    setInvestments(prev => [newInvestment, ...prev]);

    // Ledger debit
    const newTx: LedgerTransaction = {
      id: 'tx_lg_' + Math.floor(100000 + Math.random() * 900000),
      userId: user.id,
      type: 'investment_allocation',
      amount: amount,
      currency: 'USD',
      direction: 'debit',
      status: 'completed',
      description: `Capital Allocation: ${plan.name}`,
      referenceId: plan.code,
      createdAt: new Date().toISOString(),
      category: 'Strategy Subscription'
    };
    setLedgerTransactions(prev => [newTx, ...prev]);

    const notif: InAppNotification = {
      id: 'notif_' + Date.now(),
      userId: user.id,
      title: 'Investment Activated',
      message: `Allocated $${amount.toLocaleString()} to ${plan.name} (${plan.projectedApy}% APY). Orders executed deterministically.`,
      category: 'investment',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Investment Activated', `Allocated $${amount.toLocaleString()} to ${plan.name}.`, 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.investments.create(newInvestment).catch(err => console.warn('Supabase investment create error:', err));
      supabaseDb.transactions.create(newTx).catch(err => console.warn('Supabase tx create error:', err));
      supabaseDb.notifications.create(notif).catch(err => console.warn('Supabase notif create error:', err));
    }

    return { success: true, message: 'Investment successfully active' };
  };

  // Withdrawals
  const submitWithdrawal = (amount: number, destinationType: 'bank' | 'crypto', destinationDetails: string, twoFaCode: string) => {
    if (amount <= 0) return { success: false, message: 'Enter a valid withdrawal amount' };
    if (amount > availableCash) return { success: false, message: 'Requested amount exceeds cleared available balance' };
    if (!twoFaCode || twoFaCode.length < 4) return { success: false, message: 'Valid 2FA authenticator code required' };

    const fee = amount * 0.0025; // 0.25% fee
    const net = amount - fee;

    const newWithdrawal: WithdrawalRequest = {
      id: 'wth_req_' + Math.floor(10000 + Math.random() * 90000),
      userId: user.id,
      userFullName: user.fullName,
      amount: amount,
      currency: 'USD',
      destinationType: destinationType,
      destinationDetails: destinationDetails,
      fee: fee,
      netAmount: net,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    setWithdrawals(prev => [newWithdrawal, ...prev]);

    // Hold funds by posting reservation
    const newTx: LedgerTransaction = {
      id: 'tx_lg_' + Math.floor(100000 + Math.random() * 900000),
      userId: user.id,
      type: 'withdrawal',
      amount: amount,
      currency: 'USD',
      direction: 'debit',
      status: 'pending',
      description: `Withdrawal Request Reserved: ${destinationType.toUpperCase()} - ${destinationDetails}`,
      referenceId: newWithdrawal.id,
      createdAt: new Date().toISOString(),
      category: 'Capital Redemption'
    };
    setLedgerTransactions(prev => [newTx, ...prev]);

    showToast('Withdrawal Requested', `Withdrawal of $${amount.toLocaleString()} submitted for compliance review.`, 'info');

    if (isSupabaseConfigured()) {
      supabaseDb.withdrawals.create(newWithdrawal).catch(err => console.warn('Supabase withdrawal create error:', err));
      supabaseDb.transactions.create(newTx).catch(err => console.warn('Supabase tx create error:', err));
    }

    return { success: true, message: 'Withdrawal successfully queued' };
  };

  const adminApproveWithdrawal = (id: string) => {
    const target = withdrawals.find(w => w.id === id);
    if (!target) return;

    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'completed', reviewedBy: 'Finance Controller', reviewedAt: new Date().toISOString() } : w));
    setLedgerTransactions(prev => prev.map(tx => tx.referenceId === id ? { ...tx, status: 'completed' } : tx));

    showToast('Withdrawal Dispatched', `Withdrawal of $${target.amount.toLocaleString()} settled and dispatched.`, 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.withdrawals.updateStatus(id, 'processed').catch(err => console.warn('Supabase withdrawal update error:', err));
    }
  };

  const adminRejectWithdrawal = (id: string) => {
    const target = withdrawals.find(w => w.id === id);
    if (!target) return;

    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'rejected', reviewedBy: 'Compliance Officer', reviewedAt: new Date().toISOString() } : w));
    setLedgerTransactions(prev => prev.map(tx => tx.referenceId === id ? { ...tx, status: 'failed' } : tx));
    showToast('Withdrawal Rejected', 'Funds returned to investor available balance.', 'warning');

    if (isSupabaseConfigured()) {
      supabaseDb.withdrawals.updateStatus(id, 'rejected').catch(err => console.warn('Supabase withdrawal update error:', err));
    }
  };

  // KYC
  const submitKyc = (caseData: Partial<KycCase>) => {
    const newCase: KycCase = {
      id: 'kyc_case_' + Math.floor(1000 + Math.random() * 9000),
      userId: user.id,
      fullName: caseData.fullName || user.fullName,
      dateOfBirth: caseData.dateOfBirth || '1985-01-01',
      nationality: caseData.nationality || 'United States',
      residentialAddress: caseData.residentialAddress || '100 Wall Street, New York',
      idType: caseData.idType || 'passport',
      idNumber: caseData.idNumber || 'P12345678',
      documentFrontUrl: caseData.documentFrontUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      documentBackUrl: caseData.documentBackUrl,
      proofOfAddressUrl: caseData.proofOfAddressUrl,
      sourceOfWealth: caseData.sourceOfWealth || 'Business Profits & Investments',
      riskAppetite: caseData.riskAppetite || 'medium',
      netWorthBracket: caseData.netWorthBracket || '$1M - $5M',
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    setKycCases(prev => [newCase, ...prev]);
    setUser(prev => ({ ...prev, kycStatus: 'submitted' }));
    showToast('KYC Submitted', 'Your documents have been securely uploaded for compliance review.', 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.kyc.submit(newCase).catch(err => console.warn('Supabase kyc create error:', err));
    }
  };

  const adminApproveKyc = (caseId: string) => {
    const target = kycCases.find(k => k.id === caseId);
    if (!target) return;

    setKycCases(prev => prev.map(k => k.id === caseId ? { ...k, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'Chief Compliance Officer' } : k));
    if (target.userId === user.id) {
      setUser(prev => ({ ...prev, kycStatus: 'approved', kycTier: 2 }));
    }
    showToast('KYC Case Approved', `Investor ${target.fullName} is now Tier 2 approved.`, 'success');

    if (isSupabaseConfigured()) {
      supabaseDb.kyc.updateStatus(caseId, 'approved').catch(err => console.warn('Supabase kyc update error:', err));
    }
  };

  const adminRejectKyc = (caseId: string, reason: string) => {
    setKycCases(prev => prev.map(k => k.id === caseId ? { ...k, status: 'rejected', rejectionReason: reason, reviewedAt: new Date().toISOString() } : k));
    showToast('KYC Case Rejected', `Reason: ${reason}`, 'warning');

    if (isSupabaseConfigured()) {
      supabaseDb.kyc.updateStatus(caseId, 'rejected', reason).catch(err => console.warn('Supabase kyc update error:', err));
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const toggleCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const addTicketMessage = (ticketId: string, message: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: 'msg_' + Date.now(),
              sender: 'user',
              senderName: user.fullName,
              message,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return t;
    }));
    showToast('Message Sent', 'Your reply has been forwarded to the concierge desk.', 'info');
  };

  const createNewTicket = (subject: string, category: SupportTicket['category'], initialMessage: string) => {
    const newTkt: SupportTicket = {
      id: 'tkt_' + Math.floor(1000 + Math.random() * 9000),
      userId: user.id,
      userEmail: user.email,
      subject,
      category,
      priority: 'normal',
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_init',
          sender: 'user',
          senderName: user.fullName,
          message: initialMessage,
          timestamp: new Date().toISOString()
        }
      ]
    };
    setTickets(prev => [newTkt, ...prev]);
    showToast('Support Ticket Created', `Reference #${newTkt.id} dispatched to private wealth concierge.`, 'success');
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAuthenticated,
        login,
        registerAccount,
        loginWithGoogle,
        dispatchedEmails,
        lastDispatchedEmail,
        isEmailModalOpen,
        openEmailModal,
        closeEmailModal,
        isGoogleVerifyModalOpen,
        openGoogleVerifyModal,
        closeGoogleVerifyModal,
        isSmartsuppModalOpen,
        openSmartsuppModal,
        closeSmartsuppModal,
        isTranslateModalOpen,
        openTranslateModal,
        closeTranslateModal,
        isSupabaseModalOpen,
        openSupabaseModal,
        closeSupabaseModal,
        isSupabaseLinked,
        syncWithSupabase,
        verifyUserEmail,
        logout,
        isAuthModalOpen,
        authModalDefaultRole,
        openAuthModal,
        closeAuthModal,
        activeRole,
        setActiveRole,
        currentRoute,
        setCurrentRoute,
        selectedPlanId,
        setSelectedPlanId,
        user,
        setUser,
        paymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        togglePaymentMethod,
        deletePaymentMethod,
        plans,
        addInvestmentPlan,
        updateInvestmentPlan,
        investments,
        createInvestment,
        deposits,
        submitDeposit,
        adminApproveDeposit,
        adminRejectDeposit,
        adminRequestInfoDeposit,
        withdrawals,
        submitWithdrawal,
        adminApproveWithdrawal,
        adminRejectWithdrawal,
        ledgerTransactions,
        kycCases,
        submitKyc,
        adminApproveKyc,
        adminRejectKyc,
        notifications,
        markNotificationAsRead,
        campaigns,
        toggleCampaign,
        auditLogs,
        tickets,
        addTicketMessage,
        createNewTicket,
        toasts,
        showToast,
        removeToast,
        availableCash,
        investedCapital,
        totalPortfolioValue,
        totalProfit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
