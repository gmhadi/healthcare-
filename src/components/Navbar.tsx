import React from 'react';
import { Activity, PhoneCall, MessageSquare, Volume2, VolumeX, ShieldAlert, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentView: 'landing' | 'chat' | 'booking' | 'confirmation';
  onNavigate: (view: 'landing' | 'chat') => void;
  onOpenEmergency: () => void;
  onOpenMultiChannel: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenEmergency,
  onOpenMultiChannel,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050811]/85 border-b border-cyan-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          id="nav-brand-logo"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/40 glow-cyan transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#050811] animate-ping" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#050811]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Triage</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                AI Diagnostic HUD
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Clinical Symptom Intelligence & Pre-Check
            </p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1 text-sm text-slate-300">
          <button
            id="nav-link-home"
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1 rounded-full transition-colors ${
              currentView === 'landing'
                ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                : 'hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Overview
          </button>
          <button
            id="nav-link-chat"
            onClick={() => onNavigate('chat')}
            className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
              currentView === 'chat' || currentView === 'booking' || currentView === 'confirmation'
                ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                : 'hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI Symptom Triage
          </button>
          <button
            id="nav-link-channels"
            onClick={onOpenMultiChannel}
            className="px-3 py-1 rounded-full text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Channels
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multi-channel indicator */}
          <button
            id="nav-btn-multichannel"
            onClick={onOpenMultiChannel}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-cyan-300 transition-all"
            title="Omnichannel Triage"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Web • WhatsApp • FB</span>
          </button>

          {/* Sound audio toggle */}
          <button
            id="nav-btn-sound"
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Disable UI Sound Synthesizer' : 'Enable UI Sound Synthesizer'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Emergency SOS Button */}
          <button
            id="nav-btn-emergency"
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 hover:border-red-400 text-xs font-semibold tracking-wide transition-all shadow-sm shadow-red-950"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span>SOS 911 / 1122</span>
          </button>

          {/* Primary Action Button */}
          {currentView === 'landing' && (
            <button
              id="nav-btn-start-triage"
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-cyan-950"
            >
              <span>Start Triage</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
