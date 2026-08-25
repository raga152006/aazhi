import React from 'react';
import { Search, Building2, MapPin, ClipboardList, Bot, ArrowRight, Mic } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const KioskHome: React.FC = () => {
  const { navigate } = useAuth();
  const { openVoiceAssistant, speakText } = useAccessibility();

  const handleTouchOption = (view: string, audioMsg: string) => {
    speakText(audioMsg);
    navigate(view as any);
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Welcome to Aazhi Touch Kiosk
        </h2>
        <p className="text-xl font-bold text-saffron-400">
          What do you need help with today? Tap an option below:
        </p>
      </div>

      {/* GIANT TOUCH TARGET BUTTON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Find a Scheme */}
        <button
          onClick={() => handleTouchOption('schemes', "Opening scheme search directory.")}
          className="bg-gradient-to-br from-brand-900 to-brand-950 border-4 border-brand-700 hover:border-saffron-500 rounded-3xl p-8 text-left space-y-4 shadow-2xl transition active:scale-95 group min-h-[220px] flex flex-col justify-between"
        >
          <div className="w-16 h-16 rounded-2xl bg-saffron-500 text-white flex items-center justify-center font-bold shadow-lg">
            <Search className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white group-hover:text-saffron-400 transition">Find a Scheme</h3>
            <p className="text-sm text-slate-300 mt-1 font-medium">Explore scholarships, pensions & agricultural grants.</p>
          </div>
        </button>

        {/* Card 2: Government Services */}
        <button
          onClick={() => handleTouchOption('services', "Opening government services guide.")}
          className="bg-gradient-to-br from-brand-900 to-brand-950 border-4 border-brand-700 hover:border-emerald-500 rounded-3xl p-8 text-left space-y-4 shadow-2xl transition active:scale-95 group min-h-[220px] flex flex-col justify-between"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
            <Building2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition">Government Services</h3>
            <p className="text-sm text-slate-300 mt-1 font-medium">Aadhaar updates, Income & Community Certificates.</p>
          </div>
        </button>

        {/* Card 3: Find Nearby Centre */}
        <button
          onClick={() => handleTouchOption('centres', "Opening nearby service centre locator.")}
          className="bg-gradient-to-br from-brand-900 to-brand-950 border-4 border-brand-700 hover:border-amber-500 rounded-3xl p-8 text-left space-y-4 shadow-2xl transition active:scale-95 group min-h-[220px] flex flex-col justify-between"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-lg">
            <MapPin className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition">Find Nearby Centre</h3>
            <p className="text-sm text-slate-300 mt-1 font-medium">Locate e-Sevai & Aadhaar Seva Kendra by PIN code.</p>
          </div>
        </button>

        {/* Card 4: My Applications */}
        <button
          onClick={() => handleTouchOption('tracking', "Opening application tracking monitor.")}
          className="bg-gradient-to-br from-brand-900 to-brand-950 border-4 border-brand-700 hover:border-purple-500 rounded-3xl p-8 text-left space-y-4 shadow-2xl transition active:scale-95 group min-h-[220px] flex flex-col justify-between"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-lg">
            <ClipboardList className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white group-hover:text-purple-400 transition">My Applications</h3>
            <p className="text-sm text-slate-300 mt-1 font-medium">Track your submitted application status in real-time.</p>
          </div>
        </button>

        {/* Card 5: Talk to Aazhi (Spans 2 cols) */}
        <button
          onClick={openVoiceAssistant}
          className="md:col-span-2 bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-600 border-4 border-saffron-400 rounded-3xl p-8 text-left space-y-4 shadow-2xl transition active:scale-95 group min-h-[220px] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 rounded-2xl bg-white text-saffron-700 flex items-center justify-center font-bold shadow-lg">
              <Bot className="w-10 h-10 animate-bounce" />
            </div>
            <span className="bg-white/20 text-white text-sm font-extrabold px-4 py-1.5 rounded-full border border-white/30">
              VOICE FIRST AI
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">Talk to Aazhi AI Assistant</h3>
            <p className="text-base text-white/90 mt-1 font-bold">Speak naturally to find schemes, verify eligibility, or ask any question!</p>
          </div>
        </button>
      </div>
    </div>
  );
};
