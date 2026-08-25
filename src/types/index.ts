export type UserRole = 'guest' | 'citizen' | 'kiosk';

export interface UserProfile {
  id: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  aadhaarNumber: string;
  state: string;
  district: string;
  pincode: string;
  address: string;
  education: string;
  studentStatus: boolean;
  firstGraduate: boolean;
  institutionName?: string;
  courseName?: string;
  occupation: string;
  employmentStatus: string;
  familyIncome: number; // annual in INR
  socialCategory: string; // BC, MBC, SC, ST, General
  disabilityStatus: boolean;
  disabilityType?: string;
  languagePreference: 'en' | 'ta' | 'hi';
  accessibility: {
    fontSize: 'normal' | 'large' | 'xlarge';
    highContrast: boolean;
    voiceAssistant: boolean;
    simpleLanguage: boolean;
  };
}

export interface Scheme {
  id: string;
  title: string;
  department: string;
  category: 'Education' | 'Employment' | 'Agriculture' | 'Women' | 'Senior Citizens' | 'Health' | 'Housing' | 'Financial Assistance' | 'Disability' | 'Entrepreneurship' | 'Welfare';
  shortDescription: string;
  overview: string;
  benefits: {
    financial?: string;
    nonFinancial?: string;
    summary: string;
  };
  eligibility: {
    state: string[];
    minIncome?: number;
    maxIncome?: number;
    educationRequired?: string[];
    mustBeStudent?: boolean;
    mustBeFirstGraduate?: boolean;
    socialCategories?: string[];
    minAge?: number;
    maxAge?: number;
    genderRequired?: string;
    criteriaList: { text: string; satisfied?: boolean }[];
  };
  requiredDocuments: {
    id: string;
    name: string;
    mandatory: boolean;
  }[];
  applicationSteps: string[];
  officialSourceUrl: string;
  lastUpdated: string;
  matchScore?: number; // 0 - 100 calculated for profile
  matchReasons?: string[];
  matchWarnings?: string[];
  logoIcon?: string;
}

export interface Service {
  id: string;
  name: string;
  department: string;
  category: string;
  shortDescription: string;
  purpose: string;
  whoNeedsThis: string;
  isOnlineAvailable: boolean;
  isOfflineAvailable: boolean;
  fee: string;
  processingTime: string;
  requiredDocuments: string[];
  stepsToApply: string[];
  officialPortalUrl: string;
  iconName: string;
}

export interface ServiceCentre {
  id: string;
  name: string;
  type: 'e-Sevai' | 'Aadhaar Seva Kendra' | 'Taluk Office' | 'CSC (Common Service Centre)' | 'Post Office';
  address: string;
  district: string;
  pincode: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  todayHours: string;
  phone: string;
  servicesAvailable: string[];
  lastUpdatedTimestamp: string;
  isLiveStatus: boolean; // false if scheduled schedule info
  scheduleInfoNote?: string;
}

export interface DocumentItem {
  id: string;
  documentType: 'Aadhaar' | 'Income Certificate' | 'Community Certificate' | 'Bank Passbook' | 'SSLC Marksheet' | 'HSC Marksheet' | 'First Graduate Certificate' | 'Residence Certificate' | 'Disability Certificate' | 'Other';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  expiryDate?: string;
  verificationStatus: 'verified' | 'needs_review' | 'not_verified';
  extractedData?: Record<string, string>;
  confidenceScore?: number;
  filePreviewUrl?: string;
}

export interface Application {
  id: string;
  schemeId?: string;
  schemeTitle: string;
  department: string;
  submittedDate: string;
  lastUpdated: string;
  status: 'draft' | 'submitted' | 'under_review' | 'documents_verified' | 'sanctioned' | 'rejected';
  statusNote: string;
  attachedDocumentIds: string[];
  formData: Record<string, any>;
  timeline: {
    stage: string;
    date: string;
    completed: boolean;
    active?: boolean;
    note?: string;
  }[];
}

export interface OCRResult {
  detectedDocumentType: string;
  confidence: number;
  isMismatch: boolean;
  userSelectedType: string;
  extractedInformation: Record<string, string>;
  rawTextPreview: string;
  recommendationNote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aazhi';
  text: string;
  timestamp: string;
  recommendedSchemes?: Scheme[];
  recommendedServices?: Service[];
  documentChecklist?: { name: string; available: boolean }[];
  sourceReference?: string;
  isProcessing?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'status_update' | 'missing_document' | 'deadline' | 'centre_update';
  read: boolean;
  actionUrl?: string;
}
