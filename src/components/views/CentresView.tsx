import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Search, ShieldAlert, Compass, ExternalLink, Volume2, CheckCircle2 } from 'lucide-react';
import { mockCentres } from '../../data/mockData';
import { ServiceCentre } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const CentresView: React.FC = () => {
  const { openCentreDetails } = useAuth();
  const { speakText } = useAccessibility();

  const [searchLocation, setSearchLocation] = useState('Triplicane, Chennai (600005)');
  const [filterType, setFilterType] = useState('All');
  const [selectedCentre, setSelectedCentre] = useState<ServiceCentre>(mockCentres[0]);

  const filteredCentres = mockCentres.filter(c => {
    if (filterType !== 'All' && c.type !== filterType) return false;
    if (searchLocation) {
      const q = searchLocation.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.pincode.includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUseMyLocation = () => {
    setSearchLocation('My Geolocation: 600005 (Chennai)');
  };

  const handleGetDirections = (centre: ServiceCentre, e: React.MouseEvent) => {
    e.stopPropagation();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + ' ' + centre.address)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Government e-Sevai & Aadhaar Locator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <MapPin className="w-7 h-7 text-saffron-500" /> Find a Service Centre Near You
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Locate active e-Sevai, Aadhaar Seva Kendra, Taluk Offices & Post Offices with verified operating hours.
          </p>
        </div>
      </div>

      {/* SEARCH BAR & LOCATION SELECTOR */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter PIN Code, District, or Landmark (e.g. 600005, Triplicane, T. Nagar)..."
              className="w-full pl-10 pr-32 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-brand-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <button
              onClick={handleUseMyLocation}
              className="absolute right-2 top-2 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-sm"
            >
              <Navigation className="w-3 h-3 text-saffron-400" />
              <span>Use My Location</span>
            </button>
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-56 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-brand-600"
          >
            <option value="All">All Centre Types</option>
            <option value="e-Sevai">e-Sevai Centres</option>
            <option value="Aadhaar Seva Kendra">Aadhaar Seva Kendra</option>
            <option value="Taluk Office">Taluk Offices</option>
            <option value="Post Office">Post Office Aadhaar Kendra</option>
          </select>
        </div>
      </div>

      {/* DUAL VIEW LAYOUT: MAP REPRESENTATION ON RIGHT, LIST ON LEFT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: CENTRE CARDS LIST (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filteredCentres.length} Centres Found Near Registered Location
            </p>
          </div>

          <div className="space-y-4">
            {filteredCentres.map((centre) => {
              const isSelected = selectedCentre.id === centre.id;
              return (
                <div
                  key={centre.id}
                  onClick={() => setSelectedCentre(centre)}
                  className={`bg-white rounded-3xl p-5 border shadow-card transition cursor-pointer space-y-3 ${
                    isSelected ? 'border-2 border-brand-600 ring-2 ring-brand-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {centre.type} • {centre.distanceKm} km away
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base">{centre.name}</h3>
                    </div>

                    {/* OPEN / CLOSED INDICATOR */}
                    {centre.isOpen ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        🟢 Open now ({centre.todayHours})
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-extrabold px-3 py-1 rounded-full border border-red-200 flex items-center gap-1">
                        🔴 Closed ({centre.todayHours})
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{centre.address}</p>

                  {/* Available Services Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {centre.servicesAvailable.map((srv, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg">
                        ✓ {srv}
                      </span>
                    ))}
                  </div>

                  {/* Live Status Disclaimer Warning */}
                  {!centre.isLiveStatus && (
                    <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 text-[10px] font-semibold text-amber-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{centre.lastUpdatedTimestamp} ({centre.scheduleInfoNote})</span>
                    </div>
                  )}

                  {/* Card Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => speakText(`${centre.name}. Located at ${centre.address}. Status is ${centre.isOpen ? 'Open Now' : 'Closed'}`)}
                      className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Read Info
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleGetDirections(centre, e)}
                        className="px-3.5 py-1.5 rounded-xl bg-saffron-50 hover:bg-saffron-100 text-saffron-700 font-bold border border-saffron-200 flex items-center gap-1"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Directions
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openCentreDetails(centre.id); }}
                        className="px-4 py-1.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold shadow-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: MAP VISUALIZER REPRESENTATION (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 h-[550px] bg-slate-900 rounded-3xl border border-slate-800 p-4 overflow-hidden flex flex-col justify-between shadow-2xl">
          {/* Map Header Overlay */}
          <div className="bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-white z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-saffron-500" />
              <div>
                <p className="font-extrabold text-xs">{selectedCentre.name}</p>
                <p className="text-[10px] text-slate-400">Lat: {selectedCentre.latitude} • Long: {selectedCentre.longitude}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Interactive GPS Map
            </span>
          </div>

          {/* Interactive Map Canvas Mock Grid */}
          <div className="relative flex-1 my-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Grid lines background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

            {/* Selected Pin Pulsing Marker */}
            <div className="relative z-10 space-y-2 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-saffron-500 text-white flex items-center justify-center font-bold shadow-2xl mx-auto ring-4 ring-saffron-400/40">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="bg-slate-900 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl">
                {selectedCentre.name}
              </div>
            </div>
          </div>

          {/* Map Footer Control */}
          <div className="bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-slate-300 text-xs flex items-center justify-between">
            <span>Distance: <strong className="text-white">{selectedCentre.distanceKm} km</strong></span>
            <button
              onClick={(e) => handleGetDirections(selectedCentre, e)}
              className="bg-saffron-600 hover:bg-saffron-500 text-white font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1 shadow"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
