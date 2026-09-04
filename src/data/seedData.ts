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
  id: 'usr_inv_882194',
  fullName: 'Sir Arthur Montgomery',
  email: 'a.montgomery@vancecapital.org',
  phone: '+1 (212) 555-0198',
  country: 'United States',
  role: 'investor',
  isEmailVerified: true,
  is2FAEnabled: true,
  twoFactorSecret: 'TV2FA-MONTGOMERY-9921',
  kycStatus: 'approved',
  kycTier: 2,
  createdAt: '2025-11-14T09:30:00Z',
  accountType: 'family_office',
  institutionName: 'Montgomery Family Heritage Trust'
};

export const initialAdminProfile: UserProfile = {
  id: 'usr_adm_001920',
  fullName: 'Marcus Vance',
  email: 'admin@tradeverge.live',
  phone: '+41 22 819 9200',
  country: 'Switzerland',
  role: 'admin',
  isEmailVerified: true,
  is2FAEnabled: true,
  twoFactorSecret: 'TV2FA-ADMIN-CH-7741',
  kycStatus: 'approved',
  kycTier: 3,
  createdAt: '2025-01-01T00:00:00Z',
  accountType: 'institutional',
  institutionName: 'TradeVerge Depository Operations AG'
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

export const initialInvestments: UserInvestment[] = [
  {
    id: 'inv_pos_994101',
    userId: 'usr_inv_882194',
    planId: 'plan_sovereign_alpha',
    planName: 'Sovereign Treasury & Macro Yield',
    planCode: 'TV-SOV-01',
    principalAmount: 20000,
    currentValue: 20875,
    totalAccruedProfit: 875,
    projectedApy: 8.75,
    startDate: '2026-03-01T00:00:00Z',
    maturityDate: '2026-06-01T00:00:00Z',
    status: 'active',
    nextPayoutDate: '2026-04-01T00:00:00Z'
  },
  {
    id: 'inv_pos_994102',
    userId: 'usr_inv_882194',
    planId: 'plan_quant_arbitrage',
    planName: 'Quantitative Market-Neutral Arbitrage',
    planCode: 'TV-QNT-02',
    principalAmount: 15000,
    currentValue: 16260,
    totalAccruedProfit: 1260,
    projectedApy: 16.80,
    startDate: '2026-02-15T00:00:00Z',
    maturityDate: '2026-08-15T00:00:00Z',
    status: 'active',
    nextPayoutDate: '2026-03-15T00:00:00Z'
  }
];

export const initialDeposits: DepositSubmission[] = [
  {
    id: 'dep_sub_10924',
    userId: 'usr_inv_882194',
    userFullName: 'Sir Arthur Montgomery',
    userEmail: 'a.montgomery@vancecapital.org',
    methodId: 'pm_bank_usd_jpm',
    methodName: 'JPMorgan Chase Institutional Wire (USD)',
    methodType: 'bank_transfer',
    amount: 25000,
    currencyOrAsset: 'USD',
    txHashOrReference: 'TV-882194-DEP-JPM-0982',
    senderAccountOrWallet: 'Montgomery Heritage Trust / Northern Trust #78901',
    proofDocumentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    proofFileName: 'Fedwire_Confirmation_USD_25000.pdf',
    customerNotes: 'Wire initiated via Northern Trust custody desk. Settlement confirmation attached.',
    status: 'pending_manual_review',
    createdAt: '2026-09-03T18:42:00Z'
  },
  {
    id: 'dep_sub_10925',
    userId: 'usr_inv_912044',
    userFullName: 'Elena Rostova',
    userEmail: 'e.rostova@genevafamily.ch',
    methodId: 'pm_crypto_btc',
    methodName: 'Bitcoin (BTC - Native SegWit)',
    methodType: 'crypto',
    amount: 1.25,
    currencyOrAsset: 'BTC',
    txHashOrReference: '4b8d27a18f6c39e2491a0c7e29b4481076f5e921d3c5098319ba24910cf28a15',
    senderAccountOrWallet: 'bc1q9824...f019',
    proofDocumentUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80',
    proofFileName: 'Blockstream_Explorer_3Conf.png',
    customerNotes: 'Sent 1.25 BTC from Trezor Model T. 3 block confirmations reached on mempool.',
    status: 'pending_manual_review',
    createdAt: '2026-09-03T21:15:00Z'
  },
  {
    id: 'dep_sub_10918',
    userId: 'usr_inv_882194',
    userFullName: 'Sir Arthur Montgomery',
    userEmail: 'a.montgomery@vancecapital.org',
    methodId: 'pm_bank_usd_jpm',
    methodName: 'JPMorgan Chase Institutional Wire (USD)',
    methodType: 'bank_transfer',
    amount: 50000,
    currencyOrAsset: 'USD',
    txHashOrReference: 'TV-882194-DEP-JPM-0812',
    senderAccountOrWallet: 'Montgomery Heritage Trust',
    proofDocumentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    proofFileName: 'Wire_Receipt_50k_Approved.pdf',
    status: 'posted',
    adminReviewNotes: 'Reconciled with JPMorgan morning bank statement ledger #8942.',
    adminReviewedBy: 'Finance Controller - Sarah Jenkins',
    adminReviewedAt: '2026-02-14T11:00:00Z',
    createdAt: '2026-02-14T09:10:00Z',
    ledgerJournalId: 'jrn_dep_89104'
  }
];

export const initialWithdrawals: WithdrawalRequest[] = [
  {
    id: 'wth_req_44102',
    userId: 'usr_inv_882194',
    userFullName: 'Sir Arthur Montgomery',
    amount: 5000,
    currency: 'USD',
    destinationType: 'bank',
    destinationDetails: 'Northern Trust NA - IBAN US44NTCO998241094',
    fee: 12.50,
    netAmount: 4987.50,
    status: 'pending_review',
    createdAt: '2026-09-02T16:20:00Z'
  }
];

export const initialLedgerTransactions: LedgerTransaction[] = [
  {
    id: 'tx_lg_99104',
    userId: 'usr_inv_882194',
    type: 'deposit',
    amount: 50000,
    currency: 'USD',
    direction: 'credit',
    status: 'completed',
    description: 'Institutional Wire Deposit - JPMorgan Chase #0812',
    referenceId: 'TV-882194-DEP-JPM-0812',
    createdAt: '2026-02-14T11:00:00Z',
    category: 'Depository Inflow'
  },
  {
    id: 'tx_lg_99105',
    userId: 'usr_inv_882194',
    type: 'investment_allocation',
    amount: 20000,
    currency: 'USD',
    direction: 'debit',
    status: 'completed',
    description: 'Capital Allocation: Sovereign Treasury & Macro Yield',
    referenceId: 'TV-SOV-01',
    createdAt: '2026-03-01T00:00:00Z',
    category: 'Strategy Subscription'
  },
  {
    id: 'tx_lg_99106',
    userId: 'usr_inv_882194',
    type: 'investment_allocation',
    amount: 15000,
    currency: 'USD',
    direction: 'debit',
    status: 'completed',
    description: 'Capital Allocation: Quantitative Market-Neutral Arbitrage',
    referenceId: 'TV-QNT-02',
    createdAt: '2026-02-15T00:00:00Z',
    category: 'Strategy Subscription'
  },
  {
    id: 'tx_lg_99107',
    userId: 'usr_inv_882194',
    type: 'yield_distribution',
    amount: 875,
    currency: 'USD',
    direction: 'credit',
    status: 'completed',
    description: 'Sovereign Treasury Monthly Yield Distribution',
    referenceId: 'YLD-SOV-202603',
    createdAt: '2026-04-01T00:00:00Z',
    category: 'Dividend Distribution'
  },
  {
    id: 'tx_lg_99108',
    userId: 'usr_inv_882194',
    type: 'yield_distribution',
    amount: 1260,
    currency: 'USD',
    direction: 'credit',
    status: 'completed',
    description: 'Quant Arbitrage Bi-Monthly Performance Settlement',
    referenceId: 'YLD-QNT-202604',
    createdAt: '2026-04-15T00:00:00Z',
    category: 'Dividend Distribution'
  }
];

export const initialKycCases: KycCase[] = [
  {
    id: 'kyc_case_7719',
    userId: 'usr_inv_882194',
    fullName: 'Sir Arthur Montgomery',
    dateOfBirth: '1974-06-22',
    nationality: 'United States',
    residentialAddress: '740 Park Avenue, Penthouse B, New York, NY 10021',
    idType: 'passport',
    idNumber: 'P894210482',
    documentFrontUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    sourceOfWealth: 'Generational Trust & Family Office Capital',
    riskAppetite: 'medium',
    netWorthBracket: '$10M - $50M',
    status: 'approved',
    submittedAt: '2025-11-14T10:00:00Z',
    reviewedAt: '2025-11-14T14:30:00Z',
    reviewedBy: 'Chief Compliance Officer - Marcus Sterling'
  },
  {
    id: 'kyc_case_7720',
    userId: 'usr_inv_912044',
    fullName: 'Elena Rostova',
    dateOfBirth: '1982-11-04',
    nationality: 'Switzerland',
    residentialAddress: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    idType: 'national_id',
    idNumber: 'CH-891048-A',
    documentFrontUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    sourceOfWealth: 'Private Equity Exits & Technology Venture',
    riskAppetite: 'high',
    netWorthBracket: '$5M - $10M',
    status: 'submitted',
    submittedAt: '2026-09-03T19:00:00Z'
  }
];

export const initialNotifications: InAppNotification[] = [
  {
    id: 'notif_001',
    userId: 'usr_inv_882194',
    title: 'Deposit Reconciliation Under Review',
    message: 'Your $25,000.00 wire transfer reference TV-882194-DEP-JPM-0982 has entered operator verification.',
    category: 'money',
    read: false,
    createdAt: '2026-09-03T18:43:00Z'
  },
  {
    id: 'notif_002',
    userId: 'usr_inv_882194',
    title: 'Yield Accrual Credited',
    message: '$1,260.00 was posted to your ledger for Quantitative Market-Neutral Arbitrage.',
    category: 'investment',
    read: true,
    createdAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'notif_003',
    userId: 'usr_inv_882194',
    title: 'Annual Custody Statement Generated',
    message: 'Your certified PDF statement for Q2 2026 is now available in the Documents portal.',
    category: 'compliance',
    read: true,
    createdAt: '2026-07-01T08:00:00Z'
  }
];

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
    impressions: 4890,
    clicks: 612
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
    impressions: 2150,
    clicks: 389
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud_001',
    actorId: 'usr_admin_001',
    actorEmail: 'admin.compliance@tradeverge.live',
    actorRole: 'Platform Administrator',
    action: 'PAYMENT_METHOD_UPDATED',
    resource: 'PaymentMethod',
    resourceId: 'pm_bank_usd_jpm',
    details: 'Updated beneficiary address and verified Fedwire routing code 021000021.',
    ipAddress: '192.0.2.14',
    timestamp: '2026-08-15T10:00:00Z',
    status: 'success'
  },
  {
    id: 'aud_002',
    actorId: 'usr_inv_882194',
    actorEmail: 'a.montgomery@vancecapital.org',
    actorRole: 'Investor',
    action: 'DEPOSIT_PROOF_SUBMITTED',
    resource: 'DepositSubmission',
    resourceId: 'dep_sub_10924',
    details: 'Submitted proof receipt for $25,000 USD via Fedwire wire reference TV-882194-DEP-JPM-0982.',
    ipAddress: '198.51.100.82',
    timestamp: '2026-09-03T18:42:00Z',
    status: 'success'
  },
  {
    id: 'aud_003',
    actorId: 'usr_admin_001',
    actorEmail: 'admin.compliance@tradeverge.live',
    actorRole: 'Finance Controller',
    action: 'LEDGER_DEPOSIT_CONFIRMED',
    resource: 'LedgerTransaction',
    resourceId: 'tx_lg_99104',
    details: 'Approved manual deposit of $50,000.00 USD and posted balanced double-entry ledger journal.',
    ipAddress: '192.0.2.14',
    timestamp: '2026-02-14T11:00:00Z',
    status: 'success'
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt_8819',
    userId: 'usr_inv_882194',
    userEmail: 'a.montgomery@vancecapital.org',
    subject: 'Institutional Custody Auditing Report Request',
    category: 'investment',
    priority: 'high',
    status: 'open',
    createdAt: '2026-09-02T14:10:00Z',
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        senderName: 'Sir Arthur Montgomery',
        message: 'Could our family office trust accounting team receive the certified ISAE 3402 Type II custody report for Q2?',
        timestamp: '2026-09-02T14:10:00Z'
      },
      {
        id: 'msg_2',
        sender: 'agent',
        senderName: 'Private Wealth Concierge - Julian Thorne',
        message: 'Good day Sir Arthur. We have dispatched the requested ISAE 3402 SOC 1/2 report to your registered legal counsel and uploaded a copy to your Documents portal.',
        timestamp: '2026-09-02T15:25:00Z'
      }
    ]
  }
];
