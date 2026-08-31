import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { AppointmentBooking } from './components/AppointmentBooking';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { EmergencyModal } from './components/EmergencyModal';
import { MultiChannelModal } from './components/MultiChannelModal';
import { AppointmentData, TriageResult, TestScenario } from './types';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'booking' | 'confirmation'>('landing');
  const [activeScenario, setActiveScenario] = useState<TestScenario | null>(null);
  
  // Triage state passed from chat to booking
  const [currentTriageResult, setCurrentTriageResult] = useState<TriageResult | null>(null);
  const [symptomsSummary, setSymptomsSummary] = useState<string>('');
  const [durationSummary, setDurationSummary] = useState<string>('');
  
  // Confirmed appointment state
  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentData | null>(null);

  // Modals
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isMultiChannelModalOpen, setIsMultiChannelModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.enabled = nextVal;
    if (nextVal) {
      soundManager.playPop();
    }
  };

  const handleStartTriage = (scenario?: TestScenario) => {
    if (scenario) {
      setActiveScenario(scenario);
    } else {
      setActiveScenario(null);
    }
    setCurrentView('chat');
  };

  const handleStartBooking = (triageResult: TriageResult, symptomsText: string, durationText: string) => {
    setCurrentTriageResult(triageResult);
    setSymptomsSummary(symptomsText);
    setDurationSummary(durationText);
    setCurrentView('booking');
  };

  const handleBookingConfirmed = (appointment: AppointmentData) => {
    setConfirmedAppointment(appointment);
    setCurrentView('confirmation');
  };

  const handleResetToLanding = () => {
    setActiveScenario(null);
    setCurrentTriageResult(null);
    setConfirmedAppointment(null);
    setCurrentView('landing');
  };

  const handleResetToChat = () => {
    setActiveScenario(null);
    setCurrentTriageResult(null);
    setConfirmedAppointment(null);
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Futuristic Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'landing') handleResetToLanding();
          if (view === 'chat') handleResetToChat();
        }}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenMultiChannel={() => setIsMultiChannelModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartTriage={handleStartTriage}
            onOpenMultiChannel={() => setIsMultiChannelModalOpen(true)}
          />
        )}

        {currentView === 'chat' && (
          <ChatInterface
            onStartBooking={handleStartBooking}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            onOpenMultiChannel={() => setIsMultiChannelModalOpen(true)}
            initialScenario={activeScenario}
          />
        )}

        {currentView === 'booking' && currentTriageResult && (
          <AppointmentBooking
            triageResult={currentTriageResult}
            symptomsText={symptomsSummary}
            durationText={durationSummary}
            onBackToChat={() => setCurrentView('chat')}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}

        {currentView === 'confirmation' && confirmedAppointment && (
          <ConfirmationScreen
            appointment={confirmedAppointment}
            onStartNewTriage={handleResetToChat}
          />
        )}
      </main>

      {/* Emergency Protocol Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Multi-Channel Integration Preview Modal */}
      <MultiChannelModal
        isOpen={isMultiChannelModalOpen}
        onClose={() => setIsMultiChannelModalOpen(false)}
      />
    </div>
  );
}
