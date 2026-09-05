import React, { useState, useRef, useEffect } from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { languageList } from '../../i18n/translations';
import { pageTranslations } from '../../i18n/pageTranslations';
import { 
  ShieldCheck, 
  Globe, 
  ChevronDown, 
  Wallet, 
  Bell, 
  Menu, 
  X, 
  ArrowUpRight, 
  Check,
  User,
  LogOut,
  ShieldAlert,
  LogIn,
  Lock,
  Layers,
  FileText,
  BadgeCheck,
  Mail,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleTranslateModal } from '../shared/GoogleTranslateModal';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    user,
    isAuthenticated,
    logout,
    openAuthModal,
    activeRole, 
    currentRoute, 
    setCurrentRoute, 
    availableCash,
    notifications,
    markNotificationAsRead,
    openEmailModal,
    openGoogleVerifyModal,
    openSmartsuppModal
  } = useApp();

  const pageT = pageTranslations[language] || pageTranslations.en;
  const authT = pageT.auth;

  // Localized navigation item labels for investor routes
  const navLabels: Record<string, { transactions: string; kyc: string; documents: string; profile: string; support: string }> = {
    en: { transactions: 'Transactions', kyc: 'KYC Clearance', documents: 'Documents', profile: 'Security Profile', support: 'Support' },
    es: { transactions: 'Transacciones', kyc: 'Verificación KYC', documents: 'Documentos', profile: 'Perfil y Seguridad', support: 'Soporte' },
    fr: { transactions: 'Transactions', kyc: 'Vérification KYC', documents: 'Documents', profile: 'Profil et Sécurité', support: 'Support' },
    de: { transactions: 'Transaktionen', kyc: 'KYC-Prüfung', documents: 'Dokumente', profile: 'Profil & Sicherheit', support: 'Support' },
    zh: { transactions: '交易明细', kyc: 'KYC认证', documents: '合规文件', profile: '安全档案', support: '客户支持' },
    ja: { transactions: '取引履歴', kyc: 'KYC認証', documents: '関連書類', profile: 'セキュリティ設定', support: 'サポート' },
    ar: { transactions: 'سجل المعاملات', kyc: 'التحقق من الهوية', documents: 'المستندات', profile: 'الملف والأمان', support: 'الدعم الفني' },
    pt: { transactions: 'Transações', kyc: 'Verificação KYC', documents: 'Documentos', profile: 'Perfil e Segurança', support: 'Suporte' },
    it: { transactions: 'Transazioni', kyc: 'Verifica KYC', documents: 'Documenti', profile: 'Profilo e Sicurezza', support: 'Supporto' },
    ru: { transactions: 'Транзакции', kyc: 'Верификация KYC', documents: 'Документы', profile: 'Профиль и Безопасность', support: 'Поддержка' },
  };
  const navItem = navLabels[language] || navLabels.en;

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentLangObj = languageList.find(l => l.code === language) || languageList[0];

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const isAdmin = isAuthenticated && user.role === 'admin';
  const isInvestor = isAuthenticated && user.role !== 'admin';
  const isInvestorView = ['dashboard', 'deposit', 'withdraw', 'portfolio', 'transactions', 'kyc', 'documents', 'support', 'profile'].includes(currentRoute);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 text-gray-200 w-full max-w-full overflow-x-clip">
      {/* Top Advisory / Institutional Custody Bar */}
      <div className={`border-b text-xs py-1 px-2.5 sm:py-1.5 sm:px-4 transition-colors overflow-hidden ${
        isAdmin 
          ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' 
          : 'bg-[#050505] border-white/5 text-gray-400'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
            <span className={`shrink-0 inline-block w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
            <span className="font-mono text-[9px] sm:text-[11px] text-gray-300 truncate">
              {isAdmin ? 'ADMINISTRATIVE AUDIT CONSOLE' : 'TRADEVERGE SECURE LEDGER'}
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden lg:inline text-[11px] text-gray-400 truncate">
              {isAdmin 
                ? 'Treasury & Depository Reserves Clearance' 
                : 'Segregated Depository Reserves Reconciled & Audited'}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden md:inline">
                {isAdmin ? 'Clearance Level 4: Marcus Vance (CCO)' : 'Tier 1 Institutional Custody'}
              </span>
            </div>

            {isAdmin ? (
              <button
                onClick={logout}
                className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                title="Exit Admin Console and Sign Out"
              >
                <LogOut className="w-2.5 h-2.5 shrink-0" />
                <span>Exit Admin</span>
              </button>
            ) : isAuthenticated ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                <BadgeCheck className="w-3 h-3" />
                <span>Verified: {user.fullName.split(' ')[0]}</span>
              </span>
            ) : (
              <button
                onClick={() => openAuthModal('investor')}
                className="text-[9px] sm:text-[10px] font-mono text-stone-400 hover:text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Lock className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                <span>Client Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-18 gap-1.5 sm:gap-2 min-w-0">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick(isAdmin ? 'admin' : 'home')}
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group select-none min-w-0 shrink"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-sm flex items-center justify-center text-black font-black shadow-md group-hover:bg-amber-400 transition-colors shrink-0">
              <span className="font-serif font-black text-[11px] sm:text-sm text-black tracking-wider">TV</span>
            </div>
            <div className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white uppercase italic group-hover:text-amber-400 transition-colors truncate">
                  TradeVerge<span className="text-amber-500">.live</span>
                </span>
              </div>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium truncate">
                Private Wealth & Asset Ledger
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {isAdmin ? (
              // Admin-only nav links
              <div className="flex items-center gap-1 bg-[#0f0f0f] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    currentRoute === 'admin' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.adminConsole}
                </button>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {t.nav.dashboard}
                </button>
                <button
                  onClick={() => handleNavClick('home')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {t.nav.home}
                </button>
              </div>
            ) : isInvestorView ? (
              // Investor portal nav links
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'dashboard' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.dashboard.title}
                </button>
                <button
                  onClick={() => handleNavClick('deposit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'deposit' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.deposits.title}
                </button>
                <button
                  onClick={() => handleNavClick('withdraw')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'withdraw' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.withdrawals.title}
                </button>
                <button
                  onClick={() => handleNavClick('investments')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'investments' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.investments}
                </button>
                <button
                  onClick={() => handleNavClick('transactions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'transactions' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {navItem.transactions}
                </button>
                <button
                  onClick={() => handleNavClick('kyc')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'kyc' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {navItem.kyc}
                </button>
                <button
                  onClick={() => handleNavClick('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'documents' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {navItem.documents}
                </button>
              </div>
            ) : (
              // Public nav links
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'home' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.home}
                </button>
                <button
                  onClick={() => handleNavClick('investments')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'investments' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.investments}
                </button>
                <button
                  onClick={() => handleNavClick('how_it_works')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'how_it_works' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.howItWorks}
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'pricing' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.pricing}
                </button>
                <button
                  onClick={() => handleNavClick('education')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'education' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.education}
                </button>
                <button
                  onClick={() => handleNavClick('security')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'security' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.security}
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'about' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.about}
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'contact' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.nav.contact}
                </button>
              </div>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Cleared Cash Badge (if investor view) */}
            {isInvestor && (
              <div 
                onClick={() => handleNavClick('deposit')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 text-xs cursor-pointer hover:border-amber-500/40 transition-all shrink-0"
                title="Click to Deposit Funds"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 block leading-none uppercase tracking-wider">Cleared Cash</span>
                  <span className="font-mono font-semibold text-white text-xs">
                    ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            {/* Google Cloud Translator API Key Trigger */}
            <button
              type="button"
              onClick={() => setIsTranslateModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0f0f0f] border border-blue-500/30 hover:border-blue-500/60 text-xs font-medium transition-all text-blue-300 hover:text-white cursor-pointer shrink-0"
              title="Google Cloud Translation (API Key)"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xl:inline text-[11px]">Google Translate</span>
            </button>

            {/* Smartsupp Live Chat Key Trigger */}
            <button
              type="button"
              onClick={() => openSmartsuppModal()}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0f0f0f] border border-amber-500/30 hover:border-amber-500/60 text-xs font-medium transition-all text-amber-300 hover:text-white cursor-pointer shrink-0"
              title="Smartsupp Live Chat (Configure Key)"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline text-[11px]">Smartsupp</span>
            </button>

            {/* 10-Language Selector Dropdown */}
            <div className="relative shrink-0" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/20 text-xs font-medium transition-all text-gray-200 cursor-pointer shrink-0"
                aria-label="Select Language"
              >
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="font-medium tracking-wide uppercase text-[10px] sm:text-xs">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-bold">Languages (10)</span>
                      <Globe className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-0.5">
                      {languageList.map((langItem) => {
                        const isSelected = langItem.code === language;
                        return (
                          <button
                            key={langItem.code}
                            onClick={() => {
                              setLanguage(langItem.code);
                              setIsLangOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isSelected 
                                ? 'bg-amber-500 text-black font-bold' 
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{langItem.flag}</span>
                              <span className="font-medium">{langItem.nativeName}</span>
                              <span className="text-[10px] text-gray-400">({langItem.name})</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Google Cloud Translation Status & Config */}
                    <div className="pt-2 mt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLangOpen(false);
                          setIsTranslateModalOpen(true);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-[11px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 transition-all cursor-pointer font-medium"
                      >
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-400" />
                          <span>Google Cloud Translate</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-400/20 text-blue-200 font-mono">
                          Engine
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell (for authenticated users) */}
            {isAuthenticated && (
              <div className="relative shrink-0" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-1.5 sm:p-2 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center shadow">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                        <h4 className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-bold">Authoritative Event Feed</h4>
                        <span className="text-[11px] text-amber-400 font-mono">{unreadCount} unread</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-gray-400 py-4 text-center">No notifications present</p>
                        ) : (
                          notifications.slice(0, 5).map(n => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationAsRead(n.id)}
                              className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                n.read 
                                  ? 'bg-white/[0.02] border-transparent text-gray-500' 
                                  : 'bg-white/5 border-white/10 text-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-white text-[11px]">{n.title}</span>
                                <span className="text-[9px] font-mono text-gray-500">
                                  {new Date(n.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed line-clamp-2 text-gray-400">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Authenticated User Profile Pill & Dropdown */}
            {isAuthenticated ? (
              <div className="relative shrink-0" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1 sm:gap-2 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/25 text-xs transition-all cursor-pointer shrink-0"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isAdmin ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-white/10 text-white'
                  }`}>
                    {isAdmin ? <ShieldAlert className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-semibold text-white leading-tight truncate max-w-[110px]">
                      {user.fullName.split(' ')[0]}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-500 font-mono leading-none">
                      {user.role === 'admin' ? 'Admin' : 'Investor'}
                    </div>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl"
                    >
                      {/* User Card */}
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-2">
                        <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
                        <div className="text-[11px] text-stone-400 truncate">{user.email}</div>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            isAdmin 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {user.role === 'admin' ? authT.adminRole : authT.investorRole}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">KYC Verified</span>
                        </div>
                      </div>

                      {/* Google Email Verification Status Badge */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          openGoogleVerifyModal();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[11px] mb-2 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium">Google Email Verified</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-mono">
                          Confirmed
                        </span>
                      </button>

                      {/* Navigation links based on actual role */}
                      <div className="space-y-1 text-xs">
                        {isAdmin ? (
                          <button
                            onClick={() => handleNavClick('admin')}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.nav.adminConsole}</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleNavClick('dashboard')}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <Layers className="w-3.5 h-3.5 text-amber-400" />
                              <span>{t.nav.dashboard}</span>
                            </button>
                            <button
                              onClick={() => handleNavClick('profile')}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <User className="w-3.5 h-3.5 text-stone-400" />
                              <span>{navItem.profile}</span>
                            </button>
                            <button
                              onClick={() => handleNavClick('documents')}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-stone-400" />
                              <span>{navItem.documents}</span>
                            </button>
                          </>
                        )}

                        <div className="pt-2 border-t border-white/10 space-y-1">
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              openEmailModal();
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer font-medium"
                          >
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-amber-400" />
                              <span>Registration Email Audit</span>
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 rounded font-mono">
                              Live
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              openAuthModal(user.role === 'admin' ? 'investor' : 'admin');
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <span>{authT.switchAccount}</span>
                            <LogIn className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer font-medium"
                          >
                            <span>{authT.signOut}</span>
                            <LogOut className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Public / Unauthenticated Sign In CTA */
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  onClick={() => openAuthModal('investor')}
                  className="sm:hidden p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title={authT.signIn}
                  aria-label="Sign In"
                >
                  <LogIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openAuthModal('investor')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-500" />
                  <span>{authT.signIn}</span>
                </button>
                <button
                  onClick={() => openAuthModal('investor')}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
                >
                  <span>{authT.openAccount}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-gray-300 hover:text-white cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 max-h-[82vh] overflow-y-auto overflow-x-hidden"
          >
            {/* Authenticated user mobile indicator */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0f0f0f] border border-white/10">
                  <div className="min-w-0 flex-1 mr-2">
                    <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
                    <div className="text-[10px] text-amber-500 font-mono uppercase flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{user.role === 'admin' ? authT.adminRole : authT.investorRole}</span>
                      <span className="text-stone-500">•</span>
                      <span className="truncate text-stone-400">{user.depositoryAccountId || user.id.slice(0, 10)}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>{authT.signOut}</span>
                  </button>
                </div>

                {/* Mobile Cleared Cash Balance Card for Investors */}
                {isInvestor && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[9px] text-amber-400/80 uppercase font-mono tracking-wider block">Available Cleared Balance</span>
                        <span className="font-mono text-sm font-bold text-white">
                          ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick('deposit')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Deposit
                    </button>
                  </div>
                )}

                {/* Email Verification / Audit link */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openEmailModal();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-[11px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-all cursor-pointer font-medium"
                >
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Registration Email Audit Inspector</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 font-mono">
                    Live Record
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('investor');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-500" />
                  <span>{authT.signIn}</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('investor');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <span>{authT.openAccount}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Navigation links based on role */}
            <div className="pt-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500 px-1 mb-1.5 font-bold">
                {isAdmin ? 'Administrative Consoles' : isInvestorView ? 'Investor Portals' : 'Institutional Platform'}
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className={`text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between min-w-0 ${
                        currentRoute === 'admin' 
                          ? 'bg-amber-500 text-black font-bold' 
                          : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                      }`}
                    >
                      <span className="truncate">{t.nav.adminConsole}</span>
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 ml-1" />
                    </button>
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'dashboard' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.dashboard}
                    </button>
                    <button
                      onClick={() => handleNavClick('home')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'home' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.home}
                    </button>
                  </>
                ) : isInvestorView ? (
                  <>
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'dashboard' ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.dashboard.title}
                    </button>
                    <button
                      onClick={() => handleNavClick('deposit')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors font-semibold min-w-0 truncate ${
                        currentRoute === 'deposit' ? 'bg-amber-500 text-black font-bold' : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                      }`}
                    >
                      {t.deposits.title}
                    </button>
                    <button
                      onClick={() => handleNavClick('withdraw')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'withdraw' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.withdrawals.title}
                    </button>
                    <button
                      onClick={() => handleNavClick('investments')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'investments' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.investments}
                    </button>
                    <button
                      onClick={() => handleNavClick('kyc')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'kyc' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {navItem.kyc}
                    </button>
                    <button
                      onClick={() => handleNavClick('transactions')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'transactions' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {navItem.transactions}
                    </button>
                    <button
                      onClick={() => handleNavClick('documents')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'documents' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {navItem.documents}
                    </button>
                    <button
                      onClick={() => handleNavClick('support')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'support' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {navItem.support}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('home')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'home' ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.home}
                    </button>
                    <button
                      onClick={() => handleNavClick('investments')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'investments' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.investments}
                    </button>
                    <button
                      onClick={() => handleNavClick('how_it_works')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'how_it_works' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.howItWorks}
                    </button>
                    <button
                      onClick={() => handleNavClick('pricing')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'pricing' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.pricing}
                    </button>
                    <button
                      onClick={() => handleNavClick('education')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'education' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.education}
                    </button>
                    <button
                      onClick={() => handleNavClick('security')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'security' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.security}
                    </button>
                    <button
                      onClick={() => handleNavClick('about')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'about' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.about}
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className={`text-left px-3 py-2 rounded-xl transition-colors min-w-0 truncate ${
                        currentRoute === 'contact' ? 'bg-white/10 text-white font-semibold' : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {t.nav.contact}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Footer Translation & Clearance */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsTranslateModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Google Translate Engine</span>
              </button>
              <div className="flex items-center gap-1 font-mono text-[10px] text-stone-500">
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span>256-Bit SSL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Cloud Translation Engine Modal */}
      <GoogleTranslateModal 
        isOpen={isTranslateModalOpen} 
        onClose={() => setIsTranslateModalOpen(false)} 
      />
    </header>
  );
};
