import React, { useState } from 'react';
import { Search, Building2, CreditCard, Fingerprint, FileText, Award, Users, MapPin, ArrowRight } from 'lucide-react';
import { mockServices } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const ServicesView: React.FC = () => {
  const { openServiceDetails, navigate } = useAuth();
  const [search, setSearch] = useState('');

  const filteredServices = mockServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Public Services Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <Building2 className="w-7 h-7 text-saffron-500" /> Government Services Directory
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Official instructions, required documents, and service centre locators for essential citizen services.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card border border-slate-200">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services (e.g. Aadhaar, Income Certificate, Community Certificate, PAN Card)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-brand-600 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => openServiceDetails(service.id)}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-brand-50 text-brand-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-brand-100">
                  {service.category}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{service.fee}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-brand-700 transition">
                {service.name}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Processing Time: {service.processingTime}</span>
                <span className="text-slate-500 block text-[11px]">Online Available: {service.isOnlineAvailable ? 'Yes ✓' : 'Offline only'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={(e) => { e.stopPropagation(); navigate('centres'); }}
                className="text-[11px] font-bold text-saffron-700 hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" /> Find Centre
              </button>
              <button
                onClick={() => openServiceDetails(service.id)}
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
