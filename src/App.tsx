import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/shared/ToastContainer';
import { SmartsuppWidget } from './components/support/SmartsuppWidget';
import { AuthModal } from './components/auth/AuthModal';
import { AdminAccessGuard } from './components/admin/AdminAccessGuard';
import { EmailDispatchModal } from './components/shared/EmailDispatchModal';
import { GoogleEmailVerificationModal } from './components/auth/GoogleEmailVerificationModal';
import { SmartsuppConfigModal } from './components/support/SmartsuppConfigModal';

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
    closeAuthModal, 
    authModalDefaultRole,
    openAuthModal,
    isEmailModalOpen,
    closeEmailModal,
    lastDispatchedEmail,
    isGoogleVerifyModalOpen,
    closeGoogleVerifyModal,
    isSmartsuppModalOpen,
    closeSmartsuppModal
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

      case 'dashboard':
      case 'portfolio':
        return <InvestorDashboard />;
      case 'deposit':
        return <DepositFlow />;
      case 'withdraw':
        return <WithdrawalFlow />;
      case 'transactions':
        return <TransactionsPage />;
      case 'kyc':
        return <KycWizard />;
      case 'documents':
        return <DocumentsPage />;
      case 'profile':
        return <ProfileSecurityPage />;

      case 'admin':
        // Strict role-based guard: only authenticated users with admin role can view AdminControlCenter
        if (!isAuthenticated || user.role !== 'admin') {
          return <AdminAccessGuard onOpenAuthModal={() => openAuthModal('admin')} />;
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

      {/* Smartsupp Live Chat Configuration Modal */}
      <SmartsuppConfigModal
        isOpen={isSmartsuppModalOpen}
        onClose={closeSmartsuppModal}
      />

      {/* Smartsupp AI Concierge Widget (Hidden on Admin) */}
      <SmartsuppWidget />
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
