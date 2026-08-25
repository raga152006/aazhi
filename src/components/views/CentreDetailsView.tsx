import React from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldAlert, Calendar, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockCentres } from '../../data/mockData';

export const CentreDetailsView: React.FC = () => {
  const { selectedCentreId } = useAuth();
  const centre = mockCentres.find(c => c.id === selectedCentreId) || mockCentres[0];

  const handleDirections = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + ' ' + centre.address)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 space-y-4">
        <div className="flex items-center justify-between border-b border-brand-800 pb-3 text-xs">
          <span className="bg-saffron-500/20 text-saffron-300 font-bold px-3 py-1 rounded-full border border-saffron-500/30">
            {centre.type}
          </span>
          {centre.isOpen ? (
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              🟢 Open Now ({centre.todayHours})
            </span>
          ) : (
            <span className="bg-red-500/20 text-red-300 font-bold px-3 py-1 rounded-full border border-red-500/30">
              🔴 Closed ({centre.todayHours})
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{centre.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{centre.address}</p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleDirections}
            className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg text-sm transition flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions on Google Maps</span>
          </button>
        </div>
      </div>

      {/* Centre Details Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3 text-xs">
          <h3 className="font-extrabold text-slate-900 text-base mb-2">Operating Hours & Contact</h3>
          <div className="space-y-2 text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-medium text-slate-500 flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-600" /> Today's Schedule:</span>
              <span className="font-bold text-slate-900">{centre.todayHours}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-medium text-slate-500 flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-600" /> Phone Contact:</span>
              <span className="font-bold text-slate-900">{centre.phone}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-medium text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-saffron-600" /> Pincode & District:</span>
              <span className="font-bold text-slate-900">{centre.pincode}, {centre.district}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3 text-xs">
          <h3 className="font-extrabold text-slate-900 text-base mb-2">Services Provided at this Centre</h3>
          <div className="space-y-2">
            {centre.servicesAvailable.map((srv, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{srv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Status Disclaimer */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span>Status Timestamp: <strong>{centre.lastUpdatedTimestamp}</strong></span>
        {!centre.isLiveStatus && (
          <span className="text-amber-800 font-semibold">Note: Operating schedule based on government gazette schedule.</span>
        )}
      </div>
    </div>
  );
};
