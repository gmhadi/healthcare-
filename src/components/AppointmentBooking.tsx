import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { CLINICS } from '../data/clinics';
import { AppointmentData, TriageResult } from '../types';
import { generateReferenceCode } from '../utils/triageEngine';
import { soundManager } from '../utils/audio';

interface AppointmentBookingProps {
  triageResult: TriageResult;
  symptomsText: string;
  durationText: string;
  onBackToChat: () => void;
  onBookingConfirmed: (appointment: AppointmentData) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  triageResult,
  symptomsText,
  durationText,
  onBackToChat,
  onBookingConfirmed,
}) => {
  // Select sensible default clinic based on triage/symptom
  const defaultClinicId =
    triageResult.level === 'CRITICAL'
      ? 'quetta-central'
      : symptomsText.toLowerCase().includes('joint') || symptomsText.toLowerCase().includes('back') || symptomsText.toLowerCase().includes('knee') || symptomsText.toLowerCase().includes('muscle')
      ? 'wellness-physio'
      : 'city-health';

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    clinicId: defaultClinicId,
    preferredDate: todayStr,
    preferredTime: '10:30 AM',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedClinic = CLINICS.find((c) => c.id === formData.clinicId) || CLINICS[0];

  const timeSlots = [
    '09:00 AM',
    '09:45 AM',
    '10:30 AM',
    '11:15 AM',
    '02:00 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Please enter your full name';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = 'Please provide a valid phone number for SMS confirmation';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please choose a date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    soundManager.playPop();

    setTimeout(() => {
      const refCode = generateReferenceCode(formData.clinicId);
      const newAppointment: AppointmentData = {
        id: `apt-${Date.now()}`,
        referenceNumber: refCode,
        patientName: formData.patientName,
        phone: formData.phone,
        email: formData.email || `${formData.patientName.toLowerCase().replace(/\s+/g, '')}@patient.org`,
        clinicId: formData.clinicId,
        clinicName: selectedClinic.name,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        symptomsSummary: symptomsText,
        triageLevel: triageResult.level,
        severityScore: triageResult.score,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        status: 'Confirmed'
      };

      onBookingConfirmed(newAppointment);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Back button */}
      <button
        id="booking-btn-back"
        onClick={onBackToChat}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Symptom Chat</span>
      </button>

      {/* Triage summary header pill */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border mb-6 ${
          triageResult.level === 'CRITICAL'
            ? 'bg-red-950/30 border-red-500/40 glow-critical'
            : triageResult.level === 'URGENT'
            ? 'bg-amber-950/30 border-amber-500/40 glow-urgent'
            : 'bg-emerald-950/30 border-emerald-500/40 glow-mild'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${triageResult.colorScheme.badgeBg}`}>
                {triageResult.badgeText}
              </span>
              <span className="text-xs text-slate-400">
                Identified: <strong>{triageResult.identifiedKeywords.join(', ')}</strong>
              </span>
            </div>
            <h3 className={`text-base font-bold ${triageResult.colorScheme.accent}`}>
              {triageResult.title}
            </h3>
          </div>
          <div className="text-right sm:text-right shrink-0">
            <span className="text-xs text-slate-400 block">Recommended Target</span>
            <span className="text-xs font-bold text-white">{triageResult.timeframe}</span>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Schedule Clinic Appointment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete patient intake details to reserve immediate clearance at your selected clinic.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                id="booking-input-name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="e.g. Sarah Khan"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.patientName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
              {errors.patientName && (
                <p className="text-[11px] text-red-400 mt-1">{errors.patientName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phone Number (for SMS confirmation) *</span>
              </label>
              <input
                type="tel"
                id="booking-input-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +92 300 1234567"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email Address (for digital pass & records)</span>
            </label>
            <input
              type="email"
              id="booking-input-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. sarah.khan@example.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Clinic Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Medical Center *</span>
            </label>
            <select
              id="booking-select-clinic"
              value={formData.clinicId}
              onChange={(e) => setFormData({ ...formData, clinicId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-all"
            >
              {CLINICS.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name} — {clinic.address}
                </option>
              ))}
            </select>

            {/* Selected Clinic Mini Preview */}
            <div className="mt-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedClinic.address}</span>
              </div>
              <span className="text-emerald-400 font-medium">Avg wait: {selectedClinic.waitTime}</span>
            </div>
          </div>

          {/* Preferred Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Preferred Date *</span>
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredDate: todayStr })}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    formData.preferredDate === todayStr
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  Today ({new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })})
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredDate: tomorrowStr })}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    formData.preferredDate === tomorrowStr
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  Tomorrow
                </button>
              </div>
              <input
                type="date"
                id="booking-input-date"
                value={formData.preferredDate}
                min={todayStr}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Preferred Time Slot *</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTime: slot })}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      formData.preferredTime === slot
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Notes / Chief Complaint */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Additional Symptoms / Patient Notes</span>
            </label>
            <textarea
              id="booking-input-notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any known allergies, ongoing medications, or specific requirements..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              id="booking-submit-btn"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-xl glow-cyan transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing Clearance & Reservation...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  <span>Confirm Appointment Reservation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
