import React, { useState } from 'react';
import { 
  PhoneCall, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Activity, 
  CheckCircle2,
  HeartCrack
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [dialedNumber, setDialedNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDial = (num: string) => {
    setDialedNumber(num);
    // In real device: window.location.href = `tel:${num}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-red-500/50 shadow-2xl p-6 sm:p-8 glow-critical overflow-hidden">
        
        {/* Top Emergency warning stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
            <HeartCrack className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">
              Immediate Critical Protocol
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Emergency Medical Dispatch
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          If you or someone nearby is experiencing acute chest pain, shortness of breath, severe trauma, or unconsciousness, connect with emergency services immediately.
        </p>

        {/* Dialed simulation notification */}
        {dialedNumber && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Connecting to <strong>{dialedNumber}</strong>... If prompt does not appear, dial manually on your phone keypad.</span>
          </div>
        )}

        {/* Emergency Hotline Buttons */}
        <div className="space-y-3 mb-6">
          <a
            href="tel:1122"
            onClick={() => handleDial('1122')}
            className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-between shadow-lg shadow-red-950 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <div className="text-left">
                <span className="block">Rescue 1122 Ambulance Emergency</span>
                <span className="text-[11px] font-normal text-red-100">National Emergency Response (Toll-Free)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-black/20 text-xs font-mono font-bold">
              1122
            </span>
          </a>

          <a
            href="tel:911"
            onClick={() => handleDial('911')}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <span className="block">General Emergency Services</span>
                <span className="text-[10px] text-slate-400">Police & Medical Dispatch</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-xs font-mono font-bold">
              911 / 15
            </span>
          </a>

          <a
            href="tel:+92812834901"
            onClick={() => handleDial('+92 81 283 4901')}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <span className="block">Quetta Central Emergency ER Desk</span>
                <span className="text-[10px] text-slate-400">Direct Trauma Ward Reception</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-xs font-mono font-bold">
              Call ER
            </span>
          </a>
        </div>

        {/* Immediate First-Aid Holding Rules */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
          <strong className="text-white block text-[11px] uppercase tracking-wider">
            Critical Holding Instructions while waiting:
          </strong>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Keep the patient in an upright, comfortable resting position.</li>
            <li>Do not administer food, water, or heavy medication.</li>
            <li>Loosen any restrictive collar, belt, or tight clothing.</li>
            <li>Keep entry doors unlocked for incoming paramedic teams.</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close Emergency Protocol Window
          </button>
        </div>
      </div>
    </div>
  );
};
