import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Sparkles,
  User,
  GraduationCap,
  Building2,
  ExternalLink,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { API } from '../../services/api';
import { ChatMessage, Scheme, Service } from '../../types';

export const AssistantView: React.FC = () => {
  const { userProfile, openSchemeDetails, startApplicationForScheme, openServiceDetails } = useAuth();
  const { openVoiceAssistant, speakText } = useAccessibility();

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'aazhi',
      text: `Hello ${userProfile.name}! I am **Aazhi**, your AI Citizen Assistant. Tell me what you need in plain Tamil, English, or Hindi. You can ask about scholarships, income certificates, e-Sevai centres, or application status.`,
      timestamp: 'Just now',
      sourceReference: 'Aazhi Government Knowledge Base 2026',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const sampleSuggestedQueries = [
    'I am a first graduate engineering student with ₹90,000 income. What scholarships can I get?',
    'I need an Income Certificate. What documents do I need?',
    'Find an Aadhaar e-Sevai centre near Triplicane, Chennai.',
    'Track my application AZ-2026-8891.',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    try {
      const response = await API.askAssistant(textToSend, userProfile);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'aazhi',
          text: 'I encountered an issue connecting to the scheme database. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white rounded-3xl p-6 shadow-xl border border-brand-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-600 text-white flex items-center justify-center font-bold shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              Ask Aazhi <span className="text-xs bg-saffron-500/20 text-saffron-400 font-semibold px-2.5 py-0.5 rounded-full border border-saffron-500/30">AI Citizen Engine</span>
            </h1>
            <p className="text-xs text-slate-300">
              Tell me what you need. You can type or speak naturally.
            </p>
          </div>
        </div>

        <button
          onClick={openVoiceAssistant}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-saffron-600 hover:bg-saffron-500 text-white font-bold text-xs shadow-lg transition"
        >
          <Mic className="w-4 h-4" />
          <span>Voice Mode</span>
        </button>
      </div>

      {/* Suggested Query Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 shrink-0">Try asking:</span>
        {sampleSuggestedQueries.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-medium transition border border-slate-200 shadow-sm"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-4 sm:p-6 min-h-[450px] max-h-[600px] overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow ${
                msg.sender === 'user' ? 'bg-brand-900 text-white' : 'bg-gradient-to-tr from-saffron-500 to-amber-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Content Container */}
            <div className={`space-y-3 max-w-2xl ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-900 text-white rounded-tr-none font-medium'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.sender === 'aazhi' && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="text-brand-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                )}
              </div>

              {/* STRUCTURED SCHEME CARDS IN AI RESPONSE */}
              {msg.recommendedSchemes && msg.recommendedSchemes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Recommended Government Schemes:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {msg.recommendedSchemes.map((scheme) => (
                      <div
                        key={scheme.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-brand-700" />
                            <div>
                              <h4 className="font-extrabold text-xs text-slate-900">{scheme.title}</h4>
                              <p className="text-[10px] text-slate-500">{scheme.department}</p>
                            </div>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {scheme.matchScore || 95}% Match
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="font-bold text-slate-700 block mb-0.5">Benefit Highlights:</span>
                            <span className="text-emerald-700 font-semibold">{scheme.benefits.summary}</span>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="font-bold text-slate-700 block mb-0.5">Key Eligibility:</span>
                            <span className="text-slate-600">First Graduate, TN Resident, Income &lt; ₹2.5L</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={scheme.officialSourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-slate-500 hover:text-brand-700 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Official Gazette
                          </a>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openSchemeDetails(scheme.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => startApplicationForScheme(scheme.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-sm"
                            >
                              Start Application →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DOCUMENT CHECKLIST IN AI RESPONSE */}
              {msg.documentChecklist && (
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block">Required Document Readiness Status:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.documentChecklist.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {doc.available ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <span className={doc.available ? 'text-slate-800 font-medium' : 'text-amber-900 font-bold'}>
                          {doc.name} {doc.available ? '(Available in Vault)' : '(Missing)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SOURCE REFERENCE */}
              {msg.sourceReference && (
                <p className="text-[10px] text-slate-400 italic">
                  Information source: {msg.sourceReference}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Typing Loading Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-saffron-500 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-slate-100 text-slate-600 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-brand-600 animate-spin" />
              <span>Aazhi is understanding your request & checking scheme database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask Aazhi in plain Tamil, English or Hindi..."
          className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-card"
        />

        <Paperclip className="w-4 h-4 text-slate-400 absolute left-4 top-4 hover:text-brand-700 cursor-pointer" />

        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={openVoiceAssistant}
            className="p-2 rounded-xl bg-saffron-100 text-saffron-700 hover:bg-saffron-200 transition"
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isProcessing}
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 shadow ${
              inputQuery.trim() && !isProcessing ? 'bg-brand-900 hover:bg-brand-800' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
