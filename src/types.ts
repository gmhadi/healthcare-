export type TriageLevel = 'CRITICAL' | 'URGENT' | 'MILD';

export interface TriageResult {
  level: TriageLevel;
  title: string;
  badgeText: string;
  score: number; // 1-10
  identifiedKeywords: string[];
  summary: string;
  recommendation: string;
  protocolAction: string;
  timeframe: string;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    glow: string;
    accent: string;
    iconBg: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  isTyping?: boolean;
  triageResult?: TriageResult;
  options?: string[];
  requiresSeverityScale?: boolean;
  requiresDurationPicker?: boolean;
  showBookingTrigger?: boolean;
}

export interface Clinic {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  waitTime: string;
  rating: number;
  specialties: string[];
  availableToday: boolean;
  badge?: string;
}

export interface AppointmentData {
  id: string;
  referenceNumber: string;
  patientName: string;
  phone: string;
  email: string;
  clinicId: string;
  clinicName: string;
  preferredDate: string;
  preferredTime: string;
  symptomsSummary: string;
  triageLevel: TriageLevel;
  severityScore?: number;
  notes?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Medical Review';
}

export interface TestScenario {
  id: string;
  title: string;
  level: TriageLevel;
  icon: string;
  description: string;
  symptomText: string;
  durationText: string;
  severityValue: number;
}
