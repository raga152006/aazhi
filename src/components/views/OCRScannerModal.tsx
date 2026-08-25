import React, { useState } from 'react';
import { Upload, FileCheck, AlertTriangle, RefreshCw, CheckCircle, X, ScanLine, ShieldAlert } from 'lucide-react';
import { API } from '../../services/api';
import { OCRResult } from '../../types';

interface OCRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDocument: (docData: { documentType: string; fileName: string; extractedData: Record<string, string> }) => void;
}

export const OCRScannerModal: React.FC<OCRScannerModalProps> = ({ isOpen, onClose, onConfirmDocument }) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('Aadhaar');
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSimulateMismatchTest = () => {
    // Simulate user selecting Aadhaar but uploading Income Certificate
    const mockMismatchFile = new File(['dummy content'], 'Income_Certificate_2026.pdf', { type: 'application/pdf' });
    setFile(mockMismatchFile);
    runOCR(mockMismatchFile, 'Aadhaar');
  };

  const handleRunOCR = () => {
    if (!file) return;
    runOCR(file, selectedDocumentType);
  };

  const runOCR = async (uploadedFile: File, targetType: string) => {
    setIsScanning(true);
    setOcrResult(null);

    const result = await API.uploadDocumentOCR(uploadedFile, targetType);
    setOcrResult(result);
    setIsScanning(false);
  };

  const handleSaveAsDetectedType = () => {
    if (!ocrResult || !file) return;
    onConfirmDocument({
      documentType: ocrResult.detectedDocumentType,
      fileName: file.name,
      extractedData: ocrResult.extractedInformation,
    });
    onClose();
  };

  const handleSaveAsSelectedType = () => {
    if (!ocrResult || !file) return;
    onConfirmDocument({
      documentType: selectedDocumentType,
      fileName: file.name,
      extractedData: ocrResult.extractedInformation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-900 text-white flex items-center justify-center font-bold">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Aazhi Intelligent Document Vault OCR Scanner</h3>
              <p className="text-xs text-slate-500">Auto-verify documents & detect mismatched uploads</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Select Type & Upload */}
        {!ocrResult && !isScanning && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Which document type do you intend to upload?
              </label>
              <select
                value={selectedDocumentType}
                onChange={(e) => setSelectedDocumentType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-brand-600 focus:bg-white"
              >
                <option value="Aadhaar">Aadhaar Card</option>
                <option value="Income Certificate">Income Certificate</option>
                <option value="First Graduate Certificate">First Graduate Certificate</option>
                <option value="Community Certificate">Community Certificate</option>
                <option value="Bank Passbook">Bank Account Passbook</option>
                <option value="SSLC Marksheet">SSLC Marksheet</option>
              </select>
            </div>

            {/* Drag Drop Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-brand-50/50 hover:border-brand-300 transition">
              <Upload className="w-8 h-8 text-brand-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                {file ? `Selected file: ${file.name}` : 'Drag & drop document image or PDF here'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, PDF up to 10 MB</p>

              <label className="mt-3 inline-block bg-brand-900 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer hover:bg-brand-800 transition">
                Choose File
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
              </label>
            </div>

            {/* Demo Button to trigger Mismatch Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Want to test Aazhi's Wrong Document Mismatch Detection?
              </span>
              <button
                onClick={handleSimulateMismatchTest}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shrink-0 transition"
              >
                Test Mismatch Warning
              </button>
            </div>

            {/* Scan Button */}
            <div className="pt-2 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button
                onClick={handleRunOCR}
                disabled={!file}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition ${
                  file ? 'bg-brand-900 hover:bg-brand-800 shadow-md' : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Scan Document with AI →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Scanning Loading State */}
        {isScanning && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-48 h-32 mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
              <div className="text-slate-400 text-xs font-mono">SCANNING DOCUMENT...</div>
              {/* Scan Beam */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-emerald-400 to-saffron-500 shadow-lg animate-ocr-scan"></div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-600 animate-spin" /> Aazhi is analyzing your document...
              </h4>
              <p className="text-xs text-slate-500 mt-1">Reading text OCR, checking seal signatures & verifying layout match...</p>
            </div>
          </div>
        )}

        {/* Step 3: OCR Results & Mismatch Warning Alert */}
        {ocrResult && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* MISMATCH WARNING BANNER */}
            {ocrResult.isMismatch ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-red-950 space-y-2">
                <div className="flex items-center gap-2 text-red-700 font-extrabold text-sm">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span>DOCUMENT TYPE MISMATCH DETECTED!</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-red-900">
                  You selected <strong>"{ocrResult.userSelectedType}"</strong>, but Aazhi scanned this file and identified it as an <strong>"{ocrResult.detectedDocumentType}"</strong> with {ocrResult.confidence}% confidence.
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl border border-red-200 text-xs font-mono text-red-800">
                  ⚠️ Scanned Seal Header: "Government of Tamil Nadu - Department of Revenue"
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-emerald-950">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-900">Document Type Match Verified ({ocrResult.confidence}% Confidence)</p>
                  <p className="text-emerald-700">Verified as a valid <strong>{ocrResult.detectedDocumentType}</strong>.</p>
                </div>
              </div>
            )}

            {/* Extracted Data Table */}
            <div>
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                Extracted Information Preview:
              </h5>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
                {Object.entries(ocrResult.extractedInformation).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-slate-200/60 pb-1 last:border-0">
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="font-bold text-slate-900 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for Mismatch or Normal Confirmation */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setOcrResult(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                ← Upload Different File
              </button>

              {ocrResult.isMismatch ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAsDetectedType}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow"
                  >
                    Save as {ocrResult.detectedDocumentType}
                  </button>
                  <button
                    onClick={handleSaveAsSelectedType}
                    className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
                  >
                    Keep as {ocrResult.userSelectedType}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSaveAsDetectedType}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow"
                >
                  Confirm & Save to Vault ✓
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
