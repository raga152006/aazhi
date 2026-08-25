import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Bookmark,
  Share2,
  ExternalLink,
  ArrowRight,
  FolderLock,
  FileCheck,
  Calendar,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { mockSchemes, mockDocuments } from '../../data/mockData';

export const SchemeDetailsView: React.FC = () => {
  const { selectedSchemeId, startApplicationForScheme, navigate } = useAuth();
  const { speakText, isSpeaking, stopSpeech } = useAccessibility();

  const scheme = mockSchemes.find(s => s.id === selectedSchemeId) || mockSchemes[0];
  const [saved, setSaved] = useState(false);

  // Check document availability in vault
  const documentVaultMap: Record<string, boolean> = {
    'Aadhaar Card': mockDocuments.some(d => d.documentType === 'Aadhaar'),
    'Income Certificate (Issued within 1 yr)': mockDocuments.some(d => d.documentType === 'Income Certificate'),
    'SSLC / HSC Mark List': mockDocuments.some(d => d.documentType === 'SSLC Marksheet'),
    'Bank Account Passbook Copy': mockDocuments.some(d => d.documentType === 'Bank Passbook'),
    'First Graduate Certificate from Tahsildar': false, // Missing
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: scheme.title, url: window.location.href }).catch(() => {});
    } else {
      alert(`Scheme link copied: ${scheme.officialSourceUrl}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header card */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-800 pb-4">
          <span className="bg-saffron-500/20 text-saffron-300 text-xs font-bold px-3 py-1 rounded-full border border-saffron-500/30">
            {scheme.category} Scheme
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
              {scheme.matchScore}% Eligibility Match
            </span>
            <button
              onClick={() => isSpeaking ? stopSpeech() : speakText(`${scheme.title}. ${scheme.overview}`)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 text-xs"
              title="Listen Speech"
            >
              <Volume2 className="w-4 h-4 text-saffron-400" />
              <span className="hidden sm:inline">Listen</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            {scheme.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
            <Building2 className="w-4 h-4 text-saffron-400" /> {scheme.department}
          </p>
        </div>

        {/* Action CTAs Header */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => startApplicationForScheme(scheme.id)}
            className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg text-sm transition flex items-center gap-2"
          >
            <span>Start Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`px-4 py-3 rounded-2xl border font-bold text-xs transition flex items-center gap-1.5 ${
              saved ? 'bg-saffron-500 text-white border-saffron-600' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
            <span>{saved ? 'Saved' : 'Save Scheme'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">Overview</h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {scheme.overview}
        </p>
      </div>

      {/* WHY AAZHI RECOMMENDS THIS */}
      <div className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200 space-y-3">
        <h3 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" /> Why Aazhi recommends this for Ramesh Kumar
        </h3>
        <ul className="space-y-2 text-xs text-emerald-900 font-medium">
          {scheme.matchReasons?.map((reason, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ELIGIBILITY CHECKLIST */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Eligibility Requirements</h3>
        <div className="space-y-2.5">
          {scheme.eligibility.criteriaList.map((crit, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                crit.satisfied !== false ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2">
                {crit.satisfied !== false ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span className="font-semibold">{crit.text}</span>
              </div>
              <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                crit.satisfied !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {crit.satisfied !== false ? 'Met' : 'Unmet'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS BREAKDOWN */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Financial & Non-Financial Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-brand-900 block text-xs uppercase tracking-wider">Financial Benefit:</span>
            <p className="text-slate-800 font-semibold leading-relaxed">
              {scheme.benefits.financial || scheme.benefits.summary}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-brand-900 block text-xs uppercase tracking-wider">Non-Financial Benefit:</span>
            <p className="text-slate-800 font-semibold leading-relaxed">
              {scheme.benefits.nonFinancial || 'Priority access to state government services.'}
            </p>
          </div>
        </div>
      </div>

      {/* REQUIRED DOCUMENTS VAULT READINESS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-purple-600" /> Required Documents Readiness
          </h3>
          <button onClick={() => navigate('documents')} className="text-xs font-bold text-purple-700 hover:underline">
            Open Vault Scanner →
          </button>
        </div>

        <div className="space-y-2">
          {scheme.requiredDocuments.map((doc) => {
            const isAvailable = documentVaultMap[doc.name] ?? true;
            return (
              <div
                key={doc.id}
                className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                  isAvailable ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isAvailable ? (
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="font-bold text-slate-900">{doc.name}</span>
                </div>
                <span className={`font-extrabold text-[11px] px-3 py-1 rounded-full ${
                  isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isAvailable ? '✓ Available in Vault' : '⚠ Missing (Upload Required)'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP-BY-STEP PROCESS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Step-by-Step Application Process</h3>
        <div className="space-y-3">
          {scheme.applicationSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-slate-800">
              <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="pt-1 font-medium leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OFFICIAL SOURCE CITATION */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600">Official Source Gazette | Last Updated: <strong>{scheme.lastUpdated}</strong></span>
        </div>
        <a
          href={scheme.officialSourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-brand-700 font-bold hover:underline flex items-center gap-1"
        >
          <span>Official Portal Link</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* BOTTOM CTA BAR */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => startApplicationForScheme(scheme.id)}
          className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl text-sm transition flex items-center gap-2"
        >
          <span>Start Application Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
