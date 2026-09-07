import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/shared/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { AdminAccessGuard } from './components/admin/AdminAccessGuard';
import { InvestorAccessGuard } from './components/investor/InvestorAccessGuard';
import { EmailDispatchModal } from './components/shared/EmailDispatchModal';
import { GoogleEmailVerificationModal } from './components/auth/GoogleEmailVerificationModal';

// Public Pages
import { HomePage } from './components/public/HomePage';
import { MarketplacePage } from './components/public/MarketplacePage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { PricingPage } from './components/public/PricingPage';
import { SecurityPage } from './components/public/SecurityPage';
import { EducationPage } from './components/public/EducationPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage } from './components/public/ContactPage';
import { LegalPage } from './components/public/LegalPage';

// Investor Portal Pages
import { InvestorDashboard } from './components/investor/InvestorDashboard';
import { DepositFlow } from './components/investor/DepositFlow';
import { WithdrawalFlow } from './components/investor/WithdrawalFlow';
import { TransactionsPage } from './components/investor/TransactionsPage';
import { KycWizard } from './components/investor/KycWizard';
import { DocumentsPage } from './components/investor/DocumentsPage';
import { ProfileSecurityPage } from './components/investor/ProfileSecurityPage';

// Admin Portal Page
import { AdminControlCenter } from './components/admin/AdminControlCenter';

import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { 
    currentRoute, 
    user, 
    isAuthenticated, 
    isAuthModalOpen, 
    authModalMode,
    closeAuthModal, 
    authModalDefaultRole,
    openAuthModal,
    isEmailModalOpen,
    closeEmailModal,
    lastDispatchedEmail,
    isGoogleVerifyModalOpen,
    closeGoogleVerifyModal
  } = useApp();

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'investments':
      case 'investment_detail':
        return <MarketplacePage />;
      case 'how_it_works':
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'pricing':
        return <PricingPage />;
      case 'security':
        return <SecurityPage />;
      case 'education':
        return <EducationPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
      case 'support':
        return <ContactPage />;
      case 'legal':
        return <LegalPage />;

      // Protected Investor Routes: Require user to have an authenticated account
      case 'dashboard':
      case 'portfolio':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <InvestorDashboard />;
      case 'deposit':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <DepositFlow />;
      case 'withdraw':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <WithdrawalFlow />;
      case 'transactions':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <TransactionsPage />;
      case 'kyc':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <KycWizard />;
      case 'documents':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <DocumentsPage />;
      case 'profile':
        if (!isAuthenticated) {
          return (
            <InvestorAccessGuard 
              onOpenSignIn={() => openAuthModal('signin', 'investor')} 
              onOpenRegister={() => openAuthModal('register', 'investor')} 
            />
          );
        }
        return <ProfileSecurityPage />;

      case 'admin':
        // Strict role-based guard: only authenticated users with admin role can view AdminControlCenter
        if (!isAuthenticated || user.role !== 'admin') {
          return <AdminAccessGuard onOpenAuthModal={() => openAuthModal('signin', 'admin')} />;
        }
        return <AdminControlCenter />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-gray-200 selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Auth Modal for Role-differentiated Login & Registration */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        defaultMode={authModalMode}
        defaultRole={authModalDefaultRole} 
      />

      {/* Institutional Registration Email Verification Modal */}
      <EmailDispatchModal
        isOpen={isEmailModalOpen}
        onClose={closeEmailModal}
        email={lastDispatchedEmail}
      />

      {/* Google Email Verification & Registration Confirmation Modal */}
      <GoogleEmailVerificationModal
        isOpen={isGoogleVerifyModalOpen}
        onClose={closeGoogleVerifyModal}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
