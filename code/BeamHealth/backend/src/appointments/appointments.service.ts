import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/common/types/appointments.types';
import { Insurance } from 'src/common/types/insurances.types';
import { Patient } from 'src/common/types/patients.type';
import appointments from '../data/appointments.json';
import insurances from '../data/insurances.json';
import patients from '../data/patients.json';
import { IntakeListDetails } from 'src/common/types/intakeListDetails.types';
import { NextDayAppointmentsService } from './nextDayAppointments.service';
import { buildAppointmentRow } from 'src/common/helpers/intake.helpers';
import { Logger } from '@nestjs/common';
import { BookedAppointmentWithPatient } from 'src/common/types/bookedAppointmentWithPatient.types';


@Injectable()
export class AppointmentsService {
    private appointments:Appointment[]=appointments;
    private insurances:Insurance[]=insurances;
    private patients:Patient[]=patients;
    private readonly logger = new Logger(AppointmentsService.name);
    
    async findAllAppointments(){
        this.logger.log(`Fetching all appointments`);
      return this.appointments;
  }

  async countAppointments(): Promise<number> {
  const count = this.appointments.length;
    this.logger.log(`Total appointments count=${count}`);
    return count;
}
  // helper: get yyyy-mm-dd from "2026-01-14T09:00:00"
   extractDate(dateTime: string): string {
    return dateTime.split('T')[0];
  }

  async findAllAppointmentsByDate(date: string):Promise<Appointment[]>{
       this.logger.log(`Fetching appointments for date=${date}`);
    const result = this.appointments.filter(
      (a) => this.extractDate(a.start) === date,
    );
    this.logger.debug(`Found ${result.length} appointments for date=${date}`);
    return result;
    }

  async findAllAvailableAppointmentsByDate(date: string):Promise<Appointment[]>{
     this.logger.log(`Fetching AVAILABLE appointments for date=${date}`);
    const result = this.appointments.filter(
      (a) =>
        this.extractDate(a.start) === date && a.status === 'available',
    );
    this.logger.debug(
      `Found ${result.length} available appointments for date=${date}`,
    );
    return result;  }

 async findBookedAppointmentsByDateWithPatient(date: string): Promise<BookedAppointmentWithPatient[]> {
  this.logger.log(`Fetching BOOKED appointments + patient for date=${date}`);

  const booked = this.appointments.filter(
    (a) => this.extractDate(a.start) === date && a.status === 'booked' && a.patient_id !== null,
  );

  const result = booked
    .map((a) => {
      const patient = this.patients.find((p) => p.id === a.patient_id);
      if (!patient) {
        this.logger.warn(`Missing patient for appointmentId=${a.id}, patient_id=${a.patient_id}`);
        return null;
      }
      return { appointment: a, patient };
    })
    .filter((x): x is BookedAppointmentWithPatient => x !== null);

  this.logger.debug(`Found ${result.length} booked appointments with patient for date=${date}`);
  return result;
}

 async findAppointmentWithPatientStatusById(apptId:number):Promise<IntakeListDetails | undefined> {

    this.logger.log(
      `Starting findAppointmentWithPatientStatusById apptId=${apptId}`,
    );
    
     // 1. Find the appointment
  const appt = this.appointments.find(a => a.id === apptId);
  if (!appt ||appt.patient_id === null) {
      this.logger.warn(
        `Appointment has no patient attached apptId=${apptId}`,
      );
      return undefined;
    }
  // 2. Find the patient
  const patient = this.patients.find((p) => p.id === appt.patient_id);
    if (!patient) {
      this.logger.error(
        `Patient not found patientId=${appt.patient_id} for apptId=${apptId}`,
      );
      return undefined;
    }

    this.logger.debug(
      `Found patientId=${patient.id} for apptId=${apptId}`,
    );

  // 3. Build enriched appointment row (intake_status + eligibility_status)
  const apptRow = await buildAppointmentRow(appt, patient, this.insurances);
  
  this.logger.debug(
      `Computed intake_status=${apptRow.intake_status}, eligibility_status=${apptRow.eligibility_status} for apptId=${apptId}`,
    );

   // 4. Build final IntakeListDetails shape
  const result: IntakeListDetails = {
    patient_id: patient.id,
    first_name: patient.first_name,
    last_name: patient.last_name,
    email: patient.email,
    phone: patient.phone,
    gender: patient.gender,
    appointment_id: apptRow.id,
    appointment_time: apptRow.start,
    slot_duration: String(apptRow.slot_duration),
    intake_status: apptRow.intake_status,
    eligibility_status: apptRow.eligibility_status,
  };

    this.logger.log(
      `Successfully built IntakeListDetails for apptId=${apptId}`,
    );
     return result;
  }
 

}
