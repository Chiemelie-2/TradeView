import { LanguageCode } from '../types';

export interface PageTranslations {
  auth: {
    signIn: string;
    clientAccess: string;
    investorTab: string;
    adminTab: string;
    investorTitle: string;
    investorDesc: string;
    adminTitle: string;
    adminDesc: string;
    emailLabel: string;
    passwordLabel: string;
    twoFaBadge: string;
    rememberMe: string;
    forgotPassword: string;
    signInButton: string;
    signingIn: string;
    demoCredentialsTitle: string;
    demoInvestorBtn: string;
    demoAdminBtn: string;
    roleDifferentiatedNotice: string;
    signOut: string;
    signOutConfirm: string;
    loggedOutSuccess: string;
    loggedInSuccess: string;
    invalidCredentials: string;
    adminRequiredMessage: string;
  };
  adminGuard: {
    accessDeniedTitle: string;
    clearanceRequired: string;
    securityProtocolNotice: string;
    signInAsAdmin: string;
    returnToInvestorPortal: string;
  };
  publicPages: {
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    pricingTitle: string;
    pricingSubtitle: string;
    securityTitle: string;
    securitySubtitle: string;
    educationTitle: string;
    educationSubtitle: string;
    aboutTitle: string;
    aboutSubtitle: string;
    contactTitle: string;
    contactSubtitle: string;
    legalTitle: string;
    legalSubtitle: string;
    tier1Custody: string;
    segregatedReserves: string;
    auditedLedger: string;
    regulatoryCompliance: string;
    marketplace: {
      badge: string;
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      allocateButton: string;
    };
    howItWorks: {
      badge: string;
      title: string;
      subtitle: string;
      steps: Array<{ step: string; title: string; desc: string }>;
      securityBadge: string;
      securityTitle: string;
      securitySubtitle: string;
      securityPoints: string[];
      ctaTitle: string;
      ctaDesc: string;
      ctaButton: string;
      explorePlansButton: string;
    };
    pricing: {
      badge: string;
      title: string;
      subtitle: string;
      cardInflowsTag: string;
      cardInflowsTitle: string;
      cardInflowsFeeLabel: string;
      cardInflowsFeatures: string[];
      cardInflowsCta: string;
      cardCustodyTag: string;
      cardCustodyTitle: string;
      cardCustodyFeeLabel: string;
      cardCustodyFeatures: string[];
      cardCustodyCta: string;
      cardRedemptionTag: string;
      cardRedemptionTitle: string;
      cardRedemptionFeeLabel: string;
      cardRedemptionFeatures: string[];
      cardRedemptionCta: string;
    };
    security: {
      badge: string;
      title: string;
      subtitle: string;
      cards: Array<{ title: string; desc: string }>;
    };
    education: {
      badge: string;
      title: string;
      subtitle: string;
      articles: Array<{ title: string; category: string; readTime: string; desc: string }>;
    };
    about: {
      badge: string;
      title: string;
      subtitle: string;
      pillars: Array<{ title: string; desc: string }>;
    };
    contact: {
      badge: string;
      title: string;
      subtitle: string;
      formTitle: string;
      formSubtitle: string;
      labelName: string;
      labelEmail: string;
      labelCategory: string;
      labelSubject: string;
      labelMessage: string;
      submitButton: string;
      globalOffices: string;
    };
    legal: {
      badge: string;
      title: string;
      lastUpdated: string;
      tabs: {
        terms: string;
        privacy: string;
        aml: string;
        risk: string;
      };
    };
  };
  investorPages: {
    transactionsTitle: string;
    transactionsSubtitle: string;
    documentsTitle: string;
    documentsSubtitle: string;
    profileTitle: string;
    profileSubtitle: string;
    exportCsv: string;
    filterAll: string;
    filterDeposits: string;
    filterWithdrawals: string;
    filterYield: string;
    filterInvestments: string;
    twoFaStatus: string;
    kycTierLevel: string;
    accountSecurity: string;
    transactions: {
      badge: string;
      title: string;
      subtitle: string;
      exportCsv: string;
      searchPlaceholder: string;
      colEntry: string;
      colType: string;
      colDescription: string;
      colAmount: string;
      colTimestamp: string;
      colStatus: string;
      colAction: string;
    };
    documents: {
      badge: string;
      title: string;
      subtitle: string;
      downloadButton: string;
    };
    profile: {
      badge: string;
      title: string;
      subtitle: string;
      cardProfile: string;
      card2Fa: string;
      enable2Fa: string;
      activeSessions: string;
    };
    kyc: {
      badge: string;
      title: string;
      submitButton: string;
    };
  };
  footer: {
    segregatedLedgers: string;
    segregatedLedgersDesc: string;
    tier1Custody: string;
    tier1CustodyDesc: string;
    deterministicExecution: string;
    deterministicExecutionDesc: string;
    continuousSettlement: string;
    continuousSettlementDesc: string;
    brandDesc: string;
    colInvestments: string;
    colPlatform: string;
    colPortals: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    tagline: string;
    regulatoryNotice: string;
    riskDisclaimer: string;
    copyright: string;
    quickLinks: string;
    legalLinks: string;
    institutionalServices: string;
  };
}

export const defaultEnPageTranslations: PageTranslations = {
  auth: {
    signIn: 'Client Sign In',
    clientAccess: 'Portal Access',
    investorTab: 'Investor Portal',
    adminTab: 'Compliance & Admin',
    investorTitle: 'Private Wealth Portal',
    investorDesc: 'Access segregated custody, active yield allocations, and audited ledger accounts.',
    adminTitle: 'Depository Admin Console',
    adminDesc: 'Restricted to authorized compliance, treasury, and custody clearing officers.',
    emailLabel: 'Authorized Email',
    passwordLabel: 'Cryptographic Credential / Password',
    twoFaBadge: 'Hardware 2FA / TOTP Protected',
    rememberMe: 'Remember terminal session',
    forgotPassword: 'Reset via custody desk',
    signInButton: 'Authenticate & Enter Portal',
    signingIn: 'Verifying Credentials...',
    demoCredentialsTitle: 'Direct Role Authentication',
    demoInvestorBtn: 'Log In as Investor (Sir Arthur Montgomery)',
    demoAdminBtn: 'Log In as Admin (Marcus Vance - Compliance Lead)',
    roleDifferentiatedNotice: 'User roles are strictly differentiated by credentials. Administrative privileges are granted exclusively to verified officer accounts.',
    signOut: 'Sign Out',
    signOutConfirm: 'Terminate authenticated session?',
    loggedOutSuccess: 'Session terminated securely.',
    loggedInSuccess: 'Authenticated successfully.',
    invalidCredentials: 'Authentication failed. Please verify your institutional credentials.',
    adminRequiredMessage: 'Administrative role required to access this console.'
  },
  adminGuard: {
    accessDeniedTitle: 'Administrative Clearance Required',
    clearanceRequired: 'Access to the TradeVerge Admin Console is restricted exclusively to authorized Treasury and Compliance officers.',
    securityProtocolNotice: 'All unauthorized access attempts are logged with timestamp, cryptographic fingerprint, and IP origin in immutable audit logs.',
    signInAsAdmin: 'Sign In with Admin Credentials',
    returnToInvestorPortal: 'Return to Investor Portal'
  },
  publicPages: {
    howItWorksTitle: 'Institutional Custody Architecture',
    howItWorksSubtitle: 'How TradeVerge safeguards high-net-worth capital with automated ledger reconciliation and audited reserves.',
    pricingTitle: 'Transparent Fee Schedule',
    pricingSubtitle: 'Institutional cost structure with zero hidden spread markups or management fees.',
    securityTitle: 'Security & Custodial Reserves',
    securitySubtitle: 'Multi-layered cold storage, segregated bank depositories, and cryptographic proof of reserves.',
    educationTitle: 'Institutional Knowledge & Research',
    educationSubtitle: 'In-depth market briefs, multi-asset allocation strategies, and macroeconomic analysis.',
    aboutTitle: 'About TradeVerge Private Wealth',
    aboutSubtitle: 'A specialized private asset depository engineered for family offices, trusts, and accredited investors.',
    contactTitle: 'Direct Institutional Inquiries',
    contactSubtitle: 'Connect with our Zurich and New York private wealth desks for personalized custody onboarding.',
    legalTitle: 'Regulatory Disclosures & Terms',
    legalSubtitle: 'Comprehensive legal documentation, compliance frameworks, and investor protections.',
    tier1Custody: 'Tier-1 Segregated Depository',
    segregatedReserves: '100% Verifiable Asset Reserves',
    auditedLedger: 'Cryptographically Verifiable Ledger',
    regulatoryCompliance: 'Global AML/KYC & FinMA Standards',
    marketplace: {
      badge: 'Institutional Capital Market',
      title: 'Investment Vehicles & Strategies',
      subtitle: 'Deterministic structured yield opportunities vetted by the Investment Committee with segregated asset isolation.',
      searchPlaceholder: 'Search strategy name, code, or asset class...',
      allocateButton: 'Allocate Capital'
    },
    howItWorks: {
      badge: 'Lifecycle Overview',
      title: 'End-to-End Custody & Yield Mechanics',
      subtitle: 'From depository wire clearing to deterministic yield accrual: an audited 11-step fiduciary pipeline.',
      steps: [
        { step: '01', title: 'Institutional Onboarding & KYC Clearance', desc: 'Accredited investors undergo AML/CFT verification and passport validation.' },
        { step: '02', title: 'Segregated Depository Provisioning', desc: 'Each client receives an isolated off-balance-sheet depository sub-ledger.' },
        { step: '03', title: 'Multi-Currency Capital Inflow', desc: 'Wires and multi-chain digital assets clear through Tier-1 banking partners.' },
        { step: '04', title: 'Double-Entry Reconciliation', desc: 'Inflows are atomically verified and booked by custody clearing controllers.' },
        { step: '05', title: 'Strategy Selection & Mandate Allocation', desc: 'Deploy liquid capital into audited quantitative and fixed-income portfolios.' },
        { step: '06', title: 'Smart Asset Isolation', desc: 'Allocated assets remain in cold MPC storage with multi-sig governance.' },
        { step: '07', title: 'Continuous Yield Accrual', desc: 'Daily deterministic profit compounding calculated down to the second.' },
        { step: '08', title: 'Real-Time Attestation', desc: 'Live cryptographic proof of reserves updated continuously on-chain.' },
        { step: '09', title: 'Quarterly Audit Certification', desc: 'Independent Big-4 CPA firms audit balance sheets and asset backing.' },
        { step: '10', title: 'Flexible Capital Redemption', desc: 'Initiate principal or yield withdrawals with guaranteed 24h settlement.' },
        { step: '11', title: 'Comprehensive Tax & Fiscal Reporting', desc: 'One-click export of audited annual statements and withholding tax forms.' }
      ],
      securityBadge: 'Zero Counterparty Risk',
      securityTitle: 'Bank-Grade Depository Protection',
      securitySubtitle: 'Assets are never commingled or rehypothecated for speculative proprietary trading.',
      securityPoints: [
        '100% 1:1 asset backing in cold vaults',
        'Tier-1 Swiss & US banking relationships',
        'Full FinMA & SEC compliant frameworks',
        'Comprehensive Lloyd’s of London insurance'
      ],
      ctaTitle: 'Ready to Deploy Institutional Capital?',
      ctaDesc: 'Begin with verified depository onboarding and access institutional-grade yield.',
      ctaButton: 'Open Private Wealth Account',
      explorePlansButton: 'Explore All Strategies'
    },
    pricing: {
      badge: 'Transparent Cost Schedule',
      title: 'Zero Hidden Spread. Pure Institutional Pricing.',
      subtitle: 'Depository inflows are free of charge. Management is strictly performance-aligned.',
      cardInflowsTag: 'Depository Inflows',
      cardInflowsTitle: 'Capital Deposits',
      cardInflowsFeeLabel: 'Free of depository charge',
      cardInflowsFeatures: [
        'Free SWIFT & Fedwire bank transfers',
        'Zero gas markup on BTC / ETH / USDT / USDC',
        'Instant double-entry ledger settlement',
        'No monthly account maintenance fee'
      ],
      cardInflowsCta: 'Fund Depository Account',
      cardCustodyTag: 'Custody & Yield',
      cardCustodyTitle: 'Active Allocation',
      cardCustodyFeeLabel: 'Annualized management fee',
      cardCustodyFeatures: [
        'Institutional cold storage & insurance',
        'Deterministic yield compounding',
        'Continuous proof of reserves attestation',
        'Audited tax statements included'
      ],
      cardCustodyCta: 'Explore Strategies',
      cardRedemptionTag: 'Capital Redemptions',
      cardRedemptionTitle: 'Withdrawals & Clearing',
      cardRedemptionFeeLabel: 'Flat processing or network fee',
      cardRedemptionFeatures: [
        'Standard 24h bank wire processing',
        'Exact on-chain network gas pass-through',
        'No early redemption penalties on liquid tiers',
        'Multi-signature hardware 2FA release'
      ],
      cardRedemptionCta: 'Review Security Controls'
    },
    security: {
      badge: 'Fiduciary Defense Framework',
      title: 'Military-Grade Vault Security & Asset Isolation',
      subtitle: 'How TradeVerge safeguards client assets with multi-signature cold storage and institutional custody.',
      cards: [
        { title: 'Multi-Party Computation (MPC)', desc: 'Private keys are fragmented into cryptographic mathematical shards across disparate sovereign jurisdictions, eliminating single points of compromise.' },
        { title: 'Segregated Depository Accounts', desc: 'All client funds are held strictly off-balance-sheet in segregated accounts at Tier-1 Swiss and American financial institutions.' },
        { title: 'Cryptographic Proof of Reserves', desc: 'Continuous on-chain Merkle tree attestations enable real-time independent verification of our 1:1 asset backing without exposing private client metadata.' },
        { title: '24/7 AI-Augmented Anomaly Detection', desc: 'Algorithmic pattern monitors scan every transaction in real-time for anomalous routing, velocity spikes, or address inconsistencies before clearing.' }
      ]
    },
    education: {
      badge: 'Institutional Research Desk',
      title: 'Market Intelligence & Sovereign Wealth Analysis',
      subtitle: 'Exclusive briefings, macroeconomic perspectives, and quantitative research compiled by our investment committee.',
      articles: [
        { title: 'Yield Generation in Digital Debt Markets', category: 'Fixed Income', readTime: '6 min read', desc: 'An examination of tokenized short-term treasuries and collateralized institutional liquidity protocols.' },
        { title: 'Custodial Risk Mitigation for Family Offices', category: 'Risk Management', readTime: '8 min read', desc: 'Strategic frameworks for evaluating counterparty risk, MPC vaults, and multi-jurisdictional asset protection.' },
        { title: 'Macro Trends: Institutional Digital Asset Inflows', category: 'Macro Brief', readTime: '5 min read', desc: 'Analyzing the accelerating migration of sovereign capital into transparent, deterministic yield vehicles.' },
        { title: 'Tax Structuring for Cross-Border Digital Yield', category: 'Wealth Advisory', readTime: '10 min read', desc: 'A legal guide to international withholding treaties, CRS reporting, and digital asset accounting standards.' }
      ]
    },
    about: {
      badge: 'Corporate Heritage & Governance',
      title: 'Pioneering Institutional Digital Asset Custody',
      subtitle: 'TradeVerge was founded to bridge the rigorous standards of Swiss private banking with modern blockchain architecture.',
      pillars: [
        { title: 'Fiduciary Integrity', desc: 'We act strictly as a custodian and fiduciary. We never speculate with client assets, trade against our users, or engage in uncollateralized lending.' },
        { title: 'Regulatory Rigor', desc: 'Operating within established Swiss FinMA standards and global AML/KYC directives, ensuring total peace of mind for accredited institutions.' },
        { title: 'Technological Excellence', desc: 'Engineered from the ground up on high-frequency, double-entry ledger mechanics with cryptographic verification at every lifecycle phase.' }
      ]
    },
    contact: {
      badge: 'Global Wealth Advisory Desks',
      title: 'Direct Institutional Communications',
      subtitle: 'Connect with our private wealth advisors in Zurich, New York, London, or Singapore for custom onboarding.',
      formTitle: 'Submit an Institutional Inquiry',
      formSubtitle: 'A senior wealth director will respond within 4 hours during market trading sessions.',
      labelName: 'Full Name / Entity Name',
      labelEmail: 'Institutional Email',
      labelCategory: 'Inquiry Category',
      labelSubject: 'Subject / Reference',
      labelMessage: 'Detailed Message',
      submitButton: 'Dispatch Inquiry to Advisory Desk',
      globalOffices: 'Our Global Presence'
    },
    legal: {
      badge: 'Regulatory Framework',
      title: 'Terms of Custody & Disclosures',
      lastUpdated: 'Effective Date: September 2026 • Document Version: 4.8-FINMA',
      tabs: {
        terms: 'Terms of Depository Service',
        privacy: 'Privacy & Data Governance',
        aml: 'Global AML & KYC Mandate',
        risk: 'Financial Risk & Reserve Attestation'
      }
    }
  },
  investorPages: {
    transactionsTitle: 'Audited Ledger Journal',
    transactionsSubtitle: 'Real-time chronological record of all cleared deposits, disbursements, and deterministic yield postings.',
    documentsTitle: 'Custody Statements & Tax Reports',
    documentsSubtitle: 'Download official auditor confirmations, monthly wealth statements, and fiscal tax certificates.',
    profileTitle: 'Institutional Profile & Security',
    profileSubtitle: 'Manage authenticated identity, hardware 2FA keys, trusted whitelisted addresses, and audit sessions.',
    exportCsv: 'Export Journal CSV',
    filterAll: 'All Records',
    filterDeposits: 'Cleared Deposits',
    filterWithdrawals: 'Disbursements',
    filterYield: 'Accrued Yield',
    filterInvestments: 'Capital Allocations',
    twoFaStatus: 'Two-Factor Authentication (2FA)',
    kycTierLevel: 'KYC Clearance Tier',
    accountSecurity: 'Cryptographic Security & API Keys',
    transactions: {
      badge: 'Immutable Accounting Ledger',
      title: 'Transaction Journal',
      subtitle: 'Authoritative, balanced double-entry record of depository entries, allocations, and yield distributions.',
      exportCsv: 'Export Ledger CSV',
      searchPlaceholder: 'Search Journal ID, Ref, or Desc...',
      colEntry: 'Journal Entry',
      colType: 'Type',
      colDescription: 'Description',
      colAmount: 'Amount',
      colTimestamp: 'Timestamp',
      colStatus: 'Status',
      colAction: 'Certificate'
    },
    documents: {
      badge: 'Compliance & Tax Vault',
      title: 'Institutional Documents & Certificates',
      subtitle: 'Cryptographically signed statements, custody certificates, and annual tax attestations.',
      downloadButton: 'Download PDF'
    },
    profile: {
      badge: 'Institutional Identity & Security',
      title: 'Account Security & Access Controls',
      subtitle: 'Manage authorized hardware authenticators, compliance credentials, and active terminal sessions.',
      cardProfile: 'Institutional Entity Profile',
      card2Fa: 'Hardware Two-Factor Authentication',
      enable2Fa: 'Enable Authenticator 2FA',
      activeSessions: 'Active Terminal Sessions'
    },
    kyc: {
      badge: 'Compliance & Regulatory Identity',
      title: 'Tier 2 KYC Verification',
      submitButton: 'Submit Verification File to Compliance'
    }
  },
  footer: {
    segregatedLedgers: 'Segregated Ledgers',
    segregatedLedgersDesc: 'Double-entry cryptographic ledger reconciliation ensuring 100% asset segregation.',
    tier1Custody: 'Tier 1 Banking Custody',
    tier1CustodyDesc: 'Cash reserves held in segregated depository accounts with premier global institutions.',
    deterministicExecution: 'Deterministic Execution',
    deterministicExecutionDesc: 'Automated contract execution with zero proprietary slippage or commingling.',
    continuousSettlement: 'Continuous Settlement',
    continuousSettlementDesc: 'Near-instant internal clearing with audited cryptographic transaction proofs.',
    brandDesc: 'TradeVerge Private Wealth is an institutional digital asset depository and investment management platform providing deterministic structured yield for accredited entities and family offices.',
    colInvestments: 'Investment Vehicles',
    colPlatform: 'Platform & Security',
    colPortals: 'Client Portals',
    disclaimerTitle: 'Regulatory Status & Financial Risk Notice',
    disclaimerBody: 'TradeVerge Private Wealth operates under institutional custody and compliance protocols. Structured yield vehicles and digital assets carry market risk. Past performance does not guarantee future results. Deposited funds are held in segregated, audited accounts.',
    tagline: 'Institutional Digital Asset Custody & Private Wealth Ledger',
    regulatoryNotice: 'TradeVerge operates under strict institutional custody protocols with segregated cash reserves and cryptographic multi-signature asset vaults.',
    riskDisclaimer: 'Digital assets and structured yield vehicles carry financial market risk. Past performance does not guarantee future results. Segregated reserves are audited continuously.',
    copyright: '© 2026 TradeVerge Private Wealth Ltd. All rights reserved.',
    quickLinks: 'Marketplace & Portals',
    legalLinks: 'Compliance & Governance',
    institutionalServices: 'Custodial Depository'
  }
};

// Deep merge helper to guarantee no property is ever undefined
function deepMerge<T>(target: any, source: any): T {
  const output = { ...target };
  if (source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else if (source[key] !== undefined) {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// Localized overrides for each language
const esOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Mercado Institucional de Capitales',
      title: 'Vehículos y Estrategias de Inversión',
      subtitle: 'Oportunidades de rendimiento estructurado determinista revisadas por el Comité de Inversiones.',
      searchPlaceholder: 'Buscar por estrategia, código o clase de activo...',
      allocateButton: 'Asignar Capital'
    },
    howItWorks: {
      ...defaultEnPageTranslations.publicPages.howItWorks,
      badge: 'Ciclo de Operaciones',
      title: 'Mecánica de Custodia y Rendimiento Integral',
      subtitle: 'Desde la liquidación bancaria hasta la acumulación de rendimiento: un proceso fiduciario auditado de 11 pasos.',
      ctaTitle: '¿Listo para Desplegar Capital Institucional?',
      ctaDesc: 'Comience con incorporación depositaria verificada y acceda a rendimientos institucionales.',
      ctaButton: 'Abrir Cuenta Privada',
      explorePlansButton: 'Explorar Estrategias'
    },
    pricing: {
      ...defaultEnPageTranslations.publicPages.pricing,
      badge: 'Estructura de Tarifas Transparente',
      title: 'Cero Margen Oculto. Precios Institucionales Puros.',
      subtitle: 'Los ingresos a cuentas depositarias no tienen comisiones. Gestión 100% transparente.',
      cardInflowsCta: 'Fondear Cuenta Depositaria',
      cardCustodyCta: 'Explorar Estrategias',
      cardRedemptionCta: 'Revisar Controles'
    },
    security: {
      ...defaultEnPageTranslations.publicPages.security,
      badge: 'Marco de Defensa Fiduciario',
      title: 'Seguridad Militar en Bóvedas y Aislamiento de Activos',
      subtitle: 'Cómo TradeVerge protege los activos de los clientes con almacenamiento en frío multifirma.'
    },
    education: {
      ...defaultEnPageTranslations.publicPages.education,
      badge: 'Mesa de Investigación Institucional',
      title: 'Inteligencia de Mercado y Análisis de Patrimonio',
      subtitle: 'Informes exclusivos, perspectivas macroeconómicas e investigación cuantitativa.'
    },
    about: {
      ...defaultEnPageTranslations.publicPages.about,
      badge: 'Patrimonio y Gobernanza Corporativa',
      title: 'Pioneros en Custodia Institucional de Activos Digitales',
      subtitle: 'TradeVerge fue fundada para unir los estándares de la banca privada suiza con blockchain.'
    },
    contact: {
      ...defaultEnPageTranslations.publicPages.contact,
      badge: 'Mesas Globales de Asesoría Patrimonial',
      title: 'Comunicaciones Institucionales Directas',
      subtitle: 'Conéctese con nuestros asesores en Zúrich, Nueva York, Londres o Singapur.'
    },
    legal: {
      ...defaultEnPageTranslations.publicPages.legal,
      badge: 'Marco Regulatorio',
      title: 'Términos de Custodia y Divulgaciones'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Libro Mayor Contable Inmutable',
      title: 'Diario de Transacciones',
      subtitle: 'Registro autorizado de partida doble de entradas de custodia, asignaciones y rendimientos.',
      exportCsv: 'Exportar Libro Mayor CSV',
      searchPlaceholder: 'Buscar ID de Diario, Ref o Descripción...',
      colEntry: 'Entrada del Diario',
      colType: 'Tipo',
      colDescription: 'Descripción',
      colAmount: 'Monto',
      colTimestamp: 'Fecha y Hora',
      colStatus: 'Estado',
      colAction: 'Certificado'
    },
    documents: {
      badge: 'Bóveda de Cumplimiento y Fiscalidad',
      title: 'Documentos Institucionales y Certificados',
      subtitle: 'Extractos firmados criptográficamente, certificados de custodia e informes fiscales anuales.',
      downloadButton: 'Descargar PDF'
    },
    profile: {
      badge: 'Identidad Institucional y Seguridad',
      title: 'Seguridad de la Cuenta y Control de Acceso',
      subtitle: 'Administre autenticadores de hardware, credenciales de cumplimiento y sesiones activas.',
      cardProfile: 'Perfil de Entidad Institucional',
      card2Fa: 'Autenticación 2FA de Hardware',
      enable2Fa: 'Activar Autenticador 2FA',
      activeSessions: 'Sesiones de Terminal Activas'
    },
    kyc: {
      badge: 'Identidad Regulatoria y Cumplimiento',
      title: 'Verificación KYC Nivel 2',
      submitButton: 'Enviar Expediente a Cumplimiento'
    }
  },
  footer: {
    ...defaultEnPageTranslations.footer,
    segregatedLedgers: 'Libros Mayores Segregados',
    tier1Custody: 'Custodia Bancaria Nivel 1',
    deterministicExecution: 'Ejecución Determinista',
    continuousSettlement: 'Liquidación Continua'
  }
};

const frOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Marché des Capitaux Institutionnels',
      title: 'Véhicules et Stratégies d’Investissement',
      subtitle: 'Opportunités de rendement déterministe validées par le Comité d’Investissement.',
      searchPlaceholder: 'Rechercher par stratégie, code ou classe d’actifs...',
      allocateButton: 'Allouer du Capital'
    },
    howItWorks: {
      ...defaultEnPageTranslations.publicPages.howItWorks,
      badge: 'Aperçu du Cycle de Vie',
      title: 'Mécanismes de Garde et de Rendement de Bout en Bout',
      subtitle: 'De la compensation des dépôts bancaires au calcul continu des rendements : un pipeline audité en 11 étapes.',
      ctaTitle: 'Prêt à Déployer du Capital Institutionnel ?',
      ctaDesc: 'Commencez dès aujourd’hui avec une intégration dépositaire vérifiée.',
      ctaButton: 'Ouvrir un Compte Privé',
      explorePlansButton: 'Explorer les Stratégies'
    },
    pricing: {
      ...defaultEnPageTranslations.publicPages.pricing,
      badge: 'Barème Transparent',
      title: 'Zéro Marge Cachée. Tarification Institutionnelle Pure.',
      subtitle: 'Les dépôts sont totalement exempts de frais dépositaires.',
      cardInflowsCta: 'Alimenter le Compte',
      cardCustodyCta: 'Découvrir les Stratégies',
      cardRedemptionCta: 'Consulter la Sécurité'
    },
    security: {
      ...defaultEnPageTranslations.publicPages.security,
      badge: 'Cadre de Défense Fiduciaire',
      title: 'Sécurité de Coffre-Fort et Ségrégation des Actifs',
      subtitle: 'Comment TradeVerge protège les actifs avec un stockage à froid multi-signatures.'
    },
    education: {
      ...defaultEnPageTranslations.publicPages.education,
      badge: 'Pôle Recherche Institutionnelle',
      title: 'Veille de Marché et Analyse de Gestion Privée',
      subtitle: 'Notes exclusives, perspectives macroéconomiques et recherches quantitatives.'
    },
    about: {
      ...defaultEnPageTranslations.publicPages.about,
      badge: 'Héritage et Gouvernance',
      title: 'Pionniers de la Garde d’Actifs Numériques',
      subtitle: 'Fondé pour marier la rigueur de la banque privée suisse aux technologies blockchain.'
    },
    contact: {
      ...defaultEnPageTranslations.publicPages.contact,
      badge: 'Bureaux Mondiaux de Conseil',
      title: 'Relations Institutionnelles Directes',
      subtitle: 'Échangez avec nos conseillers à Zurich, New York, Londres ou Singapour.'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Registre Comptable Immuable',
      title: 'Journal des Transactions',
      subtitle: 'Enregistrement officiel en partie double des entrées de dépôts, allocations et rendements.',
      exportCsv: 'Exporter le Journal CSV',
      searchPlaceholder: 'Rechercher par ID, Réf ou Description...',
      colEntry: 'Écriture du Journal',
      colType: 'Type',
      colDescription: 'Description',
      colAmount: 'Montant',
      colTimestamp: 'Date et Heure',
      colStatus: 'Statut',
      colAction: 'Attestation'
    },
    documents: {
      badge: 'Coffre de Conformité et Fiscalité',
      title: 'Documents Institutionnels et Certificats',
      subtitle: 'Relevés signés cryptographiquement, certificats de garde et attestations fiscales annuelles.',
      downloadButton: 'Télécharger le PDF'
    },
    profile: {
      badge: 'Identité Institutionnelle et Sécurité',
      title: 'Sécurité du Compte et Contrôles d’Accès',
      subtitle: 'Gérez vos clés 2FA matérielles, identifiants certifiés et sessions de terminal.',
      cardProfile: 'Profil d’Entité Institutionnelle',
      card2Fa: 'Authentification 2FA Matérielle',
      enable2Fa: 'Activer le 2FA Authenticator',
      activeSessions: 'Sessions de Terminal Actives'
    },
    kyc: {
      badge: 'Identité Réglementaire et Conformité',
      title: 'Vérification KYC Niveau 2',
      submitButton: 'Transmettre le Dossier à la Conformité'
    }
  },
  footer: {
    ...defaultEnPageTranslations.footer,
    segregatedLedgers: 'Registres Ségrégués',
    tier1Custody: 'Garde Bancaire Rang 1',
    deterministicExecution: 'Exécution Déterministe',
    continuousSettlement: 'Règlement Continu'
  }
};

const deOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Institutioneller Kapitalmarkt',
      title: 'Anlagevehikel & Strategien',
      subtitle: 'Deterministische Ertragschancen mit getrennter Vermögensverwahrung.',
      searchPlaceholder: 'Strategie, Code oder Anlageklasse suchen...',
      allocateButton: 'Kapital Allokieren'
    },
    howItWorks: {
      ...defaultEnPageTranslations.publicPages.howItWorks,
      badge: 'Lebenszyklus-Übersicht',
      title: 'End-to-End-Verwahrung & Renditemechanik',
      subtitle: 'Vom Bankclearing bis zur automatischen Zinseszinsberechnung: ein 11-stufiger Prozess.',
      ctaTitle: 'Bereit für institutionelle Allokationen?',
      ctaDesc: 'Starten Sie mit geprüfter Verwahrung und greifen Sie auf institutionelle Renditen zu.',
      ctaButton: 'Konto Eröffnen',
      explorePlansButton: 'Strategien Erkunden'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Unveränderliches Hauptbuch',
      title: 'Transaktionsjournal',
      subtitle: 'Autorisierter doppischer Buchungsdatensatz für Einlagen, Allokationen und Zinserträge.',
      exportCsv: 'Hauptbuch als CSV exportieren',
      searchPlaceholder: 'Journal-ID, Ref oder Beschreibung suchen...',
      colEntry: 'Journaleintrag',
      colType: 'Typ',
      colDescription: 'Beschreibung',
      colAmount: 'Betrag',
      colTimestamp: 'Zeitstempel',
      colStatus: 'Status',
      colAction: 'Zertifikat'
    },
    documents: {
      badge: 'Compliance- & Steuertresor',
      title: 'Institutionelle Dokumente & Nachweise',
      subtitle: 'Kryptografisch signierte Abrechnungen, Verwahrungszertifikate und Jahressteuerbescheinigungen.',
      downloadButton: 'PDF Herunterladen'
    },
    profile: {
      badge: 'Institutionelle Identität & Sicherheit',
      title: 'Kontosicherheit & Zugriffskontrollen',
      subtitle: 'Verwalten Sie Hardware-Authentifikatoren, Compliance-Zugangsdaten und aktive Sitzungen.',
      cardProfile: 'Institutionelles Unternehmensprofil',
      card2Fa: 'Hardware-2-Faktor-Authentifizierung',
      enable2Fa: '2FA-Authenticator Aktivieren',
      activeSessions: 'Aktive Terminal-Sitzungen'
    },
    kyc: {
      badge: 'Regulatorische Identität & Compliance',
      title: 'Stufe-2 KYC-Verifizierung',
      submitButton: 'Verifizierungsakte an Compliance Übermitteln'
    }
  }
};

const zhOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: '机构资本市场',
      title: '投资工具与量化策略',
      subtitle: '经过投资委员会严格审查的确定性结构化收益机会，资金完全独立隔离。',
      searchPlaceholder: '搜索策略名称、代号或资产类别...',
      allocateButton: '配置资产'
    },
    howItWorks: {
      ...defaultEnPageTranslations.publicPages.howItWorks,
      badge: '业务全景',
      title: '端到端托管与收益机制',
      subtitle: '从清算注资到确定性复利计息：经全面审计的11步受托流程。',
      ctaTitle: '准备配置机构级资本？',
      ctaDesc: '即刻完成合规账户开立，尊享顶级收益方案。',
      ctaButton: '开设私人财富账户',
      explorePlansButton: '浏览全部策略'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: '不可篡改会计账本',
      title: '交易流水账',
      subtitle: '资金托管、投资划转和收益分配的权威复式记账明细。',
      exportCsv: '导出交易流水 CSV',
      searchPlaceholder: '搜索账目流水号、参考号或描述...',
      colEntry: '会计分录',
      colType: '类型',
      colDescription: '描述',
      colAmount: '金额',
      colTimestamp: '时间戳',
      colStatus: '状态',
      colAction: '凭证证书'
    },
    documents: {
      badge: '合规与税务保险库',
      title: '机构文件与认证证书',
      subtitle: '密码学签名对账单、托管隔离凭证及年度税务核数报告。',
      downloadButton: '下载加密 PDF'
    },
    profile: {
      badge: '机构身份与安全控制',
      title: '账户安全与访问管理',
      subtitle: '管理硬件双因子认证 (2FA)、合规等级凭据与当前终端会话。',
      cardProfile: '机构实体档案',
      card2Fa: '硬件双因子身份验证',
      enable2Fa: '启用身份验证器 2FA',
      activeSessions: '活跃终端会话'
    },
    kyc: {
      badge: '合规与监管身份识别',
      title: '第二级别 (Tier 2) KYC 身份核验',
      submitButton: '提交核验材料至风控合规部'
    }
  }
};

const jaOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: '機関投資家向け資本市場',
      title: '投資ビークルおよび運用戦略',
      subtitle: '投資委員会により厳格に審査された確定型構造化利回り戦略。',
      searchPlaceholder: '戦略名、コード、資産クラスを検索...',
      allocateButton: '資金を配分'
    },
    howItWorks: {
      ...defaultEnPageTranslations.publicPages.howItWorks,
      badge: 'ライフサイクル概要',
      title: 'エンドツーエンドのカストディおよび利回り構造',
      subtitle: '電信送金の清算から確定利回りの複利計算まで：11ステップの監査済み受託プロセス。',
      ctaTitle: '機関資本の運用を開始しますか？',
      ctaDesc: '検証済みのカストディオンボーディングを完了し、高水準の利回りへアクセス。',
      ctaButton: 'プライベート口座を開設',
      explorePlansButton: '全戦略を閲覧'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: '不変の複式会計台帳',
      title: '取引仕訳帳',
      subtitle: '受託預入、配分、および利回り分配の権威ある複式簿記記録。',
      exportCsv: '仕訳帳 CSV をエクスポート',
      searchPlaceholder: '仕訳番号、参照番号、摘要を検索...',
      colEntry: '仕訳番号',
      colType: '種類',
      colDescription: '摘要',
      colAmount: '金額',
      colTimestamp: 'タイムスタンプ',
      colStatus: '状態',
      colAction: '証明書'
    },
    documents: {
      badge: 'コンプライアンス＆税務保管庫',
      title: '機関文書および認定証明書',
      subtitle: '暗号署名付き残高証明書、カストディ証明書、年次監査税務明細。',
      downloadButton: 'PDF をダウンロード'
    },
    profile: {
      badge: '機関識別情報とセキュリティ',
      title: '口座セキュリティおよびアクセス制御',
      subtitle: 'ハードウェア2段階認証、適格投資家資格、アクティブセッションを管理。',
      cardProfile: '機関法人プロフィール',
      card2Fa: 'ハードウェア2段階認証 (2FA)',
      enable2Fa: '2段階認証を有効化',
      activeSessions: 'アクティブな端末セッション'
    },
    kyc: {
      badge: '法規制コンプライアンス本人確認',
      title: 'Tier 2 KYC 認証手続き',
      submitButton: '検証書類をコンプライアンス部門へ提出'
    }
  }
};

const arOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'سوق رأس المال المؤسسي',
      title: 'أوعية واستراتيجيات الاستثمار',
      subtitle: 'فرص عوائد مهيكلة محددة معتمدة من لجنة الاستثمار مع عزل تام للأصول.',
      searchPlaceholder: 'ابحث عن اسم الاستراتيجية أو فئة الأصول...',
      allocateButton: 'تخصيص رأس المال'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'دفتر الأستاذ المحاسبي الثابت',
      title: 'سجل المعاملات',
      subtitle: 'سجل القيد المزدوج المعتمد لإيداعات الحفظ وتوزيعات العوائد.',
      exportCsv: 'تصدير السجل بتنسيق CSV',
      searchPlaceholder: 'البحث عن معرّف المعاملة أو المرجع...',
      colEntry: 'القيد المحاسبي',
      colType: 'النوع',
      colDescription: 'الوصف',
      colAmount: 'المبلغ',
      colTimestamp: 'التاريخ والوقت',
      colStatus: 'الحالة',
      colAction: 'الشهادة'
    },
    documents: {
      badge: 'خزينة الامتثال والضرائب',
      title: 'المستندات المؤسسية والشهادات',
      subtitle: 'بيانات موقعة مشفرة وشهادات حفظ وتقارير تدقيق ضريبية سنوية.',
      downloadButton: 'تحميل كملف PDF'
    },
    profile: {
      badge: 'الهوية المؤسسية والأمان',
      title: 'أمان الحساب وضوابط الوصول',
      subtitle: 'إدارة المصادقة الثنائية وجلسات المحطة الطرفية النشطة.',
      cardProfile: 'ملف الكيان المؤسسي',
      card2Fa: 'المصادقة الثنائية (2FA)',
      enable2Fa: 'تفعيل المصادقة الثنائية',
      activeSessions: 'جلسات الأجهزة النشطة'
    },
    kyc: {
      badge: 'الامتثال والهوية التنظيمية',
      title: 'التحقق من الهوية (KYC) المستوى الثاني',
      submitButton: 'إرسال ملف التحقق إلى قسم الامتثال'
    }
  }
};

const ptOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Mercado Institucional de Capitais',
      title: 'Veículos e Estratégias de Investimento',
      subtitle: 'Oportunidades determinísticas de rendimento com isolamento patrimonial.',
      searchPlaceholder: 'Buscar estratégia, código ou classe de ativos...',
      allocateButton: 'Alocar Capital'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Livro Razão Contábil Imutável',
      title: 'Diário de Transações',
      subtitle: 'Registro de partidas dobradas para depósitos, alocações e rendimentos.',
      exportCsv: 'Exportar Razão em CSV',
      searchPlaceholder: 'Pesquisar ID do Diário, Ref ou Descrição...',
      colEntry: 'Lançamento',
      colType: 'Tipo',
      colDescription: 'Descrição',
      colAmount: 'Valor',
      colTimestamp: 'Data e Hora',
      colStatus: 'Status',
      colAction: 'Certificado'
    },
    documents: {
      badge: 'Cofre de Compliance e Tributário',
      title: 'Documentos Institucionais e Certificados',
      subtitle: 'Extratos assinados criptograficamente, certificados de custódia e relatórios fiscais anuais.',
      downloadButton: 'Baixar PDF'
    },
    profile: {
      badge: 'Identidade Institucional e Segurança',
      title: 'Segurança da Conta e Controle de Acesso',
      subtitle: 'Gerencie autenticadores de hardware, credenciais de compliance e sessões ativas.',
      cardProfile: 'Perfil da Entidade Institucional',
      card2Fa: 'Autenticação 2FA de Hardware',
      enable2Fa: 'Habilitar Autenticador 2FA',
      activeSessions: 'Sessões Ativas no Terminal'
    },
    kyc: {
      badge: 'Identidade Regulatória e Compliance',
      title: 'Verificação KYC Nível 2',
      submitButton: 'Enviar Arquivo de Verificação para Compliance'
    }
  }
};

const itOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Mercato dei Capitali Istituzionali',
      title: 'Veicoli e Strategie di Investimento',
      subtitle: 'Opportunità di rendimento deterministico con segregazione patrimoniale.',
      searchPlaceholder: 'Cerca strategia, codice o classe di attivi...',
      allocateButton: 'Alloca Capitale'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Mastro Contabile Immutabile',
      title: 'Giornale delle Transazioni',
      subtitle: 'Registro ufficiale in partita doppia per depositi, allocazioni e rendimenti.',
      exportCsv: 'Esporta Giornale CSV',
      searchPlaceholder: 'Cerca ID Giornale, Riferimento o Descrizione...',
      colEntry: 'Registrazione',
      colType: 'Tipo',
      colDescription: 'Descrizione',
      colAmount: 'Importo',
      colTimestamp: 'Data e Ora',
      colStatus: 'Stato',
      colAction: 'Certificato'
    },
    documents: {
      badge: 'Cassaforte Fiscale e di Conformità',
      title: 'Documenti Istituzionali e Certificati',
      subtitle: 'Estratti conto firmati crittograficamente, certificati di custodia e attestazioni fiscali.',
      downloadButton: 'Scarica PDF'
    },
    profile: {
      badge: 'Identità Istituzionale e Sicurezza',
      title: 'Sicurezza del Conto e Controlli di Accesso',
      subtitle: 'Gestisci autenticatori hardware, credenziali di conformità e sessioni attive.',
      cardProfile: 'Profilo dell’Entità Istituzionale',
      card2Fa: 'Autenticazione Hardware a Due Fattori',
      enable2Fa: 'Attiva Autenticatore 2FA',
      activeSessions: 'Sessioni Terminale Attive'
    },
    kyc: {
      badge: 'Identità Regolamentare e Conformità',
      title: 'Verifica KYC Livello 2',
      submitButton: 'Invia Dossier all’Ufficio Conformità'
    }
  }
};

const ruOverrides: Partial<PageTranslations> = {
  publicPages: {
    ...defaultEnPageTranslations.publicPages,
    marketplace: {
      badge: 'Институциональный рынок капитала',
      title: 'Инвестиционные механизмы и стратегии',
      subtitle: 'Детерминированная доходность, одобренная Инвестиционным комитетом, с сегрегацией активов.',
      searchPlaceholder: 'Поиск по названию, коду или классу активов...',
      allocateButton: 'Аллоцировать капитал'
    }
  },
  investorPages: {
    ...defaultEnPageTranslations.investorPages,
    transactions: {
      badge: 'Неизменяемый бухгалтерский реестр',
      title: 'Журнал транзакций',
      subtitle: 'Авторитетная двойная запись депозитарных поступлений, аллокаций и начислений доходности.',
      exportCsv: 'Экспорт журнала в CSV',
      searchPlaceholder: 'Поиск по ID, референсу или описанию...',
      colEntry: 'Запись журнала',
      colType: 'Тип',
      colDescription: 'Описание',
      colAmount: 'Сумма',
      colTimestamp: 'Время и дата',
      colStatus: 'Статус',
      colAction: 'Сертификат'
    },
    documents: {
      badge: 'Комплаенс и налоговый сейф',
      title: 'Институциональные документы и сертификаты',
      subtitle: 'Криптографически подписанные выписки, сертификаты хранения и годовая налоговая отчетность.',
      downloadButton: 'Скачать PDF'
    },
    profile: {
      badge: 'Институциональная идентификация и безопасность',
      title: 'Безопасность аккаунта и управление доступом',
      subtitle: 'Управление аппаратными 2FA-ключами, комплаенс-статусом и активными сессиями.',
      cardProfile: 'Профиль институционального субъекта',
      card2Fa: 'Аппаратная двухфакторная аутентификация',
      enable2Fa: 'Включить Authenticator 2FA',
      activeSessions: 'Активные терминальные сессии'
    },
    kyc: {
      badge: 'Регуляторная идентификация и комплаенс',
      title: 'Верификация KYC 2-го уровня',
      submitButton: 'Отправить досье в службу комплаенс'
    }
  }
};

// Assembled record with deep merging so NO property can EVER be undefined!
export const pageTranslations: Record<LanguageCode, PageTranslations> = {
  en: defaultEnPageTranslations,
  es: deepMerge<PageTranslations>(defaultEnPageTranslations, esOverrides),
  fr: deepMerge<PageTranslations>(defaultEnPageTranslations, frOverrides),
  de: deepMerge<PageTranslations>(defaultEnPageTranslations, deOverrides),
  zh: deepMerge<PageTranslations>(defaultEnPageTranslations, zhOverrides),
  ja: deepMerge<PageTranslations>(defaultEnPageTranslations, jaOverrides),
  ar: deepMerge<PageTranslations>(defaultEnPageTranslations, arOverrides),
  pt: deepMerge<PageTranslations>(defaultEnPageTranslations, ptOverrides),
  it: deepMerge<PageTranslations>(defaultEnPageTranslations, itOverrides),
  ru: deepMerge<PageTranslations>(defaultEnPageTranslations, ruOverrides),
};

export const getPageTranslations = (lang: LanguageCode): PageTranslations => {
  return pageTranslations[lang] || defaultEnPageTranslations;
};
