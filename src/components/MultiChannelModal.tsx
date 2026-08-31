import React from 'react';
import { 
  X, 
  Globe, 
  MessageSquare, 
  Smartphone, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Bot
} from 'lucide-react';

interface MultiChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChannel?: (channel: string) => void;
}

export const MultiChannelModal: React.FC<MultiChannelModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-6 sm:p-8 glow-cyan overflow-hidden">
        
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
              Omnichannel Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              MediTriage Anywhere
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          MediTriage seamlessly connects patients across multiple messaging touchpoints. All triage assessments and confirmed clinic bookings stay synchronized in real time.
        </p>

        {/* Channel Cards */}
        <div className="space-y-3 mb-6">
          {/* Web App */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Web Application HUD</h4>
                  <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Full interactive visual dashboard & dynamic diagnostic questionnaires.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Channel */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg font-bold">
                💬
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    WhatsApp AI Bot
                  </h4>
                  <span className="text-[10px] text-slate-400">wa.me/+92300MEDITRIAGE</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Text or voice-note your symptoms on WhatsApp for automated triage and booking slips.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
              Connected
            </span>
          </div>

          {/* Facebook Messenger */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-lg font-bold">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    Facebook Messenger Bot
                  </h4>
                  <span className="text-[10px] text-slate-400">m.me/meditriage.health</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Instant chatbot integration on clinic Facebook pages with rich button replies.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-400 px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30">
              Connected
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Unified Patient Identity: phone numbers sync across all 3 channels</span>
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wide transition-all"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
