import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/common/types/appointments.types';
import { Insurance } from 'src/common/types/insurances.types';
import { Patient } from 'src/common/types/patients.type';
import appointments from '../data/appointments.json';
import insurances from '../data/insurances.json';
import patients from '../data/patients.json';
import { AppointmentsService } from './appointments.service';
import { IntakeListDetails } from 'src/common/types/intakeListDetails.types';
import { buildAppointmentRow } from 'src/common/helpers/intake.helpers';
import { Logger } from '@nestjs/common';




@Injectable()
export class NextDayAppointmentsService {
     
    private appointments:Appointment[]=appointments;
    private insurances:Insurance[]=insurances;
    private patients:Patient[]=patients;
    private readonly logger = new Logger(AppointmentsService.name);
    
    constructor(private readonly appointmentsService:AppointmentsService,){}

    private getTomorrowDateString(): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

   

  async findNextDayAppointmentsWithPatientStatus():Promise<IntakeListDetails[]>{
    
    const method = 'findNextDayAppointmentsWithPatientStatus';
    const startedAt = Date.now();

    const tomorrow = this.getTomorrowDateString();
   
    this.logger.log(`[${method}] start | tomorrow=${tomorrow} | totalAppointments=${this.appointments.length}`);

   
    const bookedTomorrow =this.appointments.filter(
      (appt)=>
        this.appointmentsService.extractDate(appt.start)== tomorrow &&
        appt.status === 'booked' && appt.patient_id!==null,
    ); 
    
    this.logger.log(
    `[${method}] filtered booked appointments | tomorrow=${tomorrow} | bookedTomorrowCount=${bookedTomorrow.length}`,
  );
     
      const rows = await Promise.all(
    bookedTomorrow.map(async (appt) => {
      const patient = this.patients.find((p) => p.id === appt.patient_id);
      if (!patient) {
        this.logger.warn(
          `[${method}] missing patient for appointment | appointmentId=${appt.id} | patient_id=${appt.patient_id} | start=${appt.start}`,
        );
        return null;
      }
      try {
      const apptRow = await buildAppointmentRow(
        appt,
        patient,
        this.insurances,
      );

      const intakeRow: IntakeListDetails = {
        patient_id: apptRow.patient_id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        appointment_id: apptRow.id,
        appointment_time: apptRow.start,
        slot_duration: apptRow.slot_duration, 
        intake_status: apptRow.intake_status,
        eligibility_status: apptRow.eligibility_status,
      };
      this.logger.debug(
          `[${method}] built intake row | appointmentId=${appt.id} | patientId=${patient.id} | intake=${intakeRow.intake_status} | eligibility=${intakeRow.eligibility_status}`,
        );

      return intakeRow;
    }
    catch (err: any) {
        this.logger.error(
          `[${method}] failed to build row | appointmentId=${appt.id} | patientId=${patient.id} | start=${appt.start} | error=${err?.message ?? err}`,
          err?.stack,
        );
        return null;
      }
    }),
  );

    // Filter out nulls 
  return rows.filter(
    (row): row is IntakeListDetails => row !== null,
  );
}

 

}




