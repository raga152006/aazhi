import React, { useState } from 'react';
import { Mic, MicOff, Volume2, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceAssistantOpen, closeVoiceAssistant, speakText, isSpeaking, stopSpeech } = useAccessibility();
  const { navigate, openSchemeDetails, openServiceDetails } = useAuth();

  const [isListening, setIsListening] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  if (!isVoiceAssistantOpen) return null;

  const quickVoicePrompts = [
    'I am a first graduate student in Tamil Nadu. What scholarships can I get?',
    'Find an Aadhaar e-Sevai centre near me.',
    'I need an Income Certificate for scholarship application.',
    'Track my application status for AZ-2026-8891.',
  ];

  const handleSelectPrompt = (prompt: string) => {
    setTranscript(prompt);
    setIsListening(false);
    processVoiceQuery(prompt);
  };

  const processVoiceQuery = (query: string) => {
    const lower = query.toLowerCase();

    if (lower.includes('scholarship') || lower.includes('graduate') || lower.includes('engineering') || lower.includes('student')) {
      const response = "Based on your Tamil Nadu student profile and ₹90,000 income, I found 3 eligible schemes. The Post-Matric Scholarship for First Graduate Engineering Students offers a 100% tuition fee waiver!";
      setAiResponse(response);
      speakText(response);
    } else if (lower.includes('aadhaar') || lower.includes('centre') || lower.includes('near me')) {
      const response = "I found 3 active centres near Triplicane, Chennai. The e-Sevai Centre at Triplicane Taluk Office is open now until 5:30 PM!";
      setAiResponse(response);
      speakText(response);
    } else if (lower.includes('income certificate')) {
      const response = "Income Certificate is available on TN e-District portal with a ₹60 fee. Requires Aadhaar and Smart Ration Card. You already have a verified copy in your Document Vault!";
      setAiResponse(response);
      speakText(response);
    } else {
      const response = "I understood your request. Let me navigate you to the scheme discovery portal where you can review personalized matches.";
      setAiResponse(response);
      speakText(response);
    }
  };

  const handleActionClick = () => {
    closeVoiceAssistant();
    if (transcript.toLowerCase().includes('scholarship') || transcript.toLowerCase().includes('graduate')) {
      openSchemeDetails('sch_tn_001');
    } else if (transcript.toLowerCase().includes('centre') || transcript.toLowerCase().includes('aadhaar')) {
      navigate('centres');
    } else {
      navigate('schemes');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Aazhi Voice Assistant</h3>
              <p className="text-xs text-slate-500">Speak naturally in English, Tamil, or Hindi</p>
            </div>
          </div>
          <button
            onClick={() => { stopSpeech(); closeVoiceAssistant(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 mb-5 flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800">
          <div className="flex items-center gap-2 mb-4 h-12">
            <div className="w-2 bg-saffron-500 rounded-full animate-wave-1"></div>
            <div className="w-2 bg-saffron-400 rounded-full animate-wave-2"></div>
            <div className="w-2 bg-emerald-400 rounded-full animate-wave-3"></div>
            <div className="w-2 bg-brand-400 rounded-full animate-wave-4"></div>
            <div className="w-2 bg-saffron-500 rounded-full animate-wave-5"></div>
          </div>

          <div className="mb-2">
            {isListening ? (
              <span className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 text-xs font-bold px-3 py-1 rounded-full border border-saffron-500/30">
                <Mic className="w-3.5 h-3.5 animate-pulse" /> Listening to your voice...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Processing Complete
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-slate-200 min-h-[40px] italic">
            "{transcript || 'Say something like: "What engineering scholarships am I eligible for?"'}"
          </p>
        </div>

        {/* AI Response Output */}
        {aiResponse && (
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 mb-5 text-xs space-y-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <span className="font-bold text-brand-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-saffron-600" /> Aazhi Voice Answer:
              </span>
              <button
                onClick={() => speakText(aiResponse)}
                className="text-brand-700 font-bold hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Replay Audio
              </button>
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {aiResponse}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleActionClick}
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
              >
                View Relevant Options & Apply →
              </button>
            </div>
          </div>
        )}

        {/* Suggested Voice Quick Prompts */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Try these example voice queries:
          </p>
          <div className="space-y-2">
            {quickVoicePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs hover:bg-brand-50 hover:border-brand-300 transition flex items-center justify-between group"
              >
                <span>"{prompt}"</span>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
