import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Bot,
  FolderLock,
  MapPin,
  Clock,
  Mic,
  Award,
  CheckCircle2,
  GraduationCap,
  Building2,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LandingView: React.FC = () => {
  const { navigate, loginAsGuest, loginAsCitizen, openSchemeDetails } = useAuth();
  const { t } = useAccessibility();

  return (
    <div className="space-y-16 pb-16 animate-in fade-in duration-300">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-brand-800">
        {/* Background decorative glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-saffron-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            AI-POWERED CITIZEN GOVERNMENT SERVICES PLATFORM
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            AAZHI
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-saffron-400">
            “Your Gateway to Government Services & Benefits”
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Discover schemes, access government services, find nearby centres, manage documents, and complete applications with AI assistance.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={loginAsCitizen}
              className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-saffron-950/40 text-base transition flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => navigate('schemes')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 text-base transition backdrop-blur-md"
            >
              Explore Schemes
            </button>

            <button
              onClick={loginAsGuest}
              className="text-slate-300 hover:text-white font-semibold text-sm underline underline-offset-4 px-2"
            >
              Continue as Guest Visitor →
            </button>
          </div>
        </div>

        {/* AI ASSISTANT PREVIEW CARD */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-extrabold text-sm text-saffron-400 flex items-center gap-2">
              <Bot className="w-5 h-5" /> Aazhi AI Assistant Preview
            </span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              Live Interactive Demo
            </span>
          </div>

          <div className="space-y-4">
            {/* User Prompt */}
            <div className="bg-white/15 p-4 rounded-2xl text-sm border border-white/10 max-w-xl">
              <p className="text-xs text-saffron-300 font-bold mb-1">Citizen User:</p>
              <p className="italic text-white">
                “I am a first-generation engineering student from Tamil Nadu. My family income is low. What benefits can I get?”
              </p>
            </div>

            {/* AI Response */}
            <div className="bg-brand-900/90 p-4 rounded-2xl text-sm border border-brand-700 max-w-2xl ml-auto space-y-2 shadow-lg">
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-saffron-500" /> Aazhi AI Answer:
              </p>
              <p className="text-slate-100 font-medium">
                “You may be eligible for several education and financial assistance schemes based on your Tamil Nadu residency and First Graduate status.”
              </p>
            </div>
          </div>

          {/* 3 Preview Recommendation Cards */}
          <div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Matched Scheme Recommendations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => openSchemeDetails('sch_tn_001')}
                className="bg-white text-slate-900 rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    95% Match
                  </span>
                  <GraduationCap className="w-5 h-5 text-brand-700" />
                </div>
                <h4 className="font-bold text-xs line-clamp-2 text-slate-900">
                  Post-Matric Scholarship for First Graduate Engineering
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">100% Tuition Fee Waiver up to ₹50,000/yr</p>
              </div>

              <div
                onClick={() => openSchemeDetails('sch_tn_004')}
                className="bg-white text-slate-900 rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    88% Match
                  </span>
                  <BookOpen className="w-5 h-5 text-saffron-600" />
                </div>
                <h4 className="font-bold text-xs line-clamp-2 text-slate-900">
                  TN Skill Development Youth Apprenticeship Scheme
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">Monthly Stipend ₹8,000 - ₹12,000</p>
              </div>

              <div
                onClick={() => openSchemeDetails('sch_tn_002')}
                className="bg-white text-slate-900 rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    90% Match
                  </span>
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-xs line-clamp-2 text-slate-900">
                  Chief Minister’s Comprehensive Health Insurance (CMCHIS)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">Cashless Cover up to ₹5 Lakhs/yr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTIONS GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Complete Public Service Journey
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-medium">
            Aazhi guides you from discovering schemes to uploading verified documents, finding service centres, and tracking submitted applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Find Government Schemes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter central & state schemes by income, education, caste category, age, gender, and occupation with instant eligibility scoring.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Access Government Services</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete guide for Aadhaar updates, Income Certificates, First Graduate certificates, PAN cards, and e-District services.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">AI-Powered Assistance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask natural questions in English, Tamil, or Hindi. Receive structured recommendations with official government citations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FolderLock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Document Vault & OCR Scanner</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Store verified digital documents. OCR auto-extracts data and alerts you if wrong document files are uploaded.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Nearby Service Centres</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Locate nearby e-Sevai, Aadhaar Seva Kendra & Taluk offices by PIN code with live open/closed indicators and operating hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Application Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track multi-stage application progress from VAO verification to Tahsildar approval and final benefit credit.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST & ACCESSIBILITY FOOTER CTA */}
      <section className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Accessible & Inclusive for Every Citizen</h3>
          <p className="text-slate-300 text-xs max-w-xl">
            Supports High Contrast AAA mode, text resizing, voice synthesis, simple plain language descriptions, and dedicated touchscreen Kiosk Mode.
          </p>
        </div>
        <button
          onClick={loginAsCitizen}
          className="bg-saffron-600 hover:bg-saffron-500 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg text-sm shrink-0 transition"
        >
          Open Citizen Gateway →
        </button>
      </section>
    </div>
  );
};
