import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Activity, 
  PhoneCall, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ShieldAlert, 
  Sparkles, 
  Smartphone, 
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { ChatMessage, TriageResult, TestScenario } from '../types';
import { analyzeSymptoms } from '../utils/triageEngine';
import { soundManager } from '../utils/audio';

interface ChatInterfaceProps {
  onStartBooking: (triageResult: TriageResult, symptomsText: string, durationText: string) => void;
  onOpenEmergency: () => void;
  onOpenMultiChannel: () => void;
  initialScenario?: TestScenario | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onStartBooking,
  onOpenEmergency,
  onOpenMultiChannel,
  initialScenario,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<'symptoms' | 'duration' | 'severity' | 'completed'>('symptoms');
  const [userSymptoms, setUserSymptoms] = useState('');
  const [userDuration, setUserDuration] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<number>(5);
  const [currentTriageResult, setCurrentTriageResult] = useState<TriageResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (initialScenario) {
      loadScenario(initialScenario);
    } else {
      resetChat();
    }
  }, [initialScenario]);

  const resetChat = () => {
    setCurrentStep('symptoms');
    setUserSymptoms('');
    setUserDuration('');
    setSelectedSeverity(5);
    setCurrentTriageResult(null);
    setInputText('');

    setMessages([
      {
        id: 'msg-init-1',
        sender: 'ai',
        text: "Hello, I am MediTriage Clinical AI Assistant. I am here to help assess your symptoms before visiting a clinic.\n\nWhat symptoms are you experiencing today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: [
          'Chest pain & shortness of breath',
          'High fever & vomiting',
          'Sore throat & mild cough',
          'Back & knee joint ache'
        ]
      }
    ]);
  };

  const loadScenario = (scenario: TestScenario) => {
    setCurrentStep('symptoms');
    setUserSymptoms('');
    setUserDuration('');
    setSelectedSeverity(5);
    setCurrentTriageResult(null);

    // Initial message
    const initialMsg: ChatMessage = {
      id: 'msg-init-demo',
      sender: 'ai',
      text: `Hello, I am MediTriage Clinical AI Assistant. Initializing loaded scenario: [${scenario.title}].\n\nWhat symptoms are you experiencing today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([initialMsg]);

    // Automatically simulate user sending the scenario symptom
    setTimeout(() => {
      handleUserSubmit(scenario.symptomText, scenario);
    }, 600);
  };

  const addAiMessageWithTyping = (
    text: string, 
    extraProps: Partial<ChatMessage> = {}, 
    delayMs: number = 800
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      soundManager.playPop();
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          sender: 'ai',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...extraProps,
        }
      ]);
    }, delayMs);
  };

  const handleUserSubmit = (overrideText?: string, scenarioContext?: TestScenario) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend && currentStep !== 'severity') return;

    soundManager.playPop();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    if (currentStep === 'symptoms') {
      setUserSymptoms(textToSend);
      setCurrentStep('duration');

      if (scenarioContext) {
        // Auto progress for scenario
        setTimeout(() => {
          addAiMessageWithTyping(
            "Thank you for describing your symptoms. Dynamic Follow-up 1/2:\n\nHow long have you been experiencing this condition?",
            {
              requiresDurationPicker: true,
              options: [
                'Started today (few hours ago)',
                '1 to 3 days',
                'About 1 week',
                'More than 2 weeks'
              ]
            },
            700
          );

          setTimeout(() => {
            handleDurationSubmit(scenarioContext.durationText, scenarioContext);
          }, 1600);
        }, 300);
      } else {
        addAiMessageWithTyping(
          "Thank you for detailing your symptoms. Dynamic Follow-up 1/2:\n\nHow long have you been experiencing these symptoms?",
          {
            requiresDurationPicker: true,
            options: [
              'Started today (few hours ago)',
              '1 to 3 days',
              'About 1 week',
              'More than 2 weeks'
            ]
          },
          800
        );
      }
    } else if (currentStep === 'duration') {
      handleDurationSubmit(textToSend);
    }
  };

  const handleDurationSubmit = (durationText: string, scenarioContext?: TestScenario) => {
    setUserDuration(durationText);
    setCurrentStep('severity');

    if (scenarioContext) {
      setTimeout(() => {
        addAiMessageWithTyping(
          "Got it. Dynamic Follow-up 2/2:\n\nOn a scale of 1 to 10, how severe is your pain or discomfort?",
          {
            requiresSeverityScale: true
          },
          600
        );

        setTimeout(() => {
          handleSeveritySubmit(scenarioContext.severityValue, durationText);
        }, 1500);
      }, 300);
    } else {
      addAiMessageWithTyping(
        "Understood. Dynamic Follow-up 2/2:\n\nOn a scale of 1 to 10, how severe is your pain or discomfort?",
        {
          requiresSeverityScale: true
        },
        700
      );
    }
  };

  const handleSeveritySubmit = (score: number, overrideDuration?: string) => {
    setSelectedSeverity(score);
    soundManager.playPop();

    const durationVal = overrideDuration || userDuration || '1 to 2 days';
    
    // User answer bubble
    const userMsg: ChatMessage = {
      id: `msg-sev-${Date.now()}`,
      sender: 'user',
      text: `Pain severity rating: ${score} / 10`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);

    setCurrentStep('completed');
    setIsTyping(true);

    // Compute triage analysis
    setTimeout(() => {
      setIsTyping(false);
      const triageResult = analyzeSymptoms(userSymptoms, durationVal, score);
      setCurrentTriageResult(triageResult);
      soundManager.playAlert(triageResult.level);

      let aiResponseText = '';
      if (triageResult.level === 'CRITICAL') {
        aiResponseText = "⚠️ CRITICAL ALERT: Based on your clinical symptom pattern, our system has detected high-risk emergency markers. Please review the urgent protocol below immediately.";
      } else if (triageResult.level === 'URGENT') {
        aiResponseText = "⚠️ URGENT TRIAGE: Your symptoms indicate an urgent clinical condition that requires formal medical evaluation within 24 hours.";
      } else {
        aiResponseText = "✅ MILD / ROUTINE TRIAGE: Your symptoms do not indicate immediate emergency red flags. You are cleared to schedule a standard outpatient clinic consultation.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-triage-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          triageResult,
          showBookingTrigger: true
        }
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Top Banner: Multi-channel badge & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 bg-slate-900/80 border border-slate-800 p-3 sm:p-4 rounded-2xl backdrop-blur-md">
        
        {/* Availability Badge */}
        <div 
          onClick={onOpenMultiChannel}
          className="flex items-center gap-2 cursor-pointer group"
          title="Click to view channels"
        >
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-bold">
              🌐
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
              💬
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-bold">
              ⚡
            </span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Available on Website, WhatsApp & Facebook
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-400">
              Omnichannel Triage Engine • Instant sync across platforms
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            id="chat-btn-reset"
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Restart Symptom Check"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>

          {currentTriageResult && currentTriageResult.level === 'CRITICAL' && (
            <button
              id="chat-btn-emergency-top"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-950 animate-pulse"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Emergency</span>
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 rounded-2xl p-4 bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm relative">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isAi = message.sender === 'ai';

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {/* AI Avatar */}
                {isAi && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 glow-cyan">
                    <Activity className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-[88%] sm:max-w-[78%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`rounded-2xl p-4 text-sm leading-relaxed ${
                      isAi
                        ? 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                        : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-slate-950 font-medium shadow-md shadow-cyan-950/40'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>

                    {/* Triage Classification Card */}
                    {message.triageResult && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <div
                          className={`p-4 rounded-xl border ${message.triageResult.colorScheme.border} ${
                            message.triageResult.level === 'CRITICAL'
                              ? 'bg-red-950/40 glow-critical'
                              : message.triageResult.level === 'URGENT'
                              ? 'bg-amber-950/40 glow-urgent'
                              : 'bg-emerald-950/40 glow-mild'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${message.triageResult.colorScheme.badgeBg}`}>
                              {message.triageResult.badgeText}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              Target: {message.triageResult.timeframe}
                            </span>
                          </div>

                          <h4 className={`text-base font-bold mb-1.5 ${message.triageResult.colorScheme.accent}`}>
                            {message.triageResult.title}
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            {message.triageResult.summary}
                          </p>

                          <div className="bg-slate-950/70 p-2.5 rounded-lg text-xs text-slate-300 border border-slate-800 mb-3">
                            <strong className="text-white block mb-0.5">Clinical Protocol:</strong>
                            {message.triageResult.recommendation}
                          </div>

                          {/* Critical Actions */}
                          {message.triageResult.level === 'CRITICAL' ? (
                            <div className="space-y-2 mt-3">
                              <button
                                id="triage-call-emergency-btn"
                                onClick={onOpenEmergency}
                                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950 animate-pulse cursor-pointer"
                              >
                                <PhoneCall className="w-4 h-4" />
                                <span>Call Emergency (911 / 1122)</span>
                              </button>

                              <button
                                onClick={() =>
                                  onStartBooking(
                                    message.triageResult!,
                                    userSymptoms,
                                    userDuration
                                  )
                                }
                                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                              >
                                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Notify Emergency Intake at Quetta Central Clinic</span>
                              </button>
                            </div>
                          ) : (
                            <button
                              id="triage-book-appointment-btn"
                              onClick={() =>
                                onStartBooking(
                                  message.triageResult!,
                                  userSymptoms,
                                  userDuration
                                )
                              }
                              className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                message.triageResult.level === 'URGENT'
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-950'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-950'
                              }`}
                            >
                              <Calendar className="w-4 h-4" />
                              <span>
                                {message.triageResult.level === 'URGENT'
                                  ? 'Book 24-Hour Urgent Appointment'
                                  : 'Book Routine Clinic Appointment'}
                              </span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {message.timestamp}
                  </span>

                  {/* Interactive Options Chips */}
                  {message.options && currentStep === 'symptoms' && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {message.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleUserSubmit(opt)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-cyan-300 transition-all text-left"
                        >
                          + {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Interactive Duration Pickers */}
                  {message.requiresDurationPicker && currentStep === 'duration' && message.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {message.options.map((durationOpt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDurationSubmit(durationOpt)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs text-teal-300 transition-all font-medium"
                        >
                          ⏱️ {durationOpt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Interactive Severity Scale (1-10) */}
                  {message.requiresSeverityScale && currentStep === 'severity' && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 w-full">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400">Select Severity Rating:</span>
                        <span className="font-bold text-cyan-400 text-sm">
                          {selectedSeverity} / 10 —{' '}
                          {selectedSeverity <= 3
                            ? 'Mild'
                            : selectedSeverity <= 6
                            ? 'Moderate'
                            : 'Severe'}
                        </span>
                      </div>

                      {/* 1 to 10 clickable buttons */}
                      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mb-3">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                          const isSelected = selectedSeverity === val;
                          const color =
                            val <= 3
                              ? 'hover:border-emerald-500'
                              : val <= 6
                              ? 'hover:border-amber-500'
                              : 'hover:border-red-500';

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setSelectedSeverity(val)}
                              className={`py-2 rounded-lg font-bold text-xs transition-all border ${
                                isSelected
                                  ? val <= 3
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                    : val <= 6
                                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                                    : 'bg-red-500 text-white border-red-400'
                                  : `bg-slate-950 text-slate-300 border-slate-800 ${color}`
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleSeveritySubmit(selectedSeverity)}
                        className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <span>Confirm Severity ({selectedSeverity}/10)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isAi && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Activity className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
              <span>MediTriage AI is analyzing</span>
              <span className="flex gap-1 items-center ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserSubmit();
        }}
        className="mt-3 relative flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            id="chat-symptom-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={currentStep === 'severity' || currentStep === 'completed' || isTyping}
            placeholder={
              currentStep === 'symptoms'
                ? "Describe your symptoms (e.g. chest pain, fever, cough, backache)..."
                : currentStep === 'duration'
                ? "How long have you had this? (e.g. 2 days, 1 week)..."
                : currentStep === 'severity'
                ? "Please select severity on scale 1-10 above..."
                : "Triage complete. Use booking button or reset chat."
            }
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          id="chat-send-btn"
          disabled={!inputText.trim() || currentStep === 'severity' || currentStep === 'completed' || isTyping}
          className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md glow-cyan shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-2 text-center">
        <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <Info className="w-3 h-3 text-slate-600" />
          <span>Preliminary diagnostic check. For medical emergencies, always call 911 / 1122.</span>
        </p>
      </div>
    </div>
  );
};
