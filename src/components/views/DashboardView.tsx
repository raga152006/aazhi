import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Mic,
  Upload,
  FolderLock,
  MapPin,
  ClipboardList,
  ArrowRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { mockSchemes, mockCentres, mockDocuments, mockApplications } from '../../data/mockData';

export const DashboardView: React.FC = () => {
  const { userProfile, navigate, openSchemeDetails, openCentreDetails, openApplicationTracking, startApplicationForScheme } = useAuth();
  const { openVoiceAssistant, t } = useAccessibility();

  const [aiSearchInput, setAiSearchInput] = useState('');

  const quickPrompts = [
    'What schemes am I eligible for?',
    'I need an income certificate.',
    'Find an Aadhaar centre near me.',
    'What documents do I need?',
    'Track my application.',
  ];

  const handlePromptClick = (prompt: string) => {
    setAiSearchInput(prompt);
    navigate('assistant');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiSearchInput.trim()) {
      navigate('assistant');
    }
  };

  // Profile documents status summary
  const totalRequiredDocs = 5;
  const readyDocsCount = mockDocuments.filter(d => d.verificationStatus === 'verified').length;

  // Closest centre
  const closestCentre = mockCentres[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Personalized Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
              Citizen Service Gateway
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, {userProfile.name} 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Here’s what Aazhi can help you with today.
            </p>
          </div>

          {/* Profile Completeness Pill */}
          <div
            onClick={() => navigate('profile')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 cursor-pointer hover:bg-white/20 transition flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/40">
              80%
            </div>
            <div>
              <p className="text-xs font-bold text-white">Profile 80% Complete</p>
              <p className="text-[10px] text-saffron-300 font-medium">Missing: Occupation & Income Cert</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* MAIN AI SEARCH / ASSISTANT AREA */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-saffron-600 animate-pulse" />
            Ask Aazhi anything about government schemes or services…
          </label>
          <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
            Powered by Aazhi AI RAG Engine
          </span>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={aiSearchInput}
            onChange={(e) => setAiSearchInput(e.target.value)}
            placeholder="Type or click microphone to ask Aazhi (e.g. 'What engineering scholarships am I eligible for?')"
            className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
          />

          <div className="absolute right-2 top-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={openVoiceAssistant}
              className="p-2 rounded-xl bg-saffron-100 text-saffron-700 hover:bg-saffron-200 transition"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Ask
            </button>
          </div>
        </form>

        {/* Quick Example Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(prompt)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-[11px] font-medium transition border border-slate-200"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT 2 COLUMNS: Recommended & Continue Applications */}
        <div className="lg:col-span-2 space-y-8">
          {/* SECTION: Recommended for You */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-saffron-600" /> Recommended for You
                </h3>
                <p className="text-xs text-slate-500">Based on your Tamil Nadu student profile & ₹90,000 family income</p>
              </div>
              <button
                onClick={() => navigate('recommendations')}
                className="text-xs font-bold text-brand-700 hover:underline"
              >
                View All Recommendations →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockSchemes.slice(0, 2).map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {scheme.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{scheme.category}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2">
                      {scheme.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {scheme.shortDescription}
                    </p>
                    <div className="bg-slate-50 p-2 rounded-xl text-[11px] font-semibold text-brand-900 border border-slate-100">
                      Benefit: {scheme.benefits.summary}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => openSchemeDetails(scheme.id)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-xs transition text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => startApplicationForScheme(scheme.id)}
                      className="flex-1 py-2 rounded-xl bg-brand-900 text-white hover:bg-brand-800 font-bold text-xs transition text-center shadow-sm"
                    >
                      Start Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Continue Application */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-brand-700" /> Active Application Progress
              </h3>
              <button
                onClick={() => navigate('tracking')}
                className="text-xs font-bold text-brand-700 hover:underline"
              >
                Track All Applications →
              </button>
            </div>

            {mockApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => openApplicationTracking(app.id)}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card hover:border-brand-300 transition cursor-pointer space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Application ID: {app.id}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {app.schemeTitle}
                    </h4>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Under Review
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  {app.statusNote}
                </p>

                {/* Progress bar visual */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Milestone 4 of 5</span>
                    <span className="text-brand-700 font-bold">80% Completed</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Documents, Nearby Centre & Recent Activity */}
        <div className="space-y-6">
          {/* SECTION: My Documents Readiness */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-purple-600" /> My Documents
              </h4>
              <button onClick={() => navigate('documents')} className="text-xs font-bold text-brand-700 hover:underline">
                Manage Vault
              </button>
            </div>

            <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-purple-950">
                <span>Document Readiness</span>
                <span>{readyDocsCount} of {totalRequiredDocs} Ready</span>
              </div>
              <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full w-4/5"></div>
              </div>
              <p className="text-[11px] text-purple-800">
                ⚠ Missing: <strong>First Graduate Certificate</strong> (Required for tuition waiver)
              </p>
            </div>

            <button
              onClick={() => navigate('documents')}
              className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs transition shadow-sm text-center block"
            >
              + Upload Document with OCR →
            </button>
          </div>

          {/* SECTION: Nearby Service Centre */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-600" /> Nearest Service Centre
              </h4>
              <button onClick={() => navigate('centres')} className="text-xs font-bold text-brand-700 hover:underline">
                View Map
              </button>
            </div>

            <div
              onClick={() => openCentreDetails(closestCentre.id)}
              className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 cursor-pointer hover:border-brand-300 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900">{closestCentre.name}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  🟢 Open Now
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{closestCentre.address}</p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 pt-1">
                <span>Distance: {closestCentre.distanceKm} km</span>
                <span className="text-brand-700 font-bold">Directions →</span>
              </div>
            </div>
          </div>

          {/* SECTION: Recent Activity Log */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm">Recent Activity Log</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-700 border-b border-slate-100 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Submitted Post-Matric Scholarship</p>
                  <span className="text-[10px] text-slate-400">10 Aug 2026</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-slate-700 border-b border-slate-100 pb-2">
                <FileCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Uploaded Income Certificate to Vault</p>
                  <span className="text-[10px] text-slate-400">15 Jul 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
