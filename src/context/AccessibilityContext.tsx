import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta' | 'hi';
export type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  language: Language;
  fontSize: FontSize;
  highContrast: boolean;
  simpleLanguage: boolean;
  isVoiceAssistantOpen: boolean;
  isKioskMode: boolean;
  isSpeaking: boolean;
  setLanguage: (lang: Language) => void;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  toggleSimpleLanguage: () => void;
  openVoiceAssistant: () => void;
  closeVoiceAssistant: () => void;
  toggleKioskMode: () => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  t: (key: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Simple multilingual dictionary for essential UI labels
const translations: Record<Language, Record<string, string>> = {
  en: {
    'tagline': 'Your Gateway to Government Services & Benefits',
    'find_schemes': 'Find Schemes',
    'gov_services': 'Government Services',
    'nearby_centres': 'Nearby Centres',
    'my_documents': 'My Documents',
    'my_applications': 'My Applications',
    'ask_aazhi': 'Ask Aazhi AI',
    'kiosk_mode': 'Kiosk Touch Mode',
    'accessibility': 'Accessibility Settings',
    'start_application': 'Start Application',
    'high_contrast': 'High Contrast',
    'text_size': 'Text Size',
    'listen': 'Listen Audio',
  },
  ta: {
    'tagline': 'அரசு சேவைகள் மற்றும் சலுகைகளுக்கான உங்கள் நுழைவாயில்',
    'find_schemes': 'திட்டங்களைக் கண்டறியவும்',
    'gov_services': 'அரசு சேவைகள்',
    'nearby_centres': 'அருகிலுள்ள மையங்கள்',
    'my_documents': 'என் ஆவணங்கள்',
    'my_applications': 'என் விண்ணப்பங்கள்',
    'ask_aazhi': 'ஆழியிடம் கேளுங்கள்',
    'kiosk_mode': 'தொடுதிரை பயன்முறை',
    'accessibility': 'அணுகல்தன்மை அமைப்புகள்',
    'start_application': 'விண்ணப்பத்தைத் தொடங்கவும்',
    'high_contrast': 'உயர் மாறுபாடு',
    'text_size': 'எழுத்து அளவு',
    'listen': 'ஆடியோவைக் கேட்கவும்',
  },
  hi: {
    'tagline': 'सरकारी सेवाओं और लाभों के लिए आपका प्रवेश द्वार',
    'find_schemes': 'योजनाएं खोजें',
    'gov_services': 'सरकारी सेवाएं',
    'nearby_centres': 'निकटतम केंद्र',
    'my_documents': 'मेरे दस्तावेज़',
    'my_applications': 'मेरे आवेदन',
    'ask_aazhi': 'आज़ि से पूछें',
    'kiosk_mode': 'किओस्क टच मोड',
    'accessibility': 'पहुंच योग्य सुविधाएं',
    'start_application': 'आवेदन शुरू करें',
    'high_contrast': 'उच्च कंट्रास्ट',
    'text_size': 'पाठ आकार',
    'listen': 'ऑडियो सुनें',
  },
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [simpleLanguage, setSimpleLanguage] = useState<boolean>(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isKioskMode, setIsKioskMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Apply High Contrast class to body element
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  // Apply Font Size class to body element
  useEffect(() => {
    document.body.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    document.body.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleSimpleLanguage = () => setSimpleLanguage(prev => !prev);
  const openVoiceAssistant = () => setIsVoiceAssistantOpen(true);
  const closeVoiceAssistant = () => setIsVoiceAssistantOpen(false);
  const toggleKioskMode = () => setIsKioskMode(prev => !prev);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#]/g, ''); // strip markdown
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      if (language === 'ta') utterance.lang = 'ta-IN';
      else if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        fontSize,
        highContrast,
        simpleLanguage,
        isVoiceAssistantOpen,
        isKioskMode,
        isSpeaking,
        setLanguage,
        setFontSize,
        toggleHighContrast,
        toggleSimpleLanguage,
        openVoiceAssistant,
        closeVoiceAssistant,
        toggleKioskMode,
        speakText,
        stopSpeech,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within an AccessibilityProvider');
  return context;
};
