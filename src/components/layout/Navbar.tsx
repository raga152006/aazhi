import React, { useState } from 'react';
import {
  Search,
  Mic,
  Bell,
  Eye,
  Volume2,
  VolumeX,
  Languages,
  Monitor,
  User,
  ShieldCheck,
  Menu,
  X,
  Type,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility, Language, FontSize } from '../../context/AccessibilityContext';
import { mockNotifications } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const { userRole, userProfile, navigate, currentView } = useAuth();
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    simpleLanguage,
    toggleSimpleLanguage,
    openVoiceAssistant,
    toggleKioskMode,
    isKioskMode,
    speakText,
    stopSpeech,
    isSpeaking,
    t
  } = useAccessibility();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('schemes');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
      {/* Top Accessibility & Language Bar */}
      <div className="bg-brand-950 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Official Citizen Gateway
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">Toll-Free Helpdesk: <strong>1800-425-2026</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {/* Text Size Scale Toggle */}
          <div className="flex items-center bg-brand-900 rounded border border-slate-700 p-0.5">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded font-medium ${fontSize === 'normal' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Normal Text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded font-medium ${fontSize === 'large' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Large Text (+15%)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded font-medium ${fontSize === 'xlarge' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Extra Large Text (+30%)"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition ${
              highContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-brand-900 text-slate-200 hover:bg-brand-800'
            }`}
            title="Toggle High Contrast (WCAG AAA)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{highContrast ? 'High Contrast ON' : 'High Contrast'}</span>
          </button>

          {/* Plain Language Mode */}
          <button
            onClick={toggleSimpleLanguage}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition ${
              simpleLanguage ? 'bg-saffron-600 text-white font-semibold' : 'bg-brand-900 text-slate-300 hover:text-white'
            }`}
            title="Toggle Simplified Plain Language explanations"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{simpleLanguage ? 'Simple Mode ON' : 'Simple Mode'}</span>
          </button>

          {/* Audio Reader Toggle */}
          <button
            onClick={() => isSpeaking ? stopSpeech() : speakText("Welcome to Aazhi. Your Gateway to Government Services & Benefits. You can discover schemes, manage documents, and apply online.")}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition ${
              isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-brand-900 text-slate-300 hover:text-white'
            }`}
            title="Screen Reader Audio Output"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-brand-900 rounded border border-slate-700 px-1.5 py-0.5 text-xs text-slate-200">
            <Languages className="w-3.5 h-3.5 text-saffron-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-100 font-medium focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-brand-900 text-slate-100">English</option>
              <option value="ta" className="bg-brand-900 text-slate-100">தமிழ்</option>
              <option value="hi" className="bg-brand-900 text-slate-100">हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white flex items-center justify-center font-bold text-xl shadow-md border border-brand-700 relative overflow-hidden group">
            <span className="relative z-10 tracking-tight">ஆ</span>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-saffron-500 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-emeraldGov-500 rounded-tr-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider text-brand-950">AAZHI</span>
              <span className="bg-emeraldGov-50 text-emeraldGov-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emeraldGov-200">
                AI CITIZEN GATEWAY
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Global Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes, e-Sevai, Aadhaar, scholarships..."
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="button"
              onClick={openVoiceAssistant}
              className="absolute right-2.5 top-2 p-0.5 rounded-lg text-slate-400 hover:text-brand-700 hover:bg-slate-200 transition"
              title="Voice Search"
            >
              <Mic className="w-4 h-4 text-saffron-600" />
            </button>
          </div>
        </form>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Ask Aazhi AI Button */}
          <button
            onClick={() => navigate('assistant')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition shadow-sm ${
              currentView === 'assistant'
                ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white ring-2 ring-saffron-500'
                : 'bg-gradient-to-r from-brand-900 to-brand-800 text-white hover:from-brand-800 hover:to-brand-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-saffron-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t('ask_aazhi')}</span>
          </button>

          {/* Voice Assistant Trigger */}
          <button
            onClick={openVoiceAssistant}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-saffron-50 border border-saffron-200 text-saffron-700 font-semibold text-xs hover:bg-saffron-100 transition"
            title="Voice Assistant Mode"
          >
            <Mic className="w-4 h-4 text-saffron-600" />
            <span>🎙 Voice</span>
          </button>

          {/* Kiosk Mode Toggle Button */}
          <button
            onClick={toggleKioskMode}
            className={`p-2 rounded-xl border transition ${
              isKioskMode ? 'bg-saffron-600 text-white border-saffron-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Toggle Kiosk Touchscreen Mode"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Card Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4 text-brand-700" /> Citizen Notifications
                  </h4>
                  <button
                    onClick={() => navigate('notifications')}
                    className="text-xs font-semibold text-brand-700 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {mockNotifications.map(n => (
                    <div key={n.id} className={`p-2.5 rounded-xl border text-xs ${n.read ? 'bg-slate-50 border-slate-100' : 'bg-brand-50/60 border-brand-200'}`}>
                      <p className="font-bold text-slate-900">{n.title}</p>
                      <p className="text-slate-600 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Citizen Profile Avatar Button */}
          <button
            onClick={() => navigate(userRole === 'guest' ? 'auth' : 'profile')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-900 text-white font-bold text-xs flex items-center justify-center">
              {userRole === 'guest' ? <User className="w-4 h-4" /> : userProfile.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {userRole === 'guest' ? 'Guest Citizen' : userProfile.name}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {userRole === 'guest' ? 'Click to Login' : 'TN Resident'}
              </p>
            </div>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          <button onClick={() => { navigate('dashboard'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            🏠 Citizen Dashboard
          </button>
          <button onClick={() => { navigate('assistant'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm text-saffron-700">
            🤖 Ask Aazhi AI Assistant
          </button>
          <button onClick={() => { navigate('schemes'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            📜 Discover Schemes
          </button>
          <button onClick={() => { navigate('recommendations'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            ⭐ Recommendations (95% Match)
          </button>
          <button onClick={() => { navigate('services'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            🏛 Government Services
          </button>
          <button onClick={() => { navigate('centres'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            📍 Nearby Service Centres
          </button>
          <button onClick={() => { navigate('documents'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            📁 Document Vault
          </button>
          <button onClick={() => { navigate('tracking'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium text-sm">
            📝 Application Tracking
          </button>
        </div>
      )}
    </header>
  );
};
