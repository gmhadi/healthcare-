import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  Download, 
  RotateCcw, 
  Share2, 
  QrCode,
  Sparkles,
  Printer
} from 'lucide-react';
import { AppointmentData } from '../types';

interface ConfirmationScreenProps {
  appointment: AppointmentData;
  onStartNewTriage: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  appointment,
  onStartNewTriage,
}) => {
  const [copied, setCopied] = useState(false);
  const [addedCalendar, setAddedCalendar] = useState(false);

  const copyRefNumber = () => {
    navigator.clipboard.writeText(appointment.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    // Generate .ics calendar format
    const title = encodeURIComponent(`MediTriage Appointment: ${appointment.clinicName}`);
    const details = encodeURIComponent(
      `Appointment Ref: ${appointment.referenceNumber}\nClinic: ${appointment.clinicName}\nTriage Priority: ${appointment.triageLevel}\nPatient: ${appointment.patientName}`
    );
    const location = encodeURIComponent(appointment.clinicName);
    
    // Quick Google Calendar event URL
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
    setAddedCalendar(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Glow pulse container */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-teal-500/40 shadow-2xl backdrop-blur-xl glow-teal overflow-hidden">
        
        {/* Futuristic accent header lines */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400" />
        
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 mb-4 glow-mild">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
            Verified Medical Intake Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Appointment Confirmed!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md">
            Confirmation & digital triage ticket sent to your email (<strong className="text-white">{appointment.email}</strong>) and SMS (<strong className="text-white">{appointment.phone}</strong>).
          </p>

          {/* Reference Code Box */}
          <div className="mt-6 w-full max-w-sm p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Official Reference ID
              </span>
              <span className="text-lg font-mono font-bold text-cyan-300 tracking-wider">
                {appointment.referenceNumber}
              </span>
            </div>
            <button
              id="confirm-copy-ref"
              onClick={copyRefNumber}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs"
              title="Copy Reference ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Appointment Details Card */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Intake Clearance Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Patient Name */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
              <User className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Patient Name</span>
                <span className="font-semibold text-white text-sm">{appointment.patientName}</span>
              </div>
            </div>

            {/* Clinic */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Assigned Clinic</span>
                <span className="font-semibold text-white text-sm">{appointment.clinicName}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Scheduled Date</span>
                <span className="font-semibold text-white text-sm">
                  {new Date(appointment.preferredDate).toLocaleDateString([], {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Time Slot */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Reserved Slot</span>
                <span className="font-semibold text-white text-sm">{appointment.preferredTime}</span>
              </div>
            </div>
          </div>

          {/* Triage Urgency Level */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Clinical Triage Level:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                appointment.triageLevel === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : appointment.triageLevel === 'URGENT'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {appointment.triageLevel} PRIORITY
            </span>
          </div>

          {/* QR Code Digital Pass Simulation */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <div className="text-xs text-slate-400">
              <span className="text-slate-200 font-semibold block">
                Digital Pass Ready
              </span>
              <span>Present this pass at clinic reception desk for express check-in without waiting in routine queue.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            id="confirm-btn-calendar"
            onClick={handleAddToCalendar}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{addedCalendar ? 'Added to Calendar!' : 'Add to Google Calendar'}</span>
          </button>

          <button
            id="confirm-btn-print"
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <button
            id="confirm-btn-new-triage"
            onClick={onStartNewTriage}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md glow-cyan transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Check</span>
          </button>
        </div>
      </div>
    </div>
  );
};
