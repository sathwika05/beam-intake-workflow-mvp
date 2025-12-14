export interface IntakeListDetails {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  appointment_id: number;
  appointment_time: string;
  slot_duration: string;
  intake_status: 'Ready' | 'Missing forms' | 'Insurance issue';
  eligibility_status: string;
  link?: string;
}

export type IntakeStatus = 'Ready' | 'Missing forms' | 'Insurance issue';

export type EligibilityStatus = string;
