import React from 'react';
import { ShieldCheck, Lock, PhoneCall, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { navigate } = useAuth();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & Purpose */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-900 text-white font-bold flex items-center justify-center text-sm border border-brand-700">
              ஆ
            </div>
            <span className="font-extrabold text-lg text-white tracking-wider">AAZHI</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Your Gateway to Government Services & Benefits. Empowering citizens through AI-assisted scheme discovery, auto-filled applications, and integrated service centres.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted & Privacy Compliant</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-slate-200 text-sm mb-3 uppercase tracking-wider text-[11px]">Quick Access</h5>
          <ul className="space-y-2">
            <li><button onClick={() => navigate('schemes')} className="hover:text-white transition">Discover Schemes</button></li>
            <li><button onClick={() => navigate('recommendations')} className="hover:text-white transition">Personalized 95% Match</button></li>
            <li><button onClick={() => navigate('services')} className="hover:text-white transition">Government Services Catalog</button></li>
            <li><button onClick={() => navigate('centres')} className="hover:text-white transition">Find e-Sevai & Aadhaar Centres</button></li>
            <li><button onClick={() => navigate('documents')} className="hover:text-white transition">My Document Vault & OCR</button></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h5 className="font-bold text-slate-200 text-sm mb-3 uppercase tracking-wider text-[11px]">Support & Accessibility</h5>
          <ul className="space-y-2">
            <li><button onClick={() => navigate('settings')} className="hover:text-white transition">High Contrast & Text Resizing</button></li>
            <li><button onClick={() => navigate('assistant')} className="hover:text-white transition">Voice Assistant Guide</button></li>
            <li><button onClick={() => navigate('settings')} className="hover:text-white transition">Privacy Policy & Data Security</button></li>
            <li><button onClick={() => navigate('settings')} className="hover:text-white transition">Terms of Service</button></li>
            <li><button onClick={() => navigate('tracking')} className="hover:text-white transition">Track Application Status</button></li>
          </ul>
        </div>

        {/* Emergency Helpdesk */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
          <h5 className="font-bold text-white text-sm flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-saffron-500" /> Helpline Contact
          </h5>
          <p className="text-xs text-slate-300">
            For technical assistance or application support:
          </p>
          <div className="text-saffron-400 font-extrabold text-sm">
            1800-425-2026 <span className="text-slate-400 font-normal text-xs">(Toll-Free)</span>
          </div>
          <p className="text-[10px] text-slate-500">
            Monday to Saturday: 8:00 AM – 8:00 PM
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© 2026 AAZHI Citizen Service Portal. Designed for public accessibility & transparency.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> SSL 256-bit Encrypted</span>
          <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-brand-400" /> ISO 27001 Certified</span>
        </div>
      </div>
    </footer>
  );
};
