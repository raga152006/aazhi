import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';
import { KioskLayout } from './components/kiosk/KioskLayout';

// Views
import { LandingView } from './components/views/LandingView';
import { AuthView } from './components/views/AuthView';
import { DashboardView } from './components/views/DashboardView';
import { AssistantView } from './components/views/AssistantView';
import { SchemeDiscoveryView } from './components/views/SchemeDiscoveryView';
import { SchemeDetailsView } from './components/views/SchemeDetailsView';
import { RecommendationsView } from './components/views/RecommendationsView';
import { ServicesView } from './components/views/ServicesView';
import { ServiceDetailsView } from './components/views/ServiceDetailsView';
import { CentresView } from './components/views/CentresView';
import { CentreDetailsView } from './components/views/CentreDetailsView';
import { DocumentVaultView } from './components/views/DocumentVaultView';
import { ApplicationFlowView } from './components/views/ApplicationFlowView';
import { ApplicationTrackingView } from './components/views/ApplicationTrackingView';
import { ProfileView } from './components/views/ProfileView';
import { NotificationsView } from './components/views/NotificationsView';
import { SettingsView } from './components/views/SettingsView';

const MainAppContent: React.FC = () => {
  const { currentView } = useAuth();
  const { isKioskMode } = useAccessibility();

  if (isKioskMode) {
    return <KioskLayout />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'auth':
        return <AuthView />;
      case 'dashboard':
        return <DashboardView />;
      case 'assistant':
        return <AssistantView />;
      case 'schemes':
        return <SchemeDiscoveryView />;
      case 'scheme-details':
        return <SchemeDetailsView />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'services':
        return <ServicesView />;
      case 'service-details':
        return <ServiceDetailsView />;
      case 'centres':
        return <CentresView />;
      case 'centre-details':
        return <CentreDetailsView />;
      case 'documents':
        return <DocumentVaultView />;
      case 'application-flow':
        return <ApplicationFlowView />;
      case 'tracking':
        return <ApplicationTrackingView />;
      case 'profile':
        return <ProfileView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-20 lg:pb-8">
            {renderView()}
          </main>
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <VoiceAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </AccessibilityProvider>
  );
}
