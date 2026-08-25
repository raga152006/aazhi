import React from 'react';
import { Eye, Volume2, Type, Languages, ShieldCheck, Monitor, CheckCircle2 } from 'lucide-react';
import { useAccessibility, Language, FontSize } from '../../context/AccessibilityContext';

export const SettingsView: React.FC = () => {
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    simpleLanguage,
    toggleSimpleLanguage,
    toggleKioskMode,
    isKioskMode,
    speakText,
  } = useAccessibility();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800">
        <h1 className="text-2xl font-extrabold">Settings & Accessibility Controls</h1>
        <p className="text-xs text-slate-300 mt-1">Configure language preferences, high-contrast visual modes, font scaling, and voice output.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        {/* Language Selection */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Languages className="w-4 h-4 text-saffron-600" /> Preferred Citizen Language
            </h3>
            <p className="text-xs text-slate-500">Applies across scheme titles, AI answers, and voice speech.</p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs text-brand-900 focus:ring-2 focus:ring-brand-600"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </div>

        {/* Text Scaling */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-600" /> Text Size Scaling
            </h3>
            <p className="text-xs text-slate-500">Increases font readability across all pages.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${fontSize === 'normal' ? 'bg-brand-900 text-white' : 'text-slate-700'}`}
            >
              Normal (100%)
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${fontSize === 'large' ? 'bg-brand-900 text-white' : 'text-slate-700'}`}
            >
              Large (+15%)
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${fontSize === 'xlarge' ? 'bg-brand-900 text-white' : 'text-slate-700'}`}
            >
              Extra Large (+30%)
            </button>
          </div>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-600" /> WCAG AAA High Contrast Visual Mode
            </h3>
            <p className="text-xs text-slate-500">Inverts theme to high-contrast black and vibrant yellow for low-vision users.</p>
          </div>
          <button
            onClick={toggleHighContrast}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
              highContrast ? 'bg-yellow-400 text-black border-2 border-black font-extrabold' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {highContrast ? 'High Contrast ON' : 'Turn ON'}
          </button>
        </div>

        {/* Plain Language Mode */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Simplified Plain Language Mode
            </h3>
            <p className="text-xs text-slate-500">Replaces complex legal jargon with simple plain-language summaries.</p>
          </div>
          <button
            onClick={toggleSimpleLanguage}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
              simpleLanguage ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {simpleLanguage ? 'Simple Mode ON' : 'Turn ON'}
          </button>
        </div>

        {/* Touchscreen Kiosk Mode */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4 text-saffron-600" /> Public Touchscreen Kiosk Layout
            </h3>
            <p className="text-xs text-slate-500">Enables high-touch large buttons for public kiosk terminals.</p>
          </div>
          <button
            onClick={toggleKioskMode}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
              isKioskMode ? 'bg-saffron-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {isKioskMode ? 'Kiosk ON' : 'Switch to Kiosk'}
          </button>
        </div>
      </div>
    </div>
  );
};
