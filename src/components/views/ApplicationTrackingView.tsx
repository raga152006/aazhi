import React from 'react';
import { ClipboardList, CheckCircle2, Clock, ExternalLink, AlertCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockApplications } from '../../data/mockData';

export const ApplicationTrackingView: React.FC = () => {
  const { selectedApplicationId, applications } = useAuth();

  const activeAppList = applications.length > 0 ? applications : mockApplications;
  const activeApp = activeAppList.find(a => a.id === selectedApplicationId) || activeAppList[0];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Real-time Status Monitor
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-saffron-500" /> My Submitted Applications
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Track multi-stage government approvals, document verification, and treasury disbursement.
          </p>
        </div>
      </div>

      {/* ACTIVE APPLICATIONS SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeAppList.map((app) => (
          <div
            key={app.id}
            className={`bg-white rounded-3xl p-5 border shadow-card transition cursor-pointer space-y-2 ${
              app.id === activeApp.id ? 'border-2 border-brand-600 ring-2 ring-brand-100' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-brand-950">ID: {app.id}</span>
              <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                app.status === 'sanctioned' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {app.status === 'sanctioned' ? '✓ Sanctioned' : '● Under Review'}
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{app.schemeTitle}</h4>
            <p className="text-[11px] text-slate-500">Submitted: {app.submittedDate} • Last update: {app.lastUpdated}</p>
          </div>
        ))}
      </div>

      {/* MILESTONE TIMELINE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Application Milestone Details
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">{activeApp.schemeTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{activeApp.department}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 block">Application ID: {activeApp.id}</span>
            <span className="text-[11px] text-slate-400">Portal Sync: Live</span>
          </div>
        </div>

        {/* Current Note Alert */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 text-brand-950 text-xs font-medium space-y-1">
          <span className="font-bold block text-brand-900">Current Status Note:</span>
          <p className="leading-relaxed">{activeApp.statusNote}</p>
        </div>

        {/* VISUAL TIMELINE MILESTONES */}
        <div className="space-y-6 pt-2">
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Approval Stages & Milestones:</h3>
          <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
            {activeApp.timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Circle Marker */}
                <div
                  className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow ${
                    item.completed
                      ? 'bg-emerald-600 text-white'
                      : item.active
                      ? 'bg-saffron-500 text-white ring-4 ring-saffron-100'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {item.completed ? '✓' : idx + 1}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-extrabold ${item.completed ? 'text-slate-900' : item.active ? 'text-saffron-700' : 'text-slate-400'}`}>
                      {item.stage}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                  </div>
                  {item.note && (
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
