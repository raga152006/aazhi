import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockSchemes } from '../../data/mockData';

export const RecommendationsView: React.FC = () => {
  const { userProfile, openSchemeDetails, startApplicationForScheme } = useAuth();

  const recommendedList = mockSchemes.filter(s => (s.matchScore || 0) >= 70);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex items-center justify-between">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Personalized Eligibility Matching
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-saffron-500 animate-pulse" /> Schemes Recommended for You
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Calculated dynamically based on profile parameters for <strong>{userProfile.name}</strong>.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {recommendedList.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 hover:border-brand-300 transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {scheme.department}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mt-0.5">
                  {scheme.title}
                </h3>
              </div>

              {/* Match Indicator Badge */}
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-emerald-950 text-center shrink-0">
                <span className="font-extrabold text-lg block leading-none">{scheme.matchScore}% Match</span>
                <span className="text-[10px] font-bold text-emerald-700">Verified Profile Fit</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {scheme.shortDescription}
            </p>

            {/* Why You Match Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Why Match */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Why you match:
                </h4>
                <ul className="space-y-1.5 text-emerald-900 font-medium">
                  {scheme.matchReasons?.map((reason, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Potential Issue Alert */}
              {scheme.matchWarnings && scheme.matchWarnings.length > 0 && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Potential Requirement Action:
                  </h4>
                  <ul className="space-y-1.5 text-amber-900 font-medium">
                    {scheme.matchWarnings.map((warn, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-amber-600 font-bold">⚠</span> {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Benefits Summary */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Scheme Benefit:</span>
                <span className="text-brand-900 font-extrabold ml-1.5">{scheme.benefits.summary}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openSchemeDetails(scheme.id)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                >
                  View Scheme
                </button>
                <button
                  onClick={() => startApplicationForScheme(scheme.id)}
                  className="px-5 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                >
                  <span>Start Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
