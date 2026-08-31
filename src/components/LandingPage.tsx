import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  HeartPulse, 
  MessageSquare, 
  Smartphone, 
  Building2,
  CalendarCheck,
  Stethoscope
} from 'lucide-react';
import { CLINICS, TEST_SCENARIOS } from '../data/clinics';
import { TestScenario } from '../types';

interface LandingPageProps {
  onStartTriage: (scenario?: TestScenario) => void;
  onOpenMultiChannel: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartTriage,
  onOpenMultiChannel,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col bg-[#050811] bg-cyber-grid">
      {/* Ambient background glow orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-br from-cyan-600/20 via-teal-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-100px] w-[450px] h-[400px] bg-teal-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[-100px] w-[500px] h-[400px] bg-cyan-900/15 blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
        
        {/* Availability Badge: Web, WhatsApp & Facebook */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-8 glow-border shadow-lg shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available on Website, WhatsApp & Facebook</span>
          <span className="text-slate-500">•</span>
          <button
            onClick={onOpenMultiChannel}
            className="text-cyan-400 hover:text-cyan-200 underline text-xs transition-colors"
          >
            View Channels
          </button>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15] font-display">
          AI-powered symptom triage{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
            before you visit a clinic
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Assess health symptoms in real time, determine medical urgency levels (<span className="text-red-400 font-semibold">Critical</span>, <span className="text-amber-400 font-semibold">Urgent</span>, or <span className="text-emerald-400 font-semibold">Mild</span>), and seamlessly schedule direct appointments with verified partner clinics.
        </p>

        {/* CTA Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-cta-start-check"
            onClick={() => onStartTriage()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-200 shadow-xl glow-teal group cursor-pointer"
          >
            <Activity className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Start Symptom Check</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-cta-whatsapp-channels"
            onClick={onOpenMultiChannel}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 font-medium text-base flex items-center justify-center gap-2.5 transition-all"
          >
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>Multi-Channel Access</span>
          </button>
        </div>

        {/* Quick Demo Scenario Cards (Great for fast interactive hackathon evaluation) */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Demo Scenarios (1-Click Test)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TEST_SCENARIOS.slice(0, 3).map((scenario) => {
              const borderStyles =
                scenario.level === 'CRITICAL'
                  ? 'border-red-500/30 hover:border-red-500/60 bg-red-950/20'
                  : scenario.level === 'URGENT'
                  ? 'border-amber-500/30 hover:border-amber-500/60 bg-amber-950/20'
                  : 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/20';
              
              const badgeStyles =
                scenario.level === 'CRITICAL'
                  ? 'text-red-400 bg-red-500/10'
                  : scenario.level === 'URGENT'
                  ? 'text-amber-300 bg-amber-500/10'
                  : 'text-emerald-300 bg-emerald-500/10';

              return (
                <button
                  key={scenario.id}
                  id={`test-scenario-${scenario.id}`}
                  onClick={() => onStartTriage(scenario)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer ${borderStyles}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{scenario.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeStyles}`}>
                      {scenario.level}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {scenario.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Step Triage Logic Protocol Showcase */}
      <section className="py-12 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Clinical Intelligence Flow
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">
              How MediTriage Triages Your Health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative group hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-bold text-lg font-display">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Describe Symptoms</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Describe your discomfort naturally. Our system parses symptom terminology, location, and acute signs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative group hover:border-teal-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 font-bold text-lg font-display">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Adaptive Follow-ups</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                MediTriage dynamically asks 1–2 crucial diagnostic questions regarding symptom duration and 1–10 pain severity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative group hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-bold text-lg font-display">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Triage & Clinic Booking</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive an immediate classification (Critical, Urgent, or Mild) and book priority slots at verified medical centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Clinics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Verified Medical Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Integrated Partner Clinics
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Direct live intake integration for rapid patient clearance & consultation
            </p>
          </div>
          <button
            onClick={() => onStartTriage()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Book with any clinic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINICS.map((clinic) => (
            <div
              key={clinic.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Open Today
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    ⭐ {clinic.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {clinic.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{clinic.address}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {clinic.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Avg wait: <strong className="text-slate-200">{clinic.waitTime}</strong>
                </span>
                <button
                  onClick={() => onStartTriage()}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Medical Disclaimer */}
      <footer className="mt-auto py-8 bg-[#04060d] border-t border-slate-900 text-center text-xs text-slate-500 px-4">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-400">
            MediTriage Clinical AI • Hackathon Demonstration Platform
          </p>
          <p>
            Disclaimer: MediTriage provides computerized preliminary symptom sorting and should not replace professional clinical diagnosis. In case of acute life-threatening distress, call 911 / 1122 immediately.
          </p>
        </div>
      </footer>
    </div>
  );
};
