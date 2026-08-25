import React, { useState } from 'react';
import { FolderLock, Upload, CheckCircle2, AlertTriangle, Eye, Trash2, RefreshCw, FileText, Plus, ScanLine } from 'lucide-react';
import { mockDocuments } from '../../data/mockData';
import { DocumentItem } from '../../types';
import { OCRScannerModal } from './OCRScannerModal';

export const DocumentVaultView: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isOCRModalOpen, setIsOCRModalOpen] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const categories = [
    'All',
    'Aadhaar',
    'Income Certificate',
    'Community Certificate',
    'Bank Passbook',
    'SSLC Marksheet',
    'First Graduate Certificate',
  ];

  const filteredDocs = selectedCategory === 'All'
    ? documents
    : documents.filter(d => d.documentType === selectedCategory);

  const handleAddConfirmedDocument = (docData: { documentType: string; fileName: string; extractedData: Record<string, string> }) => {
    const newDoc: DocumentItem = {
      id: `doc_vlt_${Date.now()}`,
      documentType: docData.documentType as any,
      fileName: docData.fileName,
      fileSize: '1.4 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'verified',
      extractedData: docData.extractedData,
      confidenceScore: 96,
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider block mb-1">
            Encrypted Document Repository
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <FolderLock className="w-7 h-7 text-saffron-500" /> My Document Vault
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Store verified citizen certificates. Automatically auto-attached during application submissions.
          </p>
        </div>

        <button
          onClick={() => setIsOCRModalOpen(true)}
          className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg text-xs sm:text-sm transition flex items-center gap-2"
        >
          <ScanLine className="w-4 h-4" />
          <span>Upload Document + OCR Scan</span>
        </button>
      </div>

      {/* Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DOCUMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-purple-50 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-100">
                  {doc.documentType}
                </span>

                {/* Status Badge */}
                {doc.verificationStatus === 'verified' && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{doc.fileName}</h3>
                <p className="text-[10px] text-slate-400">Uploaded on {doc.uploadDate} • {doc.fileSize}</p>
              </div>

              {/* Extracted Metadata Preview */}
              {doc.extractedData && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] space-y-1">
                  {Object.entries(doc.extractedData).slice(0, 3).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-500 font-medium">{k}:</span>
                      <span className="font-bold text-slate-900">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="text-brand-700 font-bold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 text-[11px]"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* OCR SCANNER MODAL */}
      <OCRScannerModal
        isOpen={isOCRModalOpen}
        onClose={() => setIsOCRModalOpen(false)}
        onConfirmDocument={handleAddConfirmedDocument}
      />

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">{previewDoc.documentType}</h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl text-center space-y-2 border border-slate-700">
              <FileText className="w-12 h-12 text-saffron-500 mx-auto" />
              <p className="font-extrabold text-sm">{previewDoc.fileName}</p>
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                Verified Vault Encryption
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2">
              <p className="font-bold text-slate-800">Verified Metadata Record:</p>
              {previewDoc.extractedData && Object.entries(previewDoc.extractedData).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">{k}:</span>
                  <span className="font-bold text-slate-900">{v}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button onClick={() => setPreviewDoc(null)} className="bg-brand-900 text-white font-bold px-4 py-2 rounded-xl text-xs">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
