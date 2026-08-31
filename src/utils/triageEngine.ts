import { TriageLevel, TriageResult } from '../types';

// Critical keywords as requested by prompt
const CRITICAL_KEYWORDS = [
  'chest pain',
  'chest tightness',
  'chest pressure',
  'difficulty breathing',
  'cant breathe',
  "can't breathe",
  'shortness of breath',
  'severe bleeding',
  'heavy bleeding',
  'unconscious',
  'passed out',
  'fainting',
  'fainted',
  'heart attack',
  'stroke',
  'slurred speech',
  'choking',
  'blue lips',
  'anaphylaxis',
  'severe allergic reaction',
  'coughing blood',
  'vomiting blood'
];

// Urgent keywords as requested by prompt
const URGENT_KEYWORDS = [
  'high fever',
  'fever over 102',
  'fever of 103',
  'fever of 104',
  'persistent vomiting',
  'continuous vomiting',
  'frequent vomiting',
  'cannot keep water down',
  'severe pain',
  'intense pain',
  'unbearable pain',
  'extreme pain',
  'acute pain',
  'broken bone',
  'fracture',
  'deep cut',
  'severe laceration',
  'blood in urine',
  'blood in stool',
  'severe burn',
  'acute asthma attack',
  'severe migraine',
  'stiff neck with fever',
  'severe dehydration',
  'blurred vision sudden'
];

export function analyzeSymptoms(
  symptomText: string,
  durationText: string = '',
  severityScore: number = 5
): TriageResult {
  const combinedText = `${symptomText} ${durationText}`.toLowerCase();
  
  const foundCritical: string[] = [];
  const foundUrgent: string[] = [];

  for (const kw of CRITICAL_KEYWORDS) {
    if (combinedText.includes(kw)) {
      foundCritical.push(kw);
    }
  }

  for (const kw of URGENT_KEYWORDS) {
    if (combinedText.includes(kw)) {
      foundUrgent.push(kw);
    }
  }

  // Determine Level
  let level: TriageLevel = 'MILD';
  let title = 'Routine / Mild Condition';
  let badgeText = 'Level 3 • Routine Care';
  let summary = 'Your symptoms indicate a mild or manageable condition suitable for standard outpatient or routine clinical consultation.';
  let recommendation = 'You can book a routine appointment at your convenience or explore home rest and hydration.';
  let protocolAction = 'Routine Outpatient Booking';
  let timeframe = 'Next 2 to 5 days';

  // Severity override: Pain score 8-10 escalates to URGENT if not critical
  if (severityScore >= 8 && foundCritical.length === 0) {
    foundUrgent.push(`High severity rating (${severityScore}/10)`);
  }

  if (foundCritical.length > 0) {
    level = 'CRITICAL';
    title = 'CRITICAL: Seek emergency care immediately';
    badgeText = 'Level 1 • Critical Emergency';
    summary = `Critical indicators detected (${foundCritical.join(', ')}). This requires prompt medical intervention to prevent serious complications.`;
    recommendation = 'Please call emergency services (911 / 1122) immediately or go to the nearest emergency room.';
    protocolAction = 'Immediate Emergency Medical Response';
    timeframe = 'IMMEDIATE / Under 15 Minutes';
  } else if (foundUrgent.length > 0 || severityScore >= 7) {
    level = 'URGENT';
    title = 'URGENT: Please book an appointment within 24 hours';
    badgeText = 'Level 2 • Urgent Medical Review';
    summary = `Urgent symptoms identified (${foundUrgent.length > 0 ? foundUrgent.join(', ') : `Reported pain severity ${severityScore}/10`}). Medical evaluation is strongly advised within 24 hours.`;
    recommendation = 'Please secure a same-day or priority next-day appointment with a medical practitioner for clinical evaluation.';
    protocolAction = 'Priority 24-Hour Clinical Intake';
    timeframe = 'Within 12 to 24 Hours';
  } else {
    level = 'MILD';
    title = 'MILD: You can book a routine appointment';
    badgeText = 'Level 3 • Routine / Non-Urgent';
    summary = 'No immediate life-threatening or red-flag indicators detected. Symptoms appear manageable through standard outpatient care.';
    recommendation = 'You can book a routine appointment at your convenience or monitor symptoms at home.';
    protocolAction = 'Standard Clinic Appointment';
    timeframe = 'Within 3 to 7 Days';
  }

  // Color theming for futuristic dark aesthetic
  const colorSchemes = {
    CRITICAL: {
      badgeBg: 'bg-red-500/15 text-red-400 border border-red-500/40',
      badgeText: 'text-red-400',
      border: 'border-red-500/40',
      glow: 'glow-critical shadow-red-900/30',
      accent: 'text-red-400',
      iconBg: 'bg-red-500/20 text-red-400'
    },
    URGENT: {
      badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/40',
      badgeText: 'text-amber-300',
      border: 'border-amber-500/40',
      glow: 'glow-urgent shadow-amber-900/30',
      accent: 'text-amber-300',
      iconBg: 'bg-amber-500/20 text-amber-300'
    },
    MILD: {
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
      badgeText: 'text-emerald-300',
      border: 'border-emerald-500/40',
      glow: 'glow-mild shadow-emerald-900/30',
      accent: 'text-emerald-300',
      iconBg: 'bg-emerald-500/20 text-emerald-300'
    }
  };

  return {
    level,
    title,
    badgeText,
    score: severityScore,
    identifiedKeywords: foundCritical.length > 0 ? foundCritical : (foundUrgent.length > 0 ? foundUrgent : ['Routine symptoms']),
    summary,
    recommendation,
    protocolAction,
    timeframe,
    colorScheme: colorSchemes[level]
  };
}

export function generateReferenceCode(clinicId: string): string {
  const clinicPrefix = clinicId === 'quetta-central' ? 'QC' : (clinicId === 'city-health' ? 'CH' : 'WP');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `MT-${randomNum}-${clinicPrefix}${randomChar}`;
}
