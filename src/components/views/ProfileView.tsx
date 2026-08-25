import React, { useState } from 'react';
import { User, ShieldCheck, CheckCircle2, AlertTriangle, FolderLock, Lock, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfile, navigate } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ ...userProfile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-white/20">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold">{userProfile.name}</h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Verified Citizen
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {userProfile.education} • {userProfile.district}, {userProfile.state}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-2xl border border-white/20 text-xs transition flex items-center gap-1.5"
        >
          <Edit3 className="w-4 h-4 text-saffron-400" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* PROFILE COMPLETENESS WIDGET */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Profile Completeness Indicator
          </h3>
          <span className="text-xs font-bold text-brand-900">80% Complete</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full w-[80%]"></div>
        </div>

        <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span className="font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Missing fields: Occupation verification & First Graduate Cert copy.
          </span>
          <button onClick={() => setIsEditing(true)} className="bg-amber-600 text-white font-bold px-3 py-1 rounded-xl text-xs shrink-0">
            Complete Profile
          </button>
        </div>
      </div>

      {/* FORM / READONLY DETAILS */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        {/* Section 1: Personal & Contact */}
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-3 text-brand-950 border-b pb-2">
            Personal & Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Aadhaar Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.aadhaarNumber}
                onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Education & Academic */}
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-3 text-brand-950 border-b pb-2">
            Education & Social Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Education Level</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">First Graduate Status</label>
              <select
                disabled={!isEditing}
                value={formData.firstGraduate ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, firstGraduate: e.target.value === 'yes' })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              >
                <option value="yes">Yes (First Graduate in Family)</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Annual Family Income (INR)</label>
              <input
                type="number"
                disabled={!isEditing}
                value={formData.familyIncome}
                onChange={(e) => setFormData({ ...formData, familyIncome: parseInt(e.target.value) || 0 })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Social Category</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.socialCategory}
                onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('documents')}
              className="bg-purple-900 hover:bg-purple-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <FolderLock className="w-4 h-4" /> Manage Documents
            </button>
          </div>

          {isEditing && (
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow"
            >
              Save Profile Changes ✓
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
