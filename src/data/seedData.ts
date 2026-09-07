import { 
  PaymentMethod, 
  InvestmentPlan, 
  UserProfile, 
  DepositSubmission, 
  WithdrawalRequest, 
  UserInvestment, 
  LedgerTransaction, 
  KycCase, 
  InAppNotification, 
  PromotionalCampaign, 
  AuditLogEntry, 
  SupportTicket 
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr_default',
  fullName: 'Institutional Investor',
  email: 'investor@tradeverge.live',
  phone: '',
  country: 'United States',
  role: 'investor',
  isEmailVerified: true,
  is2FAEnabled: false,
  kycStatus: 'not_started',
  kycTier: 1,
  createdAt: new Date().toISOString(),
  accountType: 'individual',
  institutionName: ''
};

export const initialAdminProfile: UserProfile = {
  id: 'usr_admin',
  fullName: 'Administrator',
  email: 'admin@tradeverge.live',
  phone: '',
  country: 'United States',
  role: 'admin',
  isEmailVerified: true,
  is2FAEnabled: true,
  kycStatus: 'approved',
  kycTier: 3,
  createdAt: new Date().toISOString(),
  accountType: 'institutional',
  institutionName: 'TradeVerge Depository Operations'
};

export const initialPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_bank_usd_jpm',
    type: 'bank_transfer',
    name: 'JPMorgan Chase Institutional Wire (USD)',
    enabled: true,
    currencyOrAsset: 'USD',
    currency: 'USD',
    minDeposit: 1000,
    maxDeposit: 10000000,
    minAmount: 1000,
    maxAmount: 10000000,
    feePercent: 0,
    processingTime: 'Same Day - 24 Hours',
    instructions: 'Please initiate an institutional wire transfer via Fedwire or SWIFT. You MUST include your unique Reference Code in Field 70 (Remittance Information) to ensure automatic matching.',
    bankName: 'JPMorgan Chase Bank, N.A.',
    accountName: 'TradeVerge Custody Trust Ltd - Segregated Client Funds',
    accountNumber: '894210948123',
    routingNumber: '021000021 (ABA Fedwire)',
    swiftCode: 'CHASUS33XXX',
    iban: 'US89CHAS021000021894210948123',
    bankDetails: {
      bankName: 'JPMorgan Chase Bank, N.A.',
      accountName: 'TradeVerge Custody Trust Ltd - Segregated Client Funds',
      accountNumber: '894210948123',
      routingNumber: '021000021 (ABA Fedwire)',
      swiftBic: 'CHASUS33XXX',
      iban: 'US89CHAS021000021894210948123',
      bankAddress: '383 Madison Avenue, New York, NY 10179, United States',
      referencePattern: 'TV-{{USER_ID}}-DEP',
      currency: 'USD'
    },
    updatedAt: '2026-08-15T10:00:00Z',
    version: 3
  },
  {
    id: 'pm_bank_eur_barclays',
    type: 'bank_transfer',
    name: 'Barclays Private Bank SEPA & Wire (EUR)',
    enabled: true,
    currencyOrAsset: 'EUR',
    currency: 'EUR',
    minDeposit: 1000,
    maxDeposit: 5000000,
    minAmount: 1000,
    maxAmount: 5000000,
    feePercent: 0,
    processingTime: '1 - 2 Business Days',
    instructions: 'Send Euro SEPA Credit Transfer or international SWIFT wire. Quote your Client Reference in the payment narrative.',
    bankName: 'Barclays Bank PLC',
    accountName: 'TradeVerge Europe Segregated Depository Ltd',
    accountNumber: '44810924',
    routingNumber: '20-00-00',
    swiftCode: 'BARCGB22XXX',
    iban: 'GB29BARC20000044810924',
    bankDetails: {
      bankName: 'Barclays Bank PLC',
      accountName: 'TradeVerge Europe Segregated Depository Ltd',
      accountNumber: '44810924',
      routingNumber: '20-00-00',
      swiftBic: 'BARCGB22XXX',
      iban: 'GB29BARC20000044810924',
      bankAddress: '1 Churchill Place, Canary Wharf, London E14 5HP, United Kingdom',
      referencePattern: 'TV-EUR-{{USER_ID}}',
      currency: 'EUR'
    },
    updatedAt: '2026-08-20T14:30:00Z',
    version: 2
  },
  {
    id: 'pm_crypto_btc',
    type: 'crypto',
    name: 'Bitcoin (BTC - Native SegWit)',
    enabled: true,
    currencyOrAsset: 'BTC',
    asset: 'BTC',
    network: 'Bitcoin Mainnet (bech32 / SegWit)',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    requiredConfirmations: 3,
    minDeposit: 0.005,
    maxDeposit: 50,
    minAmount: 0.005,
    maxAmount: 50,
    feePercent: 0,
    processingTime: '3 Network Confirmations (~30 mins)',
    instructions: 'Send only native Bitcoin (BTC) to this address. Do not send BCH, BSV, or wrapped tokens. Funds are reconciled on-chain upon 3 confirmations.',
    cryptoDetails: {
      asset: 'BTC',
      network: 'Bitcoin Mainnet (bech32 / SegWit)',
      walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      confirmationThreshold: 3
    },
    updatedAt: '2026-08-25T11:20:00Z',
    version: 4
  },
  {
    id: 'pm_crypto_usdt_trc20',
    type: 'crypto',
    name: 'Tether USD (USDT - Tron TRC-20)',
    enabled: true,
    currencyOrAsset: 'USDT',
    asset: 'USDT',
    network: 'Tron TRC-20',
    walletAddress: 'TYDzsYUE22jC47T2j6DqE52G9mF8b1p9Xz',
    requiredConfirmations: 20,
    minDeposit: 250,
    maxDeposit: 1000000,
    minAmount: 250,
    maxAmount: 1000000,
    feePercent: 0,
    processingTime: '20 Confirmations (~2 mins)',
    instructions: 'Send only USDT via Tron (TRC-20). Transfers via Ethereum, BSC, or other networks sent to this address will be permanently lost.',
    cryptoDetails: {
      asset: 'USDT',
      network: 'Tron TRC-20',
      walletAddress: 'TYDzsYUE22jC47T2j6DqE52G9mF8b1p9Xz',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=TYDzsYUE22jC47T2j6DqE52G9mF8b1p9Xz',
      confirmationThreshold: 20
    },
    updatedAt: '2026-08-28T16:00:00Z',
    version: 2
  },
  {
    id: 'pm_crypto_usdc_erc20',
    type: 'crypto',
    name: 'USD Coin (USDC - Ethereum ERC-20)',
    enabled: true,
    currencyOrAsset: 'USDC',
    asset: 'USDC',
    network: 'Ethereum (ERC-20)',
    walletAddress: '0x71C8366420A092679b5471834cA4747476326164',
    requiredConfirmations: 12,
    minDeposit: 500,
    maxDeposit: 5000000,
    minAmount: 500,
    maxAmount: 5000000,
    feePercent: 0,
    processingTime: '12 Confirmations (~3 mins)',
    instructions: 'Send official Centre USDC tokens via Ethereum Mainnet. Smart contracts and cold storage verify incoming transfers immediately.',
    cryptoDetails: {
      asset: 'USDC',
      network: 'Ethereum (ERC-20)',
      walletAddress: '0x71C8366420A092679b5471834cA4747476326164',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=ethereum:0x71C8366420A092679b5471834cA4747476326164',
      confirmationThreshold: 12
    },
    updatedAt: '2026-08-30T09:15:00Z',
    version: 1
  },
  {
    id: 'pm_crypto_eth',
    type: 'crypto',
    name: 'Ethereum (ETH - Native)',
    enabled: true,
    currencyOrAsset: 'ETH',
    asset: 'ETH',
    network: 'Ethereum Mainnet',
    walletAddress: '0x882aB0135d92842E9437b783DbB3361A02E39E09',
    requiredConfirmations: 12,
    minDeposit: 0.2,
    maxDeposit: 1000,
    minAmount: 0.2,
    maxAmount: 1000,
    feePercent: 0,
    processingTime: '12 Confirmations (~3 mins)',
    instructions: 'Transfer native Ether to our institutional multi-signature custody address.',
    cryptoDetails: {
      asset: 'ETH',
      network: 'Ethereum Mainnet',
      walletAddress: '0x882aB0135d92842E9437b783DbB3361A02E39E09',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=ethereum:0x882aB0135d92842E9437b783DbB3361A02E39E09',
      confirmationThreshold: 12
    },
    updatedAt: '2026-08-31T15:45:00Z',
    version: 1
  }
];

export const initialInvestmentPlans: InvestmentPlan[] = [
  {
    id: 'plan_sovereign_alpha',
    code: 'TV-SOV-01',
    name: 'Sovereign Treasury & Macro Yield',
    category: 'Sovereign Treasury',
    riskLevel: 'Conservative',
    projectedApy: 8.75,
    durationDays: 90,
    minInvestment: 2500,
    maxInvestment: 5000000,
    managementFeePercent: 0.35,
    liquidity: 'Quarterly',
    description: 'Ultra-low volatility portfolio invested in G7 short-term sovereign debt, inflation-hedged TIPS, and AAA supra-national agency bonds.',
    objective: 'Capital preservation with steady real annualized yield above benchmark risk-free rates.',
    strategy: 'Direct holding of 3-month to 1-year US Treasuries and German Bunds held to maturity in segregated custodian accounts.',
    assetAllocation: [
      { asset: 'US Treasury Bills (0-3M)', percentage: 55 },
      { asset: 'German Federal Bunds', percentage: 25 },
      { asset: 'World Bank Supranational Debt', percentage: 15 },
      { asset: 'Cash & Overnight Reverse Repo', percentage: 5 }
    ],
    active: true
  },
  {
    id: 'plan_quant_arbitrage',
    code: 'TV-QNT-02',
    name: 'Quantitative Market-Neutral Arbitrage',
    category: 'Quantitative Strategies',
    riskLevel: 'Moderate',
    projectedApy: 16.80,
    durationDays: 180,
    minInvestment: 5000,
    maxInvestment: 2500000,
    managementFeePercent: 0.75,
    liquidity: '30-Day Notice',
    description: 'Delta-neutral cross-venue spot-futures basis arbitrage and statistical order-book discrepancy execution with no directional market exposure.',
    objective: 'Consistent, non-correlated alpha generation independent of bull or bear macro cycles.',
    strategy: 'High-frequency algorithmic capture of funding rate differentials and inter-exchange spreads via institutional colocation.',
    assetAllocation: [
      { asset: 'BTC/ETH Basis Spreads', percentage: 45 },
      { asset: 'CeFi/DeFi Lending Discrepancy', percentage: 30 },
      { asset: 'Collateralized Overnight Liquidity', percentage: 20 },
      { asset: 'Risk Reserve Fund', percentage: 5 }
    ],
    active: true
  },
  {
    id: 'plan_senior_real_estate',
    code: 'TV-RE-03',
    name: 'Senior Real Estate & Private Credit Debt',
    category: 'Real Estate Debt',
    riskLevel: 'Growth',
    projectedApy: 21.50,
    durationDays: 360,
    minInvestment: 10000,
    maxInvestment: 10000000,
    managementFeePercent: 1.0,
    liquidity: 'End of Term',
    description: 'First-lien mortgages and senior secured bridge loans on premium commercial logistics and multifamily properties in high-growth prime corridors.',
    objective: 'High contractual income underpinned by substantial physical real estate collateral at <= 65% LTV.',
    strategy: 'Underwriting senior debt tranches with personal guarantees, first-rank mortgages, and escrow-backed interest reserves.',
    assetAllocation: [
      { asset: 'First-Lien Logistics Facilities', percentage: 40 },
      { asset: 'Prime Multi-Family Secured Notes', percentage: 35 },
      { asset: 'Data Center Bridge Facilities', percentage: 20 },
      { asset: 'Cash Interest Buffer', percentage: 5 }
    ],
    active: true
  },
  {
    id: 'plan_green_infrastructure',
    code: 'TV-GRN-04',
    name: 'Clean Energy & Grid Transition Facility',
    category: 'Green Infrastructure',
    riskLevel: 'Conservative',
    projectedApy: 13.90,
    durationDays: 180,
    minInvestment: 3000,
    maxInvestment: 4000000,
    managementFeePercent: 0.50,
    liquidity: 'Quarterly',
    description: 'Investment in contracted utility-scale solar arrays, utility battery storage systems, and European wind energy concessions.',
    objective: 'Predictable inflation-indexed cash flows backed by 15-year government feed-in tariffs and power purchase agreements (PPAs).',
    strategy: 'Senior debt and revenue-share certificates on operational clean energy assets with credit-rated sovereign counterparties.',
    assetAllocation: [
      { asset: 'Solar Generation Facilities (PPA-backed)', percentage: 45 },
      { asset: 'Utility Battery Storage (BESS)', percentage: 30 },
      { asset: 'Offshore Wind Generation Concessions', percentage: 20 },
      { asset: 'Reserve Capital', percentage: 5 }
    ],
    active: true
  },
  {
    id: 'plan_preipo_private_equity',
    code: 'TV-PE-05',
    name: 'Pre-IPO Institutional Secondary Portfolio',
    category: 'Private Equity',
    riskLevel: 'Opportunistic',
    projectedApy: 29.40,
    durationDays: 720,
    minInvestment: 25000,
    maxInvestment: 15000000,
    managementFeePercent: 1.25,
    liquidity: 'End of Term',
    description: 'Curated direct equity positions in tier-1 artificial intelligence, aerospace, and fintech enterprises preparing for public listing.',
    objective: 'Substantial capital appreciation through late-stage private market discounts relative to public valuation multiples.',
    strategy: 'Acquiring secondary common and preferred stock from early founders and venture funds at negotiated discounts.',
    assetAllocation: [
      { asset: 'Generative AI Foundation Layer', percentage: 40 },
      { asset: 'Space Exploration & Defense Tech', percentage: 30 },
      { asset: 'Global Payment Infrastructure', percentage: 25 },
      { asset: 'Working Capital', percentage: 5 }
    ],
    active: true
  }
];

export const initialInvestments: UserInvestment[] = [];

export const initialDeposits: DepositSubmission[] = [];

export const initialWithdrawals: WithdrawalRequest[] = [];

export const initialLedgerTransactions: LedgerTransaction[] = [];

export const initialKycCases: KycCase[] = [];

export const initialNotifications: InAppNotification[] = [];

export const initialCampaigns: PromotionalCampaign[] = [
  {
    id: 'cmp_01_yield_booster',
    title: 'Q3 Institutional Sovereign Allocation Incentive',
    description: 'Receive a +50 bps bonus yield rebate on newly locked allocations to Sovereign Treasury vehicles over $50,000.',
    badgeText: 'INSTITUTIONAL OFFER',
    ctaText: 'View Sovereign Plan',
    ctaTarget: 'investments',
    active: true,
    placement: 'homepage_banner',
    targetAudience: 'all',
    impressions: 0,
    clicks: 0
  },
  {
    id: 'cmp_02_crypto_zero_fee',
    title: 'Zero Gateway Network Fees on Native Bitcoin & USDT Deposits',
    description: 'All network gateway gas and validation costs absorbed by TradeVerge treasury throughout September.',
    badgeText: 'DEPOSIT SPECIAL',
    ctaText: 'Fund With Crypto',
    ctaTarget: 'deposit',
    active: true,
    placement: 'dashboard_top',
    targetAudience: 'all',
    impressions: 0,
    clicks: 0
  }
];

export const initialAuditLogs: AuditLogEntry[] = [];

export const initialSupportTickets: SupportTicket[] = [];
