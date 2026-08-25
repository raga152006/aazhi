import React from 'react';
import { Building2, MapPin, FileText, ExternalLink, ArrowRight, ShieldAlert, Volume2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { mockServices } from '../../data/mockData';

export const ServiceDetailsView: React.FC = () => {
  const { selectedServiceId, navigate } = useAuth();
  const { speakText, isSpeaking, stopSpeech } = useAccessibility();

  const service = mockServices.find(s => s.id === selectedServiceId) || mockServices[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 space-y-4">
        <div className="flex items-center justify-between border-b border-brand-800 pb-3 text-xs">
          <span className="bg-saffron-500/20 text-saffron-300 font-bold px-3 py-1 rounded-full border border-saffron-500/30">
            {service.category}
          </span>
          <button
            onClick={() => isSpeaking ? stopSpeech() : speakText(`${service.name}. ${service.purpose}`)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1"
          >
            <Volume2 className="w-4 h-4 text-saffron-400" /> Listen
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{service.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{service.department}</p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('centres')}
            className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg text-sm transition flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Find Nearby Centre</span>
          </button>
          <button
            onClick={() => navigate('documents')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-2xl border border-white/20 text-sm transition"
          >
            View Required Documents in Vault
          </button>
        </div>
      </div>

      {/* OFFICIAL GUIDANCE NOTICE */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-950 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">Official Government Gateway Transparency Notice</p>
          <p className="text-blue-800 leading-relaxed mt-0.5">
            Aazhi guides citizens through official requirements and documents, and directs you to UIDAI or e-District portals / local e-Sevai centres. Aazhi does not execute official biometric or state identity database modifications directly.
          </p>
        </div>
      </div>

      {/* Purpose & Who Needs This */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">Service Purpose</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{service.purpose}</p>
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">Who Needs This Service</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{service.whoNeedsThis}</p>
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">Required Documents Checklist</h3>
        <ul className="space-y-2 text-xs text-slate-800">
          {service.requiredDocuments.map((doc, idx) => (
            <li key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-semibold">
              <FileText className="w-4 h-4 text-brand-700" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps to Apply */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">Application & Enrolment Steps</h3>
        <div className="space-y-3 text-xs">
          {service.stepsToApply.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {idx + 1}
              </span>
              <p className="pt-0.5 text-slate-800 font-medium leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Portal Citation */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-600">Official Portal: <strong>{service.officialPortalUrl}</strong></span>
        <a
          href={service.officialPortalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-brand-700 font-bold hover:underline flex items-center gap-1"
        >
          <span>Open Portal Link</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
