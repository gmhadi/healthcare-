import { Clinic, TestScenario } from '../types';

export const CLINICS: Clinic[] = [
  {
    id: 'quetta-central',
    name: 'Quetta Central Clinic',
    city: 'Quetta',
    address: 'Main Gulistan Road, Near Medical Complex, Quetta',
    phone: '+92 81 283 4901',
    waitTime: '10 - 15 mins',
    rating: 4.9,
    specialties: ['General Medicine', 'Cardiology', 'Emergency Intake', 'Pediatrics'],
    availableToday: true,
    badge: 'Priority Emergency Response Center'
  },
  {
    id: 'city-health',
    name: 'City Health Center',
    city: 'Quetta',
    address: 'Jinnah Avenue, Sector 4, Quetta District',
    phone: '+92 81 289 1144',
    waitTime: '15 - 20 mins',
    rating: 4.8,
    specialties: ['Family Medicine', 'Internal Medicine', 'Diagnostics & Lab', 'ENT'],
    availableToday: true,
    badge: 'Fast-Track Walk-in & Appointments'
  },
  {
    id: 'wellness-physio',
    name: 'Wellness Physiotherapy Center',
    city: 'Quetta',
    address: 'Airport Road, Health City Plaza Suite 102, Quetta',
    phone: '+92 81 285 7720',
    waitTime: '5 - 10 mins',
    rating: 4.9,
    specialties: ['Physical Therapy', 'Orthopedic Rehab', 'Spine & Joint Care', 'Pain Management'],
    availableToday: true,
    badge: 'Specialized Musculoskeletal Unit'
  }
];

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'critical-chest',
    title: 'Critical Emergency Demo',
    level: 'CRITICAL',
    icon: '🚨',
    description: 'Crushing chest pain radiating to left arm with shortness of breath.',
    symptomText: 'I have severe chest pain and difficulty breathing since 30 minutes ago, feeling heavy pressure on my chest.',
    durationText: 'Started today (under an hour)',
    severityValue: 9
  },
  {
    id: 'urgent-fever',
    title: 'Urgent Clinic Demo',
    level: 'URGENT',
    icon: '⚠️',
    description: 'High fever (103°F) with persistent vomiting and acute abdominal cramps.',
    symptomText: 'I have a very high fever with persistent vomiting and severe abdominal pain, unable to keep fluids down.',
    durationText: '1 to 2 days',
    severityValue: 8
  },
  {
    id: 'mild-cold',
    title: 'Routine Care Demo',
    level: 'MILD',
    icon: '🩺',
    description: 'Mild sore throat, nasal congestion, and slight dry cough.',
    symptomText: 'I have a slight sore throat, runny nose, and minor cough when waking up.',
    durationText: '3 to 5 days',
    severityValue: 3
  },
  {
    id: 'mild-physio',
    title: 'Physio / Joint Demo',
    level: 'MILD',
    icon: '🏃',
    description: 'Mild knee stiffness and shoulder muscle ache after gym.',
    symptomText: 'Experiencing lower back ache and slight knee stiffness after physical exercise.',
    durationText: 'About a week',
    severityValue: 4
  }
];
