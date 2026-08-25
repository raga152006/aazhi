import React from 'react';
import { Home, Mic, Volume2, Monitor, ArrowLeft } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { KioskHome } from './KioskHome';

export const KioskLayout: React.FC = () => {
  const { toggleKioskMode, openVoiceAssistant, speakText } = useAccessibility();
  const { currentView, navigate } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Touch Kiosk Bar */}
      <header className="flex items-center justify-between border-b-2 border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-700 to-saffron-600 font-extrabold text-3xl text-white flex items-center justify-center border-2 border-saffron-500 shadow-2xl">
            ஆ
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white">AAZHI KIOSK</h1>
            <p className="text-sm text-saffron-400 font-bold">Public Citizen Service Touchscreen Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Audio Help Button */}
          <button
            onClick={() => speakText("Welcome to Aazhi Touchscreen Kiosk. Tap any large option button on screen to find schemes, government services, or nearby centres.")}
            className="px-6 py-4 rounded-2xl bg-brand-900 border-2 border-brand-700 text-white font-extrabold text-base flex items-center gap-2 hover:bg-brand-800 transition active:scale-95 shadow-xl"
          >
            <Volume2 className="w-6 h-6 text-saffron-400" />
            <span>Audio Guidance</span>
          </button>

          {/* Voice Assistant Touch Button */}
          <button
            onClick={openVoiceAssistant}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 text-white font-extrabold text-base flex items-center gap-3 shadow-2xl hover:from-saffron-500 hover:to-amber-500 transition active:scale-95"
          >
            <Mic className="w-7 h-7 text-white animate-pulse" />
            <span>TALK TO AAZHI</span>
          </button>

          {/* Exit Kiosk Button */}
          <button
            onClick={toggleKioskMode}
            className="px-5 py-4 rounded-2xl bg-slate-900 border-2 border-slate-700 text-slate-400 hover:text-white font-bold text-sm"
            title="Exit Touchscreen Kiosk Mode"
          >
            <Monitor className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Touch Content */}
      <main className="my-8 flex-1 flex flex-col justify-center">
        <KioskHome />
      </main>

      {/* Touch Footer Controls */}
      <footer className="border-t-2 border-slate-800 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate('dashboard')}
          className="px-8 py-5 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-extrabold text-lg flex items-center gap-3 active:scale-95 shadow-lg"
        >
          <Home className="w-6 h-6 text-emerald-400" />
          <span>HOME</span>
        </button>

        <p className="text-slate-400 font-bold text-sm">
          Touchscreen Touch Targets Optimized • Voice Enabled
        </p>
      </footer>
    </div>
  );
};
