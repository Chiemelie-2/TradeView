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
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    markNotificationAsRead
  } = useApp();

  const pageT = pageTranslations[language] || pageTranslations.en;
  const authT = pageT.auth;
  const invT = pageT.investorPages;

  const [isLangOpen, setIsLangOpen] = useState(false);
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
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 text-gray-200">
      {/* Top Advisory / Institutional Custody Bar */}
      <div className={`border-b text-xs py-1.5 px-4 transition-colors ${
        isAdmin 
          ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' 
          : 'bg-[#050505] border-white/5 text-gray-400'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
            <span className="font-mono text-[11px] text-gray-300">
              {isAdmin ? 'ADMINISTRATIVE AUDIT CONSOLE' : 'TRADEVERGE SECURE LEDGER v1.0.0'}
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-[11px] text-gray-400">
              {isAdmin 
                ? 'Treasury & Depository Reserves Clearance' 
                : 'Segregated Depository Reserves Reconciled & Audited'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-amber-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">
                {isAdmin ? 'Clearance Level 4: Marcus Vance (CCO)' : 'Tier 1 Institutional Custody'}
              </span>
            </div>

            {isAdmin ? (
              <button
                onClick={logout}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                title="Exit Admin Console and Sign Out"
              >
                <LogOut className="w-2.5 h-2.5" />
                <span>Exit Admin</span>
              </button>
            ) : isAuthenticated ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <BadgeCheck className="w-3 h-3" />
                <span>Verified Account: {user.fullName.split(' ')[0]}</span>
              </span>
            ) : (
              <button
                onClick={() => openAuthModal('investor')}
                className="text-[10px] font-mono text-stone-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Lock className="w-2.5 h-2.5 text-amber-500" />
                <span>Client Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick(isAdmin ? 'admin' : 'home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-black font-black shadow-md group-hover:bg-amber-400 transition-colors">
              <span className="font-serif font-black text-sm text-black tracking-wider">TV</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white uppercase italic group-hover:text-amber-400 transition-colors">
                  TradeVerge<span className="text-amber-500">.live</span>
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
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
                  {invT.transactions}
                </button>
                <button
                  onClick={() => handleNavClick('kyc')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'kyc' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {invT.kyc}
                </button>
                <button
                  onClick={() => handleNavClick('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentRoute === 'documents' ? 'text-amber-500 font-medium bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {invT.documents}
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
          <div className="flex items-center gap-2.5">
            {/* Cleared Cash Badge (if investor view) */}
            {isInvestor && (
              <div 
                onClick={() => handleNavClick('deposit')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 text-xs cursor-pointer hover:border-amber-500/40 transition-all"
                title="Click to Deposit Funds"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-500" />
                <div>
                  <span className="text-[10px] text-gray-500 block leading-none uppercase tracking-wider">Cleared Cash</span>
                  <span className="font-mono font-semibold text-white text-xs">
                    ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            {/* 10-Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/20 text-xs font-medium transition-all text-gray-200 cursor-pointer"
                aria-label="Select Language"
              >
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="font-medium tracking-wide uppercase">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell (for authenticated users) */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
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
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl"
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
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-white/25 text-xs transition-all cursor-pointer"
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
                      className="absolute right-0 mt-2 w-64 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl"
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
                              <span>{invT.profile}</span>
                            </button>
                            <button
                              onClick={() => handleNavClick('documents')}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-stone-400" />
                              <span>{invT.documents}</span>
                            </button>
                          </>
                        )}

                        <div className="pt-2 border-t border-white/10 space-y-1">
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('investor')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-500" />
                  <span>{authT.signIn}</span>
                </button>
                <button
                  onClick={() => openAuthModal('investor')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <span>{authT.openAccount}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#0f0f0f] border border-white/10 text-gray-300 hover:text-white cursor-pointer"
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
            className="lg:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-3 pb-6 space-y-3"
          >
            {/* Authenticated user mobile indicator */}
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0f0f0f] border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white">{user.fullName}</div>
                  <div className="text-[10px] text-amber-500 font-mono uppercase">
                    {user.role === 'admin' ? authT.adminRole : authT.investorRole}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-semibold px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-rose-400 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{authT.signOut}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('investor');
                  }}
                  className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white text-center"
                >
                  {authT.signIn}
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('investor');
                  }}
                  className="py-2 px-3 rounded-xl bg-amber-500 text-black text-xs font-bold text-center"
                >
                  {authT.openAccount}
                </button>
              </div>
            )}

            {/* Navigation links based on role */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="text-left px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-semibold"
                  >
                    {t.nav.adminConsole}
                  </button>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.nav.dashboard}
                  </button>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.nav.home}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.nav.home}
                  </button>
                  <button
                    onClick={() => handleNavClick('investments')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.nav.investments}
                  </button>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.nav.dashboard}
                  </button>
                  <button
                    onClick={() => handleNavClick('deposit')}
                    className="text-left px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold"
                  >
                    {t.deposits.title}
                  </button>
                  <button
                    onClick={() => handleNavClick('withdraw')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {t.withdrawals.title}
                  </button>
                  <button
                    onClick={() => handleNavClick('kyc')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {invT.kyc}
                  </button>
                  <button
                    onClick={() => handleNavClick('transactions')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {invT.transactions}
                  </button>
                  <button
                    onClick={() => handleNavClick('documents')}
                    className="text-left px-3 py-2 rounded-xl bg-white/5 text-gray-200"
                  >
                    {invT.documents}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
