import { Appointment } from "./appointments.types";
import { Patient } from "./patients.type";



export type BookedAppointmentWithPatient = {
  appointment: Appointment;
  patient: Patient;
};