import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole, Scheme, Service, ServiceCentre, Application } from '../types';
import { defaultUserProfile, mockApplications } from '../data/mockData';

export type ViewType =
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'assistant'
  | 'schemes'
  | 'scheme-details'
  | 'recommendations'
  | 'services'
  | 'service-details'
  | 'centres'
  | 'centre-details'
  | 'documents'
  | 'application-flow'
  | 'tracking'
  | 'profile'
  | 'notifications'
  | 'settings';

interface AuthContextType {
  userRole: UserRole;
  userProfile: UserProfile;
  currentView: ViewType;
  selectedSchemeId: string | null;
  selectedServiceId: string | null;
  selectedCentreId: string | null;
  selectedApplicationId: string | null;
  applications: Application[];
  loginAsGuest: () => void;
  loginAsCitizen: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  navigate: (view: ViewType) => void;
  openSchemeDetails: (schemeId: string) => void;
  openServiceDetails: (serviceId: string) => void;
  openCentreDetails: (centreId: string) => void;
  openApplicationTracking: (appId?: string) => void;
  startApplicationForScheme: (schemeId: string) => void;
  addSubmittedApplication: (app: Application) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('citizen'); // Default to citizen logged in for full demo experience
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>('sch_tn_001');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('srv_001');
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>('ctr_tn_001');
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>('AZ-2026-8891');
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const loginAsGuest = () => {
    setUserRole('guest');
    setCurrentView('dashboard');
  };

  const loginAsCitizen = () => {
    setUserRole('citizen');
    setCurrentView('dashboard');
  };

  const logout = () => {
    setUserRole('guest');
    setCurrentView('landing');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  const navigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSchemeDetails = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setCurrentView('scheme-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openServiceDetails = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCentreDetails = (centreId: string) => {
    setSelectedCentreId(centreId);
    setCurrentView('centre-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openApplicationTracking = (appId?: string) => {
    if (appId) setSelectedApplicationId(appId);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startApplicationForScheme = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setCurrentView('application-flow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addSubmittedApplication = (app: Application) => {
    setApplications(prev => [app, ...prev]);
    setSelectedApplicationId(app.id);
    setCurrentView('tracking');
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        userProfile,
        currentView,
        selectedSchemeId,
        selectedServiceId,
        selectedCentreId,
        selectedApplicationId,
        applications,
        loginAsGuest,
        loginAsCitizen,
        logout,
        updateProfile,
        navigate,
        openSchemeDetails,
        openServiceDetails,
        openCentreDetails,
        openApplicationTracking,
        startApplicationForScheme,
        addSubmittedApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
