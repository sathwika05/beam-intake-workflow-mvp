export interface Appointment {
  id: number;
  status: string;   // union type for strict values
  start: string;                    // ISO date string
  slot_duration: number;
  patient_id: number | null;        // nullable field
}