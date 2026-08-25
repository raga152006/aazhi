import { mockSchemes, mockServices, mockCentres, mockDocuments, mockApplications, defaultUserProfile } from '../data/mockData';
import { Scheme, Service, ServiceCentre, DocumentItem, Application, OCRResult, UserProfile, ChatMessage } from '../types';

// Simulated API delay for smooth realistic UI state loading
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const API = {
  // --- SCHEMES ---
  async getSchemes(filters?: {
    search?: string;
    category?: string;
    state?: string;
    minIncome?: number;
    maxIncome?: number;
    education?: string;
  }): Promise<Scheme[]> {
    await delay(200);
    let result = [...mockSchemes];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    if (filters?.category && filters.category !== 'All') {
      result = result.filter(s => s.category === filters.category);
    }

    if (filters?.maxIncome) {
      const maxInc = filters.maxIncome;
      result = result.filter(s => !s.eligibility.maxIncome || s.eligibility.maxIncome >= maxInc);
    }

    return result;
  },

  async getSchemeById(id: string): Promise<Scheme | undefined> {
    await delay(150);
    return mockSchemes.find(s => s.id === id);
  },

  async getRecommendations(profile: UserProfile): Promise<Scheme[]> {
    await delay(350);
    // Calculate custom match score based on user profile (e.g. Ramesh Kumar)
    return mockSchemes.map(scheme => {
      let score = scheme.matchScore || 70;

      // Check income
      if (scheme.eligibility.maxIncome && profile.familyIncome <= scheme.eligibility.maxIncome) {
        score += 5;
      }
      // Check first graduate
      if (scheme.eligibility.mustBeFirstGraduate && profile.firstGraduate) {
        score += 10;
      }
      // Check student
      if (scheme.eligibility.mustBeStudent && profile.studentStatus) {
        score += 5;
      }

      score = Math.min(100, Math.max(20, score));

      return {
        ...scheme,
        matchScore: score,
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  },

  // --- SERVICES ---
  async getServices(query?: string): Promise<Service[]> {
    await delay(200);
    if (!query) return mockServices;
    const q = query.toLowerCase();
    return mockServices.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  },

  async getServiceById(id: string): Promise<Service | undefined> {
    await delay(150);
    return mockServices.find(s => s.id === id);
  },

  // --- SERVICE CENTRES / OFFICES ---
  async getCentres(locationQuery?: string, filterType?: string): Promise<ServiceCentre[]> {
    await delay(300);
    let result = [...mockCentres];

    if (filterType && filterType !== 'All') {
      result = result.filter(c => c.type === filterType || c.servicesAvailable.some(s => s.toLowerCase().includes(filterType.toLowerCase())));
    }

    if (locationQuery) {
      const q = locationQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.pincode.includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    }

    return result;
  },

  async getCentreById(id: string): Promise<ServiceCentre | undefined> {
    await delay(150);
    return mockCentres.find(c => c.id === id);
  },

  // --- DOCUMENTS ---
  async getDocuments(): Promise<DocumentItem[]> {
    await delay(200);
    return mockDocuments;
  },

  async uploadDocumentOCR(file: File, selectedType: string): Promise<OCRResult> {
    await delay(1500); // Realistic OCR analysis delay

    const fileName = file.name.toLowerCase();
    let detectedType = selectedType;
    let isMismatch = false;
    let confidence = 96;

    // Detect mismatch simulation:
    if (selectedType === 'Aadhaar' && (fileName.includes('income') || fileName.includes('salary') || fileName.includes('tahsildar'))) {
      detectedType = 'Income Certificate';
      isMismatch = true;
      confidence = 94;
    } else if (selectedType === 'Income Certificate' && (fileName.includes('aadhaar') || fileName.includes('uidai'))) {
      detectedType = 'Aadhaar';
      isMismatch = true;
      confidence = 97;
    }

    const extractedInformation: Record<string, string> = {};

    if (detectedType === 'Aadhaar') {
      extractedInformation['Full Name'] = 'Ramesh Kumar';
      extractedInformation['Date of Birth'] = '14/05/2003';
      extractedInformation['Gender'] = 'Male';
      extractedInformation['Aadhaar Number'] = 'XXXX-XXXX-8921';
      extractedInformation['Address'] = '42 Kamarajar Salai, Triplicane, Chennai - 600005';
    } else if (detectedType === 'Income Certificate') {
      extractedInformation['Certificate Number'] = 'TN-72026071588';
      extractedInformation['Applicant Name'] = 'Ramesh Kumar';
      extractedInformation['Annual Family Income'] = '₹90,000';
      extractedInformation['Issuing Officer'] = 'Tahsildar, Triplicane Taluk';
      extractedInformation['Valid Until'] = '14/07/2027';
    } else if (detectedType === 'First Graduate Certificate') {
      extractedInformation['Certificate No'] = 'FG-TN-2026-9921';
      extractedInformation['Applicant'] = 'Ramesh Kumar';
      extractedInformation['Status'] = 'First University Graduate in Family';
      extractedInformation['Authority'] = 'Revenue Department, Govt of Tamil Nadu';
    } else {
      extractedInformation['Document Title'] = selectedType;
      extractedInformation['Scanned Holder'] = 'Ramesh Kumar';
      extractedInformation['Status'] = 'Verified';
    }

    return {
      detectedDocumentType: detectedType,
      confidence,
      isMismatch,
      userSelectedType: selectedType,
      extractedInformation,
      rawTextPreview: `GOVERNMENT OF TAMIL NADU\nREVENUE DEPARTMENT\nDocument Holder: Ramesh Kumar\nDoc Reference ID: 2026/TN/8921\nVerified by Digital Signature Desk`,
      recommendationNote: isMismatch
        ? `Document Mismatch Alert: You selected "${selectedType}", but OCR detected a "${detectedType}" with ${confidence}% confidence.`
        : `Document verified successfully with ${confidence}% OCR confidence score.`,
    };
  },

  // --- APPLICATIONS ---
  async getApplications(): Promise<Application[]> {
    await delay(200);
    return mockApplications;
  },

  async submitApplication(schemeId: string, formData: any, documentIds: string[]): Promise<Application> {
    await delay(800);
    const scheme = mockSchemes.find(s => s.id === schemeId);
    const newId = `AZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: Application = {
      id: newId,
      schemeId,
      schemeTitle: scheme ? scheme.title : 'Government Application',
      department: scheme ? scheme.department : 'Revenue Department',
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'submitted',
      statusNote: 'Application submitted successfully. Instant digital receipt generated.',
      attachedDocumentIds: documentIds,
      formData,
      timeline: [
        { stage: 'Application Started', date: 'Today', completed: true },
        { stage: 'Documents Auto-attached from Vault', date: 'Today', completed: true },
        { stage: 'Submitted & Digital Receipt Generated', date: 'Today', completed: true, active: true },
        { stage: 'Departmental Verification', date: 'Estimated 2 days', completed: false },
        { stage: 'Benefit Disbursement', date: 'Estimated 7 days', completed: false },
      ],
    };

    mockApplications.unshift(newApp);
    return newApp;
  },

  // --- AI ASSISTANT CHAT ENGINE ---
  async askAssistant(userText: string, profile: UserProfile): Promise<ChatMessage> {
    await delay(900); // AI thinking delay
    const lower = userText.toLowerCase();

    // Check for Tamil Nadu student / First Graduate / Income query
    if (lower.includes('first graduate') || lower.includes('engineering') || lower.includes('student') || lower.includes('scholarship') || lower.includes('income')) {
      const topSchemes = mockSchemes.filter(s => s.category === 'Education' || s.category === 'Employment');
      return {
        id: `msg_${Date.now()}`,
        sender: 'aazhi',
        text: `Based on your profile as an engineering student in Tamil Nadu with family income ₹90,000, I found **3 highly relevant schemes** you are eligible for:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedSchemes: topSchemes,
        documentChecklist: [
          { name: 'Aadhaar Card', available: true },
          { name: 'Income Certificate (₹90,000)', available: true },
          { name: 'SSLC / HSC Marksheet', available: true },
          { name: 'First Graduate Certificate', available: false },
        ],
        sourceReference: 'Official Directorate of Technical Education (DTE TN) Gazette 2026',
      };
    }

    // Check for Aadhaar service query
    if (lower.includes('aadhaar') || lower.includes('biometric') || lower.includes('update')) {
      const aadhaarService = mockServices.filter(s => s.name.includes('Aadhaar'));
      return {
        id: `msg_${Date.now()}`,
        sender: 'aazhi',
        text: `I identified the **Aadhaar Enrolment & Biometric Update Service**. You can update your demographic details online or visit a nearby Aadhaar Seva Kendra for mandatory biometric updates.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedServices: aadhaarService,
        documentChecklist: [
          { name: 'Proof of Identity (Aadhaar / Voter ID / Passport)', available: true },
          { name: 'Proof of Address (Utility Bill / Ration Card)', available: true },
        ],
        sourceReference: 'UIDAI Portal & MyAadhaar Portal (myaadhaar.uidai.gov.in)',
      };
    }

    // Check for centre query
    if (lower.includes('centre') || lower.includes('near me') || lower.includes('e-sevai') || lower.includes('pincode')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'aazhi',
        text: `I located **3 active service centres** near your registered location in Triplicane, Chennai (600005):`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReference: 'Tamil Nadu e-Governance Agency (TNeGA) Centre Directory',
      };
    }

    // Check for tracking query
    if (lower.includes('track') || lower.includes('status') || lower.includes('application')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'aazhi',
        text: `Your active application **AZ-2026-8891** (*Post-Matric Scholarship for First Graduate Engineering Students*) is currently **Under Review** at Tahsildar Desk. Status note: "Approved by Tahsildar Desk on 22 Aug 2026."`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReference: 'TN e-District Application Tracking Server',
      };
    }

    // Default friendly assistant response
    return {
      id: `msg_${Date.now()}`,
      sender: 'aazhi',
      text: `Hello ${profile.name}! I can help you discover government schemes, check your eligibility, attach documents from your vault, auto-fill application forms, or find nearby e-Sevai & Aadhaar centres. What would you like assistance with today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: 'Aazhi Citizen Knowledge Engine v2.4',
    };
  }
};
