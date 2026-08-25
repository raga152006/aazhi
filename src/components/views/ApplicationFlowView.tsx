import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FolderLock,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  ShieldCheck,
  Building2,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockSchemes, mockDocuments } from '../../data/mockData';
import { API } from '../../services/api';
import { Application } from '../../types';

export const ApplicationFlowView: React.FC = () => {
  const { selectedSchemeId, userProfile, addSubmittedApplication, navigate } = useAuth();

  const scheme = mockSchemes.find(s => s.id === selectedSchemeId) || mockSchemes[0];

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  // Auto-filled Form State
  const [formData, setFormData] = useState({
    name: userProfile.name,
    dob: userProfile.dob,
    gender: userProfile.gender,
    phone: userProfile.phone,
    email: userProfile.email,
    aadhaar: userProfile.aadhaarNumber,
    address: userProfile.address,
    institution: userProfile.institutionName || 'Anna University College of Engineering, Guindy',
    course: userProfile.courseName || 'B.E. Computer Science & Engineering',
    annualIncome: `₹${userProfile.familyIncome.toLocaleString('en-IN')}`,
    firstGraduateStatus: userProfile.firstGraduate ? 'Verified First Graduate' : 'Not First Graduate',
    userConfirmed: false,
  });

  const attachedDocs = [
    { name: 'Aadhaar Card', status: 'Attached from Vault', verified: true },
    { name: 'Income Certificate (₹90,000)', status: 'Attached from Vault', verified: true },
    { name: 'SSLC Marksheet', status: 'Attached from Vault', verified: true },
    { name: 'Bank Account Passbook', status: 'Attached from Vault', verified: true },
    { name: 'First Graduate Certificate', status: '⚠ Missing - Will submit self-declaration affidavit', verified: false },
  ];

  const handleNext = () => setStep(prev => Math.min(4, prev + 1));
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const newApp = await API.submitApplication(
      scheme.id,
      formData,
      ['doc_vlt_01', 'doc_vlt_02', 'doc_vlt_03']
    );
    setSubmittedApp(newApp);
    addSubmittedApplication(newApp);
    setIsSubmitting(false);
    setStep(5);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 shadow-xl border border-brand-800 space-y-2">
        <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block">
          Official Guided Application Wizard
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold">{scheme.title}</h1>
        <p className="text-xs text-slate-300">{scheme.department}</p>
      </div>

      {/* Step Progress Bar */}
      {step < 5 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between text-xs font-bold text-slate-600">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-900' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 1 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>1</span>
            <span className="hidden sm:inline">Personal Info</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>

          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-brand-900' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 2 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>2</span>
            <span className="hidden sm:inline">Academic/Income</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>

          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-brand-900' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 3 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>3</span>
            <span className="hidden sm:inline">Documents</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>

          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-brand-900' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 4 ? 'bg-brand-900 text-white' : 'bg-slate-200'}`}>4</span>
            <span className="hidden sm:inline">Review & Submit</span>
          </div>
        </div>
      )}

      {/* STEP 1: PERSONAL INFORMATION */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">Step 1: Personal Information</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200">
              ✓ Auto-filled from your profile
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Applicant Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Gender</label>
                <input
                  type="text"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Aadhaar Number</label>
              <input
                type="text"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow"
            >
              Continue to Step 2 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ELIGIBILITY & ACADEMICS */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">Step 2: Educational & Financial Details</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200">
              ✓ Auto-filled from your profile
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Higher Education Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree Course Name</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Annual Family Income</label>
                <input
                  type="text"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">First Graduate Status</label>
                <input
                  type="text"
                  value={formData.firstGraduateStatus}
                  onChange={(e) => setFormData({ ...formData, firstGraduateStatus: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={handleBack} className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600">
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow"
            >
              Continue to Step 3 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOCUMENT AUTO-ATTACHMENT */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-purple-600" /> Step 3: Document Vault Auto-Attachment
            </h3>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-purple-200">
              4 of 5 Auto-Matched
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {attachedDocs.map((doc, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  doc.verified ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {doc.verified ? (
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                  <span className="font-bold text-slate-900">{doc.name}</span>
                </div>
                <span className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full ${
                  doc.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={handleBack} className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600">
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow"
            >
              Review Application →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW BEFORE SUBMISSION */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="border-b pb-3">
            <h3 className="font-extrabold text-slate-900 text-lg">Review Before Submission</h3>
            <p className="text-xs text-slate-500">Please review all auto-filled information and documents before final confirmation.</p>
          </div>

          {/* Warning Notice */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-amber-950 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Important Notice: Verify all information carefully. Once submitted, your application will be forwarded to the Tahsildar desk for institutional verification.</span>
          </div>

          {/* Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span className="font-bold text-slate-500">Applicant:</span>
              <span className="font-extrabold text-slate-900">{formData.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-bold text-slate-500">Institution:</span>
              <span className="font-bold text-slate-900">{formData.institution}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-bold text-slate-500">Declared Family Income:</span>
              <span className="font-bold text-slate-900">{formData.annualIncome}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-500">Attached Documents:</span>
              <span className="font-bold text-emerald-700">4 Verified Vault Records Attached</span>
            </div>
          </div>

          {/* User Explicit Confirmation Checkbox */}
          <div className="bg-brand-50 p-4 rounded-2xl border border-brand-200 flex items-start gap-3 text-xs text-brand-950">
            <input
              type="checkbox"
              id="confirmCheck"
              checked={formData.userConfirmed}
              onChange={(e) => setFormData({ ...formData, userConfirmed: e.target.checked })}
              className="mt-0.5 rounded text-brand-600 focus:ring-brand-600"
            />
            <label htmlFor="confirmCheck" className="cursor-pointer leading-relaxed">
              <strong>Explicit Citizen Declaration:</strong> I hereby declare that all information supplied above is true to the best of my knowledge and complies with Tamil Nadu Government scholarship rules.
            </label>
          </div>

          <div className="pt-2 flex justify-between">
            <button onClick={handleBack} className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600">
              ← Edit Details
            </button>
            <button
              onClick={handleFinalSubmit}
              disabled={!formData.userConfirmed || isSubmitting}
              className={`font-extrabold px-8 py-3.5 rounded-2xl text-xs transition shadow-lg flex items-center gap-2 ${
                formData.userConfirmed && !isSubmitting ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{isSubmitting ? 'Submitting...' : 'Confirm & Submit Application'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUBMISSION SUCCESS */}
      {step === 5 && submittedApp && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              APPLICATION SUBMITTED SUCCESSFULLY
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Application Reference ID: {submittedApp.id}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Receipt timestamp: {submittedApp.submittedDate} • Trackable via Aazhi portal & SMS alerts.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-1">
            <p className="font-bold text-slate-900">{submittedApp.schemeTitle}</p>
            <p className="text-slate-500">{submittedApp.department}</p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('tracking')}
              className="bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow transition"
            >
              Track Application Progress →
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl text-xs transition"
            >
              Return to Citizen Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
