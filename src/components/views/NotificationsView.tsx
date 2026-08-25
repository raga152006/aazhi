import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, MapPin, ArrowRight } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const NotificationsView: React.FC = () => {
  const { navigate } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex items-center justify-between">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Citizen Alert Inbox
          </span>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Bell className="w-6 h-6 text-saffron-500" /> Notifications & Alerts
          </h1>
          <p className="text-slate-300 text-xs mt-1">Updates on application status, missing documents, and centre schedules.</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white rounded-3xl p-5 border shadow-card transition space-y-2 ${
              n.read ? 'border-slate-200 opacity-85' : 'border-brand-300 ring-2 ring-brand-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                {n.type === 'status_update' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {n.type === 'missing_document' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {n.type === 'centre_update' && <MapPin className="w-4 h-4 text-brand-600" />}
                {n.title}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{n.timestamp}</span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">{n.message}</p>

            {n.actionUrl && (
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => navigate(n.actionUrl === 'documents' ? 'documents' : 'tracking')}
                  className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
