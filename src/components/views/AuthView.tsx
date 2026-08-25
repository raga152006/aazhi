import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Eye, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthView: React.FC = () => {
  const { loginAsCitizen, loginAsGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'guest'>('login');

  const [formData, setFormData] = useState({
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    aadhaar: 'XXXX-XXXX-8921',
    district: 'Chennai',
    income: '90000',
    consent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCitizen();
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Aazhi Secure Citizen Authentication
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Access Government Benefits & Schemes
        </h2>
        <p className="text-slate-600 text-xs font-medium">
          Sign in to receive personalized recommendations, manage your document vault, and auto-fill official applications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'login' ? 'bg-brand-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Citizen Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'register' ? 'bg-brand-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Register Profile
        </button>
        <button
          onClick={() => setActiveTab('guest')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'guest' ? 'bg-brand-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Continue as Guest
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
        {activeTab === 'guest' ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-saffron-50 text-saffron-600 mx-auto flex items-center justify-center font-bold">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Guest Visitor Mode</h3>
              <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
                Guest users can browse schemes, search services, find nearby centres, and ask general questions to Aazhi AI without signing in.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <p className="font-bold text-slate-800">Capability comparison:</p>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">✓ Search & Browse Schemes</div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">✓ Find Nearby Centres</div>
                <div className="flex items-center gap-1.5 text-slate-400">✗ Document Vault (Requires Login)</div>
                <div className="flex items-center gap-1.5 text-slate-400">✗ Application Auto-Fill</div>
              </div>
            </div>

            <button
              onClick={loginAsGuest}
              className="w-full bg-brand-900 hover:bg-brand-800 text-white font-extrabold py-3.5 rounded-xl text-sm transition shadow"
            >
              Continue as Guest Visitor →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (as in Aadhaar)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (Aadhaar Linked)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar Number (12 Digits)</label>
              <input
                type="text"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                required
              />
            </div>

            {activeTab === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District (Tamil Nadu)</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Salem">Salem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual Family Income (INR)</label>
                  <input
                    type="number"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Privacy & Consent Notice */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-600"
              />
              <label htmlFor="consent" className="text-[11px] leading-relaxed cursor-pointer">
                <strong>Data Privacy & Consent:</strong> I authorize Aazhi to process my profile details and stored documents solely for checking government scheme eligibility and auto-filling official application forms under the Digital Personal Data Protection standards.
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.consent}
              className={`w-full font-extrabold py-3.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                formData.consent ? 'bg-gradient-to-r from-brand-900 to-brand-800 hover:from-brand-800 hover:to-brand-700 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {activeTab === 'login' ? 'Sign In to Citizen Portal' : 'Create Verified Profile'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
