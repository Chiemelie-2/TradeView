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
  };
  footer: {
    tagline: string;
    regulatoryNotice: string;
    riskDisclaimer: string;
    copyright: string;
    quickLinks: string;
    legalLinks: string;
    institutionalServices: string;
  };
}

export const pageTranslations: Record<LanguageCode, PageTranslations> = {
  en: {
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
      regulatoryCompliance: 'Global AML/KYC & FinMA Standards'
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
      accountSecurity: 'Cryptographic Security & API Keys'
    },
    footer: {
      tagline: 'Institutional Digital Asset Custody & Private Wealth Ledger',
      regulatoryNotice: 'TradeVerge operates under strict institutional custody protocols with segregated cash reserves and cryptographic multi-signature asset vaults.',
      riskDisclaimer: 'Digital assets and structured yield vehicles carry financial market risk. Past performance does not guarantee future results. Segregated reserves are audited continuously.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. All rights reserved.',
      quickLinks: 'Marketplace & Portals',
      legalLinks: 'Compliance & Governance',
      institutionalServices: 'Custodial Depository'
    }
  },
  es: {
    auth: {
      signIn: 'Iniciar Sesión',
      clientAccess: 'Acceso a Portal',
      investorTab: 'Portal de Inversores',
      adminTab: 'Cumplimiento y Admin',
      investorTitle: 'Portal de Patrimonio Privado',
      investorDesc: 'Acceda a custodia segregada, rendimientos activos y cuentas de libro mayor auditadas.',
      adminTitle: 'Consola de Administración Depositaria',
      adminDesc: 'Restringido a oficiales autorizados de cumplimiento, tesorería y liquidación.',
      emailLabel: 'Correo Electrónico Autorizado',
      passwordLabel: 'Credencial Criptográfica / Contraseña',
      twoFaBadge: 'Protegido con 2FA / TOTP',
      rememberMe: 'Recordar sesión de terminal',
      forgotPassword: 'Restablecer vía mesa de custodia',
      signInButton: 'Autenticar y Entrar al Portal',
      signingIn: 'Verificando Credenciales...',
      demoCredentialsTitle: 'Autenticación Directa por Rol',
      demoInvestorBtn: 'Entrar como Inversor (Sir Arthur Montgomery)',
      demoAdminBtn: 'Entrar como Admin (Marcus Vance - Cumplimiento)',
      roleDifferentiatedNotice: 'Los roles se diferencian estrictamente por credenciales. Los privilegios de administrador se otorgan exclusivamente a cuentas verificadas de oficiales.',
      signOut: 'Cerrar Sesión',
      signOutConfirm: '¿Desea finalizar la sesión autenticada?',
      loggedOutSuccess: 'Sesión finalizada de forma segura.',
      loggedInSuccess: 'Autenticado con éxito.',
      invalidCredentials: 'Autenticación fallida. Verifique sus credenciales institucionales.',
      adminRequiredMessage: 'Se requiere rol administrativo para acceder a esta consola.'
    },
    adminGuard: {
      accessDeniedTitle: 'Autorización Administrativa Requerida',
      clearanceRequired: 'El acceso a la consola de administración de TradeVerge está restringido exclusivamente a oficiales de tesorería y cumplimiento.',
      securityProtocolNotice: 'Todo intento de acceso no autorizado queda registrado con marca temporal, huella criptográfica e IP en registros inmutables.',
      signInAsAdmin: 'Iniciar Sesión con Credenciales de Admin',
      returnToInvestorPortal: 'Volver al Portal de Inversores'
    },
    publicPages: {
      howItWorksTitle: 'Arquitectura de Custodia Institucional',
      howItWorksSubtitle: 'Cómo TradeVerge protege el capital patrimonial con conciliación automática y reservas auditadas.',
      pricingTitle: 'Estructura de Tarifas Transparente',
      pricingSubtitle: 'Costes institucionales sin comisiones ocultas ni sobreprecios de gestión.',
      securityTitle: 'Seguridad y Reservas Depositarias',
      securitySubtitle: 'Almacenamiento en frío multicapa, depósitos bancarios segregados y prueba criptográfica de reservas.',
      educationTitle: 'Investigación y Conocimiento Institucional',
      educationSubtitle: 'Informes de mercado, estrategias multiactivo y análisis macroeconómico especializado.',
      aboutTitle: 'Sobre TradeVerge Private Wealth',
      aboutSubtitle: 'Depositario privado de activos diseñado para family offices, fideicomisos e inversores acreditados.',
      contactTitle: 'Atención Institucional Directa',
      contactSubtitle: 'Conecte con nuestras mesas de Zúrich y Nueva York para incorporación personalizada.',
      legalTitle: 'Marco Regulatorio y Términos',
      legalSubtitle: 'Documentación legal completa, cumplimiento normativo y salvaguardas para inversores.',
      tier1Custody: 'Custodia Depositaria Nivel 1',
      segregatedReserves: 'Reservas de Activos 100% Verificables',
      auditedLedger: 'Libro Mayor Criptográficamente Verificable',
      regulatoryCompliance: 'Normas Globales AML/KYC y FinMA'
    },
    investorPages: {
      transactionsTitle: 'Diario del Libro Mayor Auditado',
      transactionsSubtitle: 'Registro cronológico en tiempo real de depósitos liquidados, desembolsos y rendimientos.',
      documentsTitle: 'Extractos de Custodia e Informes Fiscales',
      documentsSubtitle: 'Descargue certificados oficiales de auditores, extractos mensuales y certificados tributarios.',
      profileTitle: 'Perfil Institucional y Seguridad',
      profileSubtitle: 'Administre identidad verificada, llaves 2FA, direcciones autorizadas y sesiones de auditoría.',
      exportCsv: 'Exportar CSV del Diario',
      filterAll: 'Todos los Registros',
      filterDeposits: 'Depósitos Liquidados',
      filterWithdrawals: 'Desembolsos',
      filterYield: 'Rendimientos Devengados',
      filterInvestments: 'Asignaciones de Capital',
      twoFaStatus: 'Autenticación de Dos Factores (2FA)',
      kycTierLevel: 'Nivel de Verificación KYC',
      accountSecurity: 'Seguridad Criptográfica y Claves API'
    },
    footer: {
      tagline: 'Custodia de Activos Digitales y Libro Mayor de Patrimonio Privado',
      regulatoryNotice: 'TradeVerge opera bajo estrictos protocolos de custodia institucional con reservas segregadas y bóvedas multifirma.',
      riskDisclaimer: 'Los activos digitales y vehículos estructurados conllevan riesgo financiero. El rendimiento pasado no garantiza resultados futuros.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Todos los derechos reservados.',
      quickLinks: 'Mercado y Portales',
      legalLinks: 'Cumplimiento y Gobernanza',
      institutionalServices: 'Depositario Custodio'
    }
  },
  fr: {
    auth: {
      signIn: 'Connexion Client',
      clientAccess: 'Accès Portail',
      investorTab: 'Portail Investisseur',
      adminTab: 'Conformité & Admin',
      investorTitle: 'Portail Gestion Privée',
      investorDesc: 'Accédez à la garde ségréguée, aux rendements actifs et aux registres audités.',
      adminTitle: 'Console Dépositaire Admin',
      adminDesc: 'Réservé aux officiers agréés de conformité, trésorerie et compensation.',
      emailLabel: 'Courriel Autorisé',
      passwordLabel: 'Identifiant Cryptographique / Mot de passe',
      twoFaBadge: 'Sécurisé par 2FA Matériel / TOTP',
      rememberMe: 'Mémoriser la session du terminal',
      forgotPassword: 'Réinitialiser auprès du bureau de garde',
      signInButton: 'S’authentifier & Accéder au Portail',
      signingIn: 'Vérification des Identifiants...',
      demoCredentialsTitle: 'Authentification Directe par Rôle',
      demoInvestorBtn: 'Connexion Investisseur (Sir Arthur Montgomery)',
      demoAdminBtn: 'Connexion Admin (Marcus Vance - Conformité)',
      roleDifferentiatedNotice: 'Les rôles sont strictement différenciés par les identifiants. Les privilèges admin sont réservés aux comptes officiers vérifiés.',
      signOut: 'Déconnexion',
      signOutConfirm: 'Mettre fin à la session authentifiée ?',
      loggedOutSuccess: 'Session terminée en toute sécurité.',
      loggedInSuccess: 'Authentification réussie.',
      invalidCredentials: 'Échec de l’authentification. Veuillez vérifier vos identifiants.',
      adminRequiredMessage: 'Rôle administrateur requis pour cette console.'
    },
    adminGuard: {
      accessDeniedTitle: 'Habilitation Administrative Requise',
      clearanceRequired: 'L’accès à la console d’administration TradeVerge est strictement restreint aux officiers de trésorerie et conformité.',
      securityProtocolNotice: 'Toute tentative non autorisée est consignée avec horodatage, empreinte cryptographique et adresse IP.',
      signInAsAdmin: 'Se connecter avec identifiants Admin',
      returnToInvestorPortal: 'Retourner au Portail Investisseur'
    },
    publicPages: {
      howItWorksTitle: 'Architecture de Garde Institutionnelle',
      howItWorksSubtitle: 'Comment TradeVerge sécurise les capitaux avec réconciliation automatisée et réserves vérifiées.',
      pricingTitle: 'Grille Tarifaire Transparente',
      pricingSubtitle: 'Structure de coûts institutionnels sans frais cachés ni marges de gestion dissimulées.',
      securityTitle: 'Sécurité et Réserves Dépositaires',
      securitySubtitle: 'Stockage à froid multicouche, dépôts bancaires ségrégués et preuve cryptographique de réserves.',
      educationTitle: 'Recherche et Connaissances Institutionnelles',
      educationSubtitle: 'Notes de marché, stratégies multi-actifs et analyses macroéconomiques avancées.',
      aboutTitle: 'À Propos de TradeVerge Private Wealth',
      aboutSubtitle: 'Dépositaire d’actifs privés conçu pour family offices, fiducies et investisseurs qualifiés.',
      contactTitle: 'Relations Institutionnelles Directes',
      contactSubtitle: 'Contactez nos bureaux de Zurich et New York pour un accompagnement sur mesure.',
      legalTitle: 'Informations Réglementaires et Conditions',
      legalSubtitle: 'Documentation juridique exhaustive, cadres de conformité et garanties investisseurs.',
      tier1Custody: 'Garde Dépositaire de Premier Rang',
      segregatedReserves: '100% de Réserves d’Actifs Vérifiables',
      auditedLedger: 'Registre Cryptographiquement Contrôlable',
      regulatoryCompliance: 'Normes Mondiales LBC/FT et FinMA'
    },
    investorPages: {
      transactionsTitle: 'Journal du Registre Audité',
      transactionsSubtitle: 'Historique chronologique en temps réel des dépôts compensés, retraits et rendements.',
      documentsTitle: 'Relevés de Garde et Rapports Fiscaux',
      documentsSubtitle: 'Téléchargez les attestations d’auditeurs, relevés mensuels et attestations fiscales officielles.',
      profileTitle: 'Profil Institutionnel et Sécurité',
      profileSubtitle: 'Gérez vos identités certifiées, clés 2FA, adresses de retrait autorisées et journaux de session.',
      exportCsv: 'Exporter le Journal CSV',
      filterAll: 'Toutes les Lignes',
      filterDeposits: 'Dépôts Compensés',
      filterWithdrawals: 'Retraits',
      filterYield: 'Rendements Cumulés',
      filterInvestments: 'Allocations de Capital',
      twoFaStatus: 'Authentification à Deux Facteurs (2FA)',
      kycTierLevel: 'Niveau d’Accréditation KYC',
      accountSecurity: 'Sécurité Cryptographique et Clés API'
    },
    footer: {
      tagline: 'Garde d’Actifs Numériques et Registre de Gestion Privée',
      regulatoryNotice: 'TradeVerge opère selon des protocoles stricts de conservation avec réserves ségréguées et coffres multi-signatures.',
      riskDisclaimer: 'Les actifs numériques et véhicules structurés comportent des risques financiers. Les performances passées ne préjugent pas des résultats futurs.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Tous droits réservés.',
      quickLinks: 'Marché et Portails',
      legalLinks: 'Conformité et Gouvernance',
      institutionalServices: 'Dépositaire de Garde'
    }
  },
  de: {
    auth: {
      signIn: 'Kundenanmeldung',
      clientAccess: 'Portal-Zugang',
      investorTab: 'Investorenportal',
      adminTab: 'Compliance & Admin',
      investorTitle: 'Private-Wealth-Portal',
      investorDesc: 'Zugang zu getrennter Verwahrung, aktiven Ertragsstrategien und geprüften Hauptbüchern.',
      adminTitle: 'Verwahrstellen-Admin-Konsole',
      adminDesc: 'Ausschließlich für autorisierte Compliance-, Treasury- und Clearing-Offiziere.',
      emailLabel: 'Autorisierte E-Mail',
      passwordLabel: 'Kryptografischer Schlüssel / Passwort',
      twoFaBadge: 'Hardware 2FA / TOTP geschützt',
      rememberMe: 'Terminal-Sitzung speichern',
      forgotPassword: 'Über Custody-Desk zurücksetzen',
      signInButton: 'Authentifizieren & Portal betreten',
      signingIn: 'Anmeldedaten werden überprüft...',
      demoCredentialsTitle: 'Direkte Rollen-Authentifizierung',
      demoInvestorBtn: 'Als Investor anmelden (Sir Arthur Montgomery)',
      demoAdminBtn: 'Als Admin anmelden (Marcus Vance - Compliance Lead)',
      roleDifferentiatedNotice: 'Benutzerrollen werden strikt über Anmeldedaten differenziert. Admin-Rechte verbleiben ausschließlich bei verifizierten Beauftragten.',
      signOut: 'Abmelden',
      signOutConfirm: 'Authentifizierte Sitzung beenden?',
      loggedOutSuccess: 'Sitzung sicher beendet.',
      loggedInSuccess: 'Erfolgreich angemeldet.',
      invalidCredentials: 'Authentifizierung fehlgeschlagen. Bitte Anmeldedaten prüfen.',
      adminRequiredMessage: 'Administratorrolle erforderlich.'
    },
    adminGuard: {
      accessDeniedTitle: 'Administrative Freigabe Erforderlich',
      clearanceRequired: 'Der Zugang zur TradeVerge Admin-Konsole ist autorisierten Treasury- und Compliance-Offizieren vorbehalten.',
      securityProtocolNotice: 'Jeder unberechtigte Zugriffsversuch wird mit Zeitstempel, kryptografischem Fingerabdruck und IP unwiderruflich protokolliert.',
      signInAsAdmin: 'Mit Administrator-Daten anmelden',
      returnToInvestorPortal: 'Zurück zum Investorenportal'
    },
    publicPages: {
      howItWorksTitle: 'Institutionelle Verwahrungsarchitektur',
      howItWorksSubtitle: 'Wie TradeVerge Vermögen mit automatisierter Buchungsabstimmung und geprüften Reserven schützt.',
      pricingTitle: 'Transparente Gebührenordnung',
      pricingSubtitle: 'Institutionelle Kostenstruktur ohne versteckte Margen oder Verwaltungsaufschläge.',
      securityTitle: 'Sicherheit & Verwahrstellenreserven',
      securitySubtitle: 'Mehrstufige Cold-Storage-Tresore, getrennte Bankkonten und kryptografischer Reservenachweis.',
      educationTitle: 'Institutionelle Forschung & Analysen',
      educationSubtitle: 'Marktberichte, Multi-Asset-Allokationen und makroökonomische Analysen.',
      aboutTitle: 'Über TradeVerge Private Wealth',
      aboutSubtitle: 'Spezialisierte Vermögensverwahrstelle für Family Offices, Trusts und institutionelle Investoren.',
      contactTitle: 'Direkte Institutionelle Anfragen',
      contactSubtitle: 'Kontaktieren Sie unsere Zürcher und New Yorker Desks für eine persönliche Betreuung.',
      legalTitle: 'Regulatorische Offenlegungen',
      legalSubtitle: 'Umfassende rechtliche Dokumentation, Compliance-Richtlinien und Anlegerschutz.',
      tier1Custody: 'Tier-1 Verwahrstellenschutz',
      segregatedReserves: '100% verifizierbare Vermögensreserven',
      auditedLedger: 'Kryptografisch überprüfbares Hauptbuch',
      regulatoryCompliance: 'Globale AML/KYC & FinMA Standards'
    },
    investorPages: {
      transactionsTitle: 'Geprüftes Buchungsjournal',
      transactionsSubtitle: 'Echtzeit-Chronik aller abgerechneten Einzahlungen, Auszahlungen und Zinsgutschriften.',
      documentsTitle: 'Depotauszüge & Steuerberichte',
      documentsSubtitle: 'Offizielle Prüfbestätigungen, monatliche Vermögensberichte und Steuerzertifikate herunterladen.',
      profileTitle: 'Institutionelles Profil & Sicherheit',
      profileSubtitle: 'Verifizierte Identität, 2FA-Schlüssel, Whitelist-Adressen und Sitzungsüberwachung verwalten.',
      exportCsv: 'Journal als CSV exportieren',
      filterAll: 'Alle Buchungen',
      filterDeposits: 'Bestätigte Einzahlungen',
      filterWithdrawals: 'Auszahlungen',
      filterYield: 'Ertragsgutschriften',
      filterInvestments: 'Kapitalallokationen',
      twoFaStatus: 'Zwei-Faktor-Authentifizierung (2FA)',
      kycTierLevel: 'KYC-Prüfstufe',
      accountSecurity: 'Kryptografische Sicherheit & API-Schlüssel'
    },
    footer: {
      tagline: 'Institutionelle Verwahrung digitaler Vermögenswerte & Private Wealth Ledger',
      regulatoryNotice: 'TradeVerge arbeitet nach strengen institutionellen Verwahrstandards mit getrennten Bargeldreserven und Multi-Signatur-Tresoren.',
      riskDisclaimer: 'Digitale Vermögenswerte und strukturierte Produkte unterliegen Marktrisiken. Die Wertentwicklung der Vergangenheit ist keine Garantie für die Zukunft.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Alle Rechte vorbehalten.',
      quickLinks: 'Marktplatz & Portale',
      legalLinks: 'Compliance & Governance',
      institutionalServices: 'Depotbank-Dienste'
    }
  },
  zh: {
    auth: {
      signIn: '客户登录',
      clientAccess: '门户登录',
      investorTab: '投资者门户',
      adminTab: '合规与管理',
      investorTitle: '私人财富专有门户',
      investorDesc: '访问独立托管资产、结构化收益策略和经审计的实时账本。',
      adminTitle: '存管管理中控台',
      adminDesc: '仅对授权合规官、财务与结算专员开放。',
      emailLabel: '授权电子邮箱',
      passwordLabel: '密码 / 认证密钥',
      twoFaBadge: '支持硬件 2FA / TOTP 双重验证',
      rememberMe: '记住此终端会话',
      forgotPassword: '通过托管中心重置',
      signInButton: '验证并进入门户',
      signingIn: '凭据验证中...',
      demoCredentialsTitle: '基于角色的直接验证',
      demoInvestorBtn: '以投资者身份登录 (Arthur Montgomery)',
      demoAdminBtn: '以管理员身份登录 (Marcus Vance - 合规负责人)',
      roleDifferentiatedNotice: '系统通过登录凭证严格区分角色。管理权限仅赋予经过验证的授权人员账户。',
      signOut: '退出登录',
      signOutConfirm: '确定退出当前安全会话吗？',
      loggedOutSuccess: '会话已安全终止。',
      loggedInSuccess: '验证成功并已登录。',
      invalidCredentials: '认证失败，请检查您的机构凭据。',
      adminRequiredMessage: '访问管理后台需要管理员权限。'
    },
    adminGuard: {
      accessDeniedTitle: '需要管理授权许可',
      clearanceRequired: 'TradeVerge 管理控制台访问权限仅限授权财务与合规专员。',
      securityProtocolNotice: '所有未授权访问尝试均会被记录时间戳、加密指纹及 IP 地址至不可篡改日志中。',
      signInAsAdmin: '使用管理员凭据登录',
      returnToInvestorPortal: '返回投资者门户'
    },
    publicPages: {
      howItWorksTitle: '机构级资产托管架构',
      howItWorksSubtitle: 'TradeVerge 如何通过自动化账本对账与审计储备保障高净值资本安全。',
      pricingTitle: '透明费率体系',
      pricingSubtitle: '机构级成本标准，无任何隐藏点差或管理费加价。',
      securityTitle: '安全体系与存管储备',
      securitySubtitle: '多重冷存储金库、独立银行存管账户以及密码学储备证明。',
      educationTitle: '机构研究与智库',
      educationSubtitle: '深度市场简报、多资产配置策略与宏观金融分析。',
      aboutTitle: '关于 TradeVerge 私人财富',
      aboutSubtitle: '为家族办公室、信托基金与高净值合资格投资者量身打造的数字资产存管机构。',
      contactTitle: '直接机构咨询',
      contactSubtitle: '联系我们在苏黎世和纽约的私人财富服务台获取专属咨询。',
      legalTitle: '监管披露与条款',
      legalSubtitle: '全套法律文本、合规框架与投资者保护准则。',
      tier1Custody: '第一梯队独立存管',
      segregatedReserves: '100% 可验证资产储备',
      auditedLedger: '密码学可审计分布式账本',
      regulatoryCompliance: '符合全球反洗钱与 FinMA 标准'
    },
    investorPages: {
      transactionsTitle: '审计账本流水明细',
      transactionsSubtitle: '已清算入金、出金以及收益记账的实时年代流水记录。',
      documentsTitle: '存管对账单与税务凭单',
      documentsSubtitle: '下载官方审计师确认书、月度净值账单及税务证明文件。',
      profileTitle: '机构资料与安全设置',
      profileSubtitle: '管理实名认证、硬件 2FA 密钥、安全白名单地址及审计会话。',
      exportCsv: '导出流水 CSV',
      filterAll: '全部记录',
      filterDeposits: '入金充值',
      filterWithdrawals: '出金提现',
      filterYield: '累计收益',
      filterInvestments: '资本分配',
      twoFaStatus: '双重身份验证 (2FA)',
      kycTierLevel: 'KYC 认证级别',
      accountSecurity: '密码学安全与 API 密钥'
    },
    footer: {
      tagline: '机构级数字资产托管与私人财富账本',
      regulatoryNotice: 'TradeVerge 依据严格的机构托管标准运营，配备隔离现金储备与多签安全金库。',
      riskDisclaimer: '数字资产与结构化收益工具涉及市场波动风险。过往业绩不代表未来表现。',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. 保留所有权利。',
      quickLinks: '市场与门户',
      legalLinks: '合规与治理',
      institutionalServices: '托管与存管服务'
    }
  },
  ja: {
    auth: {
      signIn: 'クライアントログイン',
      clientAccess: 'ポータルアクセス',
      investorTab: '投資家ポータル',
      adminTab: 'コンプライアンス管理',
      investorTitle: 'プライベートウェルスポータル',
      investorDesc: '分別保管、アクティブ運用益、監査済み台帳勘定にアクセスします。',
      adminTitle: 'カストディ管理コンソール',
      adminDesc: '権限を持つコンプライアンスおよび財務担当者専用です。',
      emailLabel: '登録メールアドレス',
      passwordLabel: '認証パスワード / 秘密鍵',
      twoFaBadge: 'ハードウェア 2FA / TOTP 対応',
      rememberMe: '端末セッションを保持',
      forgotPassword: 'カストディデスクへ問い合わせ',
      signInButton: '認証してポータルへ進む',
      signingIn: '認証中...',
      demoCredentialsTitle: '役職別ダイレクト認証',
      demoInvestorBtn: '投資家としてログイン (Arthur Montgomery)',
      demoAdminBtn: '管理者としてログイン (Marcus Vance - コンプライアンス)',
      roleDifferentiatedNotice: 'ユーザー権限は認証情報により厳密に区分されます。管理者権限は認証済み担当者アカウントにのみ付与されます。',
      signOut: 'ログアウト',
      signOutConfirm: '安全にセッションを終了しますか？',
      loggedOutSuccess: 'セッションが安全に終了しました。',
      loggedInSuccess: '認証に成功しました。',
      invalidCredentials: '認証に失敗しました。認証情報をご確認ください。',
      adminRequiredMessage: '管理コンソールには管理者権限が必要です。'
    },
    adminGuard: {
      accessDeniedTitle: '管理者権限が必要です',
      clearanceRequired: 'TradeVerge 管理コンソールへのアクセスは、承認された財務・コンプライアンス責任者のみに制限されています。',
      securityProtocolNotice: '不正なアクセス試行はすべてタイムスタンプ、暗号学的指紋、IPアドレスとともに不変ログに記録されます。',
      signInAsAdmin: '管理者認証情報でログイン',
      returnToInvestorPortal: '投資家ポータルへ戻る'
    },
    publicPages: {
      howItWorksTitle: '機関向けカストディ構造',
      howItWorksSubtitle: 'TradeVerge が自動台帳照合と監査済み準備金により資産を保護する仕組み。',
      pricingTitle: '透明性の高い手数料体系',
      pricingSubtitle: '隠れたスプレッドや不透明な管理費のない機関基準のコスト構造。',
      securityTitle: 'セキュリティと資産準備金',
      securitySubtitle: '多層コールドストレージ、分別保管銀行預金、および暗号学的準備金証明。',
      educationTitle: '機関リサーチ＆分析',
      educationSubtitle: '専門的な市場分析レポート、マルチアセット戦略、マクロ経済分析。',
      aboutTitle: 'TradeVerge Private Wealth について',
      aboutSubtitle: 'ファミリーオフィス、信託、適格投資家のために設計されたプライベートアセットカストディ。',
      contactTitle: '機関向けお問い合わせ',
      contactSubtitle: 'チューリッヒおよびニューヨークのプライベートデスクへ直接ご相談いただけます。',
      legalTitle: '法規制の開示と利用規約',
      legalSubtitle: '包括的な法的開示文書、コンプライアンスフレームワーク、投資家保護。',
      tier1Custody: 'ティア1分別保管カストディ',
      segregatedReserves: '100% 検証可能な資産準備金',
      auditedLedger: '暗号監査可能な分散台帳',
      regulatoryCompliance: 'グローバル AML/KYC および FinMA 基準準拠'
    },
    investorPages: {
      transactionsTitle: '監査済み台帳ジャーナル',
      transactionsSubtitle: '入金、出金、利回り付与のリアルタイムな履歴明細。',
      documentsTitle: '保管報告書および税務証明書',
      documentsSubtitle: '公式監査証明書、月次資産報告書、および税務関連書類をダウンロード。',
      profileTitle: '機関プロファイルとセキュリティ',
      profileSubtitle: '認証済みID、ハードウェア2FA、ホワイトリスト登録アドレス、セッション管理。',
      exportCsv: 'ジャーナル CSV エクスポート',
      filterAll: 'すべての履歴',
      filterDeposits: '決済済み入金',
      filterWithdrawals: '出金',
      filterYield: '発生利益',
      filterInvestments: '資本配分',
      twoFaStatus: '2要素認証 (2FA)',
      kycTierLevel: 'KYC 認証ティア',
      accountSecurity: '暗号学的セキュリティと API キー'
    },
    footer: {
      tagline: '機関向けデジタルアセットカストディ＆プライベートウェルス台帳',
      regulatoryNotice: 'TradeVerge は分別保管現金準備金とマルチシグ保管金庫を備え、厳格な機関基準で運営されています。',
      riskDisclaimer: 'デジタル資産およびストラクチャード商品は市場リスクを伴います。過去の運用実績は将来の成果を保証するものではありません。',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. All rights reserved.',
      quickLinks: 'マーケット＆ポータル',
      legalLinks: 'コンプライアンス＆統治',
      institutionalServices: 'カストディ保管業務'
    }
  },
  ar: {
    auth: {
      signIn: 'تسجيل دخول العملاء',
      clientAccess: 'دخول البوابة',
      investorTab: 'بوابة المستثمر',
      adminTab: 'الامتثال والإدارة',
      investorTitle: 'بوابة إدارة الثروات الخاصة',
      investorDesc: 'الوصول إلى الحفظ المفصول والعوائد النشطة وسجلات الحسابات المدققة.',
      adminTitle: 'لوحة التحكم الإدارية للحفظ',
      adminDesc: 'مخصصة لمسؤولي الامتثال والخزينة والمقاصة المصرح لهم فقط.',
      emailLabel: 'البريد الإلكتروني المعتمد',
      passwordLabel: 'بيانات الاعتماد / كلمة المرور',
      twoFaBadge: 'محمي بواسطة 2FA / TOTP الأمني',
      rememberMe: 'تذكر جلسة هذه المحطة',
      forgotPassword: 'إعادة التعيين عبر مكتب الحفظ',
      signInButton: 'المصادقة والدخول إلى البوابة',
      signingIn: 'جاري التحقق من بيانات الاعتماد...',
      demoCredentialsTitle: 'المصادقة المباشرة حسب الدور',
      demoInvestorBtn: 'دخول كمستثمر (Sir Arthur Montgomery)',
      demoAdminBtn: 'دخول كمسؤول إدارة (Marcus Vance - رئيس الامتثال)',
      roleDifferentiatedNotice: 'يتم التمييز بين أدوار المستخدمين بدقة عبر بيانات الاعتماد. تمنح الامتيازات الإدارية حصرياً لحسابات المسؤولين المعتمدة.',
      signOut: 'تسجيل الخروج',
      signOutConfirm: 'هل ترغب في إنهاء الجلسة الآمنة؟',
      loggedOutSuccess: 'تم إنهاء الجلسة بأمان.',
      loggedInSuccess: 'تم تسجيل الدخول بنجاح.',
      invalidCredentials: 'فشلت المصادقة. يرجى التحقق من بيانات الاعتماد الخاصة بك.',
      adminRequiredMessage: 'مطلوب صلاحية إدارية للوصول إلى هذه اللوحة.'
    },
    adminGuard: {
      accessDeniedTitle: 'تصريح إداري مطلوب',
      clearanceRequired: 'الوصول إلى لوحة إدارة TradeVerge مقتصر حصرياً على مسؤولي الخزينة والامتثال المعتمدين.',
      securityProtocolNotice: 'يتم تسجيل جميع محاولات الدخول غير المصرح بها مع الطابع الزمني والبصمة الرقمية وعنوان IP.',
      signInAsAdmin: 'تسجيل الدخول ببيانات المسؤول',
      returnToInvestorPortal: 'العودة إلى بوابة المستثمر'
    },
    publicPages: {
      howItWorksTitle: 'بنية الحفظ المؤسسي',
      howItWorksSubtitle: 'كيف تحمي TradeVerge رؤوس الأموال عبر التسوية الآلية والاحتياطيات المدققة.',
      pricingTitle: 'جدول رسوم شفاف',
      pricingSubtitle: 'هيكل تكلفة مؤسسي بدون فروق أسعار مخفية أو رسوم إدارة إضافية.',
      securityTitle: 'الأمان والاحتياطيات الإيداعية',
      securitySubtitle: 'خزائن حفظ باردة متعددة الطبقات وإيداعات مصرفية مفصولة وإثبات تشفيري للاحتياطيات.',
      educationTitle: 'الأبحاث والتحليلات المؤسسية',
      educationSubtitle: 'تقارير سوقية متقدمة واستراتيجيات تخصيص الأصول وتحليلات اقتصادية شاملة.',
      aboutTitle: 'عن TradeVerge Private Wealth',
      aboutSubtitle: 'مؤسسة حفظ أصول خاصة صممت خصيصاً للمكاتب العائلية وصناديق الائتمان والمستثمرين المؤهلين.',
      contactTitle: 'الاستفسارات المؤسسية المباشرة',
      contactSubtitle: 'تواصل مع مكاتبنا في زيورخ ونيويورك للحصول على خدمة مخصصة.',
      legalTitle: 'الإفصاحات التنظيمية والشروط',
      legalSubtitle: 'التوثيق القانوني الشامل وأطر الامتثال وحماية المستثمر.',
      tier1Custody: 'حفظ إيداعي من الدرجة الأولى',
      segregatedReserves: 'احتياطيات أصول قابلة للتحقق بنسبة 100%',
      auditedLedger: 'دفتر أستاذ مشفر قابل للتدقيق',
      regulatoryCompliance: 'معايير الامتثال ومكافحة غسل الأموال العالمية'
    },
    investorPages: {
      transactionsTitle: 'دفتر يومية الحسابات المدقق',
      transactionsSubtitle: 'سجل زمني لحظي لجميع الإيداعات والسحوبات والعوائد المستحقة.',
      documentsTitle: 'كشوفات الحفظ والتقارير الضريبية',
      documentsSubtitle: 'تحميل شهادات التدقيق الرسمية والبيانات الشهرية والشهادات الضريبية.',
      profileTitle: 'الملف الشخصي والأمان المؤسسي',
      profileSubtitle: 'إدارة الهوية المعتمدة، مفاتيح 2FA، والعناوين المعتمدة في القائمة البيضاء.',
      exportCsv: 'تصدير السجل CSV',
      filterAll: 'كافة المعاملات',
      filterDeposits: 'الإيداعات المعتمدة',
      filterWithdrawals: 'السحوبات',
      filterYield: 'العوائد المستحقة',
      filterInvestments: 'تخصيصات رأس المال',
      twoFaStatus: 'المصادقة الثنائية (2FA)',
      kycTierLevel: 'مستوى التحقق من الهوية KYC',
      accountSecurity: 'الأمان التشفيري ومفاتيح API'
    },
    footer: {
      tagline: 'حفظ الأصول الرقمية المؤسسية ودفتر أستاذ الثروات الخاصة',
      regulatoryNotice: 'تعمل TradeVerge وفق بروتوكولات حفظ مؤسسية صارمة مع احتياطيات نقدية مفصولة وخزائن متعددة التوقيع.',
      riskDisclaimer: 'تنطوي الأصول الرقمية على مخاطر تقلبات الأسواق المالية. الأداء السابق لا يضمن النتائج المستقبلية.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. جميع الحقوق محفوظة.',
      quickLinks: 'الأسواق والبوابات',
      legalLinks: 'الامتثال والحوكمة',
      institutionalServices: 'خدمات الحفظ الأمين'
    }
  },
  pt: {
    auth: {
      signIn: 'Acesso do Cliente',
      clientAccess: 'Entrar no Portal',
      investorTab: 'Portal do Investidor',
      adminTab: 'Conformidade & Admin',
      investorTitle: 'Portal de Gestão de Fortuna',
      investorDesc: 'Acesse custódia segregada, rendimentos ativos e contas de livro-razão auditadas.',
      adminTitle: 'Console de Administração Depositária',
      adminDesc: 'Restrito a oficiais autorizados de conformidade, tesouraria e compensação.',
      emailLabel: 'E-mail Autorizado',
      passwordLabel: 'Credencial Criptográfica / Senha',
      twoFaBadge: 'Protegido com 2FA de Hardware / TOTP',
      rememberMe: 'Lembrar sessão deste terminal',
      forgotPassword: 'Redefinir via mesa de custódia',
      signInButton: 'Autenticar e Entrar no Portal',
      signingIn: 'Verificando Credenciais...',
      demoCredentialsTitle: 'Autenticação Direta por Função',
      demoInvestorBtn: 'Entrar como Investidor (Sir Arthur Montgomery)',
      demoAdminBtn: 'Entrar como Admin (Marcus Vance - Líder de Conformidade)',
      roleDifferentiatedNotice: 'As funções de usuário são estritamente diferenciadas pelas credenciais. Os privilégios de administração são concedidos exclusivamente a contas de oficiais verificados.',
      signOut: 'Sair da Conta',
      signOutConfirm: 'Deseja encerrar a sessão autenticada?',
      loggedOutSuccess: 'Sessão encerrada com segurança.',
      loggedInSuccess: 'Autenticado com sucesso.',
      invalidCredentials: 'Falha na autenticação. Verifique suas credenciais institucionais.',
      adminRequiredMessage: 'Função de administrador necessária para acessar este console.'
    },
    adminGuard: {
      accessDeniedTitle: 'Autorização Administrativa Necessária',
      clearanceRequired: 'O acesso ao console de administração da TradeVerge é restrito exclusivamente a oficiais de tesouraria e conformidade.',
      securityProtocolNotice: 'Todas as tentativas de acesso não autorizado são registradas com carimbo de data/hora, impressão criptográfica e IP em registros imutáveis.',
      signInAsAdmin: 'Entrar com Credenciais de Administrador',
      returnToInvestorPortal: 'Voltar ao Portal do Investidor'
    },
    publicPages: {
      howItWorksTitle: 'Arquitetura de Custódia Institucional',
      howItWorksSubtitle: 'Como a TradeVerge protege o patrimônio com conciliação contábil automatizada e reservas auditadas.',
      pricingTitle: 'Tabela de Tarifas Transparente',
      pricingSubtitle: 'Estrutura de custos institucional sem taxas ocultas ou spreads de gestão adicionais.',
      securityTitle: 'Segurança e Reservas Depositárias',
      securitySubtitle: 'Armazenamento a frio multicamadas, contas bancárias segregadas e prova criptográfica de reservas.',
      educationTitle: 'Pesquisa e Inteligência Institucional',
      educationSubtitle: 'Relatórios de mercado, estratégias multiativos e análises macroeconômicas aprofundadas.',
      aboutTitle: 'Sobre a TradeVerge Private Wealth',
      aboutSubtitle: 'Depositária privada de ativos digitais para family offices, fundos e investidores qualificados.',
      contactTitle: 'Atendimento Institucional Direto',
      contactSubtitle: 'Conecte-se com nossas mesas de Zurique e Nova York para integração personalizada.',
      legalTitle: 'Divulgações Regulatórias e Termos',
      legalSubtitle: 'Documentação jurídica integral, normas de conformidade e garantias ao investidor.',
      tier1Custody: 'Custódia Depositária de Nível 1',
      segregatedReserves: '100% de Reservas de Ativos Verificáveis',
      auditedLedger: 'Livro-Razão Criptograficamente Auditável',
      regulatoryCompliance: 'Normas Globais de AML/KYC e FinMA'
    },
    investorPages: {
      transactionsTitle: 'Livro Diário Auditado',
      transactionsSubtitle: 'Registro cronológico em tempo real de depósitos liquidados, desembolsos e rendimentos.',
      documentsTitle: 'Extratos de Custódia e Informes Fiscais',
      documentsSubtitle: 'Baixe certificados de auditoria oficiais, extratos mensais e comprovantes fiscais.',
      profileTitle: 'Perfil Institucional e Segurança',
      profileSubtitle: 'Gerencie identidade verificada, chaves 2FA, endereços permitidos e registros de auditoria.',
      exportCsv: 'Exportar Diário em CSV',
      filterAll: 'Todos os Registros',
      filterDeposits: 'Depósitos Compensados',
      filterWithdrawals: 'Desembolsos',
      filterYield: 'Rendimentos Acumulados',
      filterInvestments: 'Alocações de Capital',
      twoFaStatus: 'Autenticação de Dois Fatores (2FA)',
      kycTierLevel: 'Nível de Verificação KYC',
      accountSecurity: 'Segurança Criptográfica e Chaves de API'
    },
    footer: {
      tagline: 'Custódia de Ativos Digitais Institucionais e Livro-Razão de Wealth Management',
      regulatoryNotice: 'A TradeVerge opera sob rígidos protocolos de custódia institucional com reservas segregadas e cofres multifirma.',
      riskDisclaimer: 'Ativos digitais e veículos estruturados envolvem riscos de mercado. O desempenho passado não garante resultados futuros.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Todos os direitos reservados.',
      quickLinks: 'Mercado e Portais',
      legalLinks: 'Conformidade e Governança',
      institutionalServices: 'Serviços de Custódia'
    }
  },
  ru: {
    auth: {
      signIn: 'Вход для клиентов',
      clientAccess: 'Вход в портал',
      investorTab: 'Портал инвестора',
      adminTab: 'Комплаенс и админ',
      investorTitle: 'Портал управления капиталом',
      investorDesc: 'Доступ к сегрегированному хранению, активным доходным стратегиям и аудируемым реестрам.',
      adminTitle: 'Консоль администратора депозитария',
      adminDesc: 'Доступ разрешен исключительно уполномоченным офицерам комплаенса и казначейства.',
      emailLabel: 'Авторизованный Email',
      passwordLabel: 'Криптографический пароль / Ключ',
      twoFaBadge: 'Защита аппаратным 2FA / TOTP',
      rememberMe: 'Запомнить сессию терминала',
      forgotPassword: 'Сброс через отдел кастоди',
      signInButton: 'Аутентифицироваться и войти',
      signingIn: 'Проверка учетных данных...',
      demoCredentialsTitle: 'Прямая аутентификация по роли',
      demoInvestorBtn: 'Войти как инвестор (Sir Arthur Montgomery)',
      demoAdminBtn: 'Войти как админ (Marcus Vance - Комплаенс)',
      roleDifferentiatedNotice: 'Роли пользователей строго разделены по учетным записям. Права администратора предоставляются только проверенным офицерам.',
      signOut: 'Выйти из системы',
      signOutConfirm: 'Завершить защищенную сессию?',
      loggedOutSuccess: 'Сессия успешно завершена.',
      loggedInSuccess: 'Успешная аутентификация.',
      invalidCredentials: 'Неверные учетные данные. Пожалуйста, проверьте логин и пароль.',
      adminRequiredMessage: 'Для доступа к этой консоли требуются права администратора.'
    },
    adminGuard: {
      accessDeniedTitle: 'Требуется административный допуск',
      clearanceRequired: 'Доступ к консоли администрирования TradeVerge разрешен только авторизованным офицерам казначейства и комплаенса.',
      securityProtocolNotice: 'Все попытки несанкционированного доступа фиксируются в неизменяемом журнале с временной меткой, хэшем и IP-адресом.',
      signInAsAdmin: 'Войти с учетными данными администратора',
      returnToInvestorPortal: 'Вернуться в портал инвестора'
    },
    publicPages: {
      howItWorksTitle: 'Архитектура институционального кастоди',
      howItWorksSubtitle: 'Как TradeVerge защищает крупный частный капитал с помощью автоматической сверки и аудируемых резервов.',
      pricingTitle: 'Прозрачная структура комиссий',
      pricingSubtitle: 'Институциональные тарифы без скрытых надбавок к спредам и дополнительных комиссий.',
      securityTitle: 'Безопасность и депозитарные резервы',
      securitySubtitle: 'Многоуровневые холодные хранилища, сегрегированные банковские счета и криптографическое доказательство резервов.',
      educationTitle: 'Аналитика и исследования',
      educationSubtitle: 'Профессиональные обзоры рынков, стратегии мультиактивного распределения и макроэкономический анализ.',
      aboutTitle: 'О компании TradeVerge Private Wealth',
      aboutSubtitle: 'Специализированный депозитарий частных активов для семейных офисов, трастов и квалифицированных инвесторов.',
      contactTitle: 'Прямые институциональные запросы',
      contactSubtitle: 'Свяжитесь с нашими офисами в Цюрихе и Нью-Йорке для индивидуального подключения.',
      legalTitle: 'Нормативные раскрытия и условия',
      legalSubtitle: 'Полная юридическая документация, регламенты комплаенса и стандарты защиты инвесторов.',
      tier1Custody: 'Депозитарное хранение высшего уровня (Tier 1)',
      segregatedReserves: '100% верифицируемые резервы активов',
      auditedLedger: 'Криптографически верифицируемый реестр',
      regulatoryCompliance: 'Стандарты FinMA и глобальные нормы AML/KYC'
    },
    investorPages: {
      transactionsTitle: 'Журнал аудируемого реестра',
      transactionsSubtitle: 'Хронологический учет всех подтвержденных депозитов, выплат и начисленного дохода в реальном времени.',
      documentsTitle: 'Депозитарные выписки и налоговые отчеты',
      documentsSubtitle: 'Скачивайте официальные подтверждения аудиторов, ежемесячные отчеты и налоговые сертификаты.',
      profileTitle: 'Профиль институционала и безопасность',
      profileSubtitle: 'Управление верификацией, аппаратными 2FA ключами, белыми списками адресов и сессиями аудита.',
      exportCsv: 'Экспорт журнала в CSV',
      filterAll: 'Все операции',
      filterDeposits: 'Подтвержденные депозиты',
      filterWithdrawals: 'Выплаты',
      filterYield: 'Начисленный доход',
      filterInvestments: 'Аллокация капитала',
      twoFaStatus: 'Двухфакторная аутентификация (2FA)',
      kycTierLevel: 'Уровень проверки KYC',
      accountSecurity: 'Криптографическая безопасность и API ключи'
    },
    footer: {
      tagline: 'Институциональный кастоди цифровых активов и реестр частного капитала',
      regulatoryNotice: 'TradeVerge работает по строгим протоколам институционального хранения с сегрегированными резервами и мультиподписными сейфами.',
      riskDisclaimer: 'Цифровые активы и структурированные инструменты сопряжены с финансовыми рисками. Прошлые результаты не гарантируют доходность в будущем.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Все права защищены.',
      quickLinks: 'Маркетплейс и порталы',
      legalLinks: 'Комплаенс и регулирование',
      institutionalServices: 'Депозитарные услуги'
    }
  },
  it: {
    auth: {
      signIn: 'Accesso Clienti',
      clientAccess: 'Accedi al Portale',
      investorTab: 'Portale Investitore',
      adminTab: 'Conformità & Admin',
      investorTitle: 'Portale Private Wealth',
      investorDesc: 'Accedi a custodia segregata, allocazioni a rendimento attivo e registri contabili certificati.',
      adminTitle: 'Console Amministrativa Depositaria',
      adminDesc: 'Accesso riservato agli ufficiali autorizzati di conformità, tesoreria e compensazione.',
      emailLabel: 'Email Autorizzata',
      passwordLabel: 'Credenziale Crittografica / Password',
      twoFaBadge: 'Protetto da Hardware 2FA / TOTP',
      rememberMe: 'Memorizza sessione del terminale',
      forgotPassword: 'Reimposta tramite desk di custodia',
      signInButton: 'Autenticati ed Entra nel Portale',
      signingIn: 'Verifica Credenziali...',
      demoCredentialsTitle: 'Autenticazione Diretta per Ruolo',
      demoInvestorBtn: 'Accedi come Investitore (Sir Arthur Montgomery)',
      demoAdminBtn: 'Accedi come Admin (Marcus Vance - Responsabile Conformità)',
      roleDifferentiatedNotice: 'I ruoli utente sono rigorosamente differenziati dalle credenziali di accesso. I privilegi amministrativi sono concessi solo ad account ufficiali verificati.',
      signOut: 'Disconnetti',
      signOutConfirm: 'Terminare la sessione autenticata?',
      loggedOutSuccess: 'Sessione terminata in sicurezza.',
      loggedInSuccess: 'Autenticato con successo.',
      invalidCredentials: 'Autenticazione non riuscita. Verificare le credenziali istituzionali.',
      adminRequiredMessage: 'Ruolo di amministratore richiesto per questa console.'
    },
    adminGuard: {
      accessDeniedTitle: 'Autorizzazione Amministrativa Richiesta',
      clearanceRequired: 'L’accesso alla console di amministrazione TradeVerge è riservato esclusivamente ai responsabili di tesoreria e conformità.',
      securityProtocolNotice: 'Ogni tentativo di accesso non autorizzato viene registrato con data, ora, impronta crittografica e IP in registri immutabili.',
      signInAsAdmin: 'Accedi con Credenziali di Amministratore',
      returnToInvestorPortal: 'Ritorna al Portale Investitore'
    },
    publicPages: {
      howItWorksTitle: 'Architettura di Custodia Istituzionale',
      howItWorksSubtitle: 'Come TradeVerge protegge i grandi patrimoni con riconciliazione contabile automatizzata e riserve certificate.',
      pricingTitle: 'Piano Commissionale Trasparente',
      pricingSubtitle: 'Struttura costi istituzionale senza spread nascosti o commissioni di gestione aggiuntive.',
      securityTitle: 'Sicurezza e Riserve Depositarie',
      securitySubtitle: 'Caveau cold storage multilivello, depositi bancari segregati e prova crittografica delle riserve.',
      educationTitle: 'Ricerca e Analisi Istituzionale',
      educationSubtitle: 'Report di mercato, strategie multi-asset e analisi macroeconomica approfondita.',
      aboutTitle: 'Chi è TradeVerge Private Wealth',
      aboutSubtitle: 'Depositario privato di asset per family office, trust e investitori qualificati.',
      contactTitle: 'Assistenza Istituzionale Diretta',
      contactSubtitle: 'Contatta i nostri desk di Zurigo e New York per un servizio di custodia personalizzato.',
      legalTitle: 'Informativa Normativa e Termini',
      legalSubtitle: 'Documentazione legale esaustiva, quadri di conformità e tutele per gli investitori.',
      tier1Custody: 'Custodia Depositaria di Livello 1',
      segregatedReserves: '100% di Riserve di Asset Verificabili',
      auditedLedger: 'Mastro Contabile Crittograficamente Verificabile',
      regulatoryCompliance: 'Standard Internazionali AML/KYC e FinMA'
    },
    investorPages: {
      transactionsTitle: 'Giornale Contabile Verificato',
      transactionsSubtitle: 'Cronologia in tempo reale di depositi contabilizzati, prelievi e accrediti di rendimento.',
      documentsTitle: 'Estratti Conto e Certificazioni Fiscali',
      documentsSubtitle: 'Scarica le conferme ufficiali dei revisori, gli estratti conto mensili e le certificazioni fiscali.',
      profileTitle: 'Profilo Istituzionale e Sicurezza',
      profileSubtitle: 'Gestisci identità verificata, chiavi 2FA hardware, indirizzi whitelist e sessioni di audit.',
      exportCsv: 'Esporta Giornale in CSV',
      filterAll: 'Tutti i Movimenti',
      filterDeposits: 'Depositi Contabilizzati',
      filterWithdrawals: 'Prelievi',
      filterYield: 'Rendimenti Maturati',
      filterInvestments: 'Allocazioni di Capitale',
      twoFaStatus: 'Autenticazione a Due Fattori (2FA)',
      kycTierLevel: 'Livello di Verifica KYC',
      accountSecurity: 'Sicurezza Crittografica e Chiavi API'
    },
    footer: {
      tagline: 'Custodia di Asset Digitali Istituzionali e Registro Private Wealth',
      regulatoryNotice: 'TradeVerge opera secondo rigidi protocolli di custodia con riserve di liquidità segregate e caveau multifirma.',
      riskDisclaimer: 'Gli asset digitali e i prodotti strutturati comportano rischi di mercato. I rendimenti passati non garantiscono risultati futuri.',
      copyright: '© 2026 TradeVerge Private Wealth Ltd. Tutti i diritti riservati.',
      quickLinks: 'Mercato e Portali',
      legalLinks: 'Conformità e Governance',
      institutionalServices: 'Servizi di Custodia Depositaria'
    }
  }
};
