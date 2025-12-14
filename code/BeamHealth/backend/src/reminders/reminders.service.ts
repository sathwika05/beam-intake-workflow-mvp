import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { NextDayAppointmentsService } from 'src/appointments/nextDayAppointments.service';
import { IntakeListDetails } from 'src/common/types/intakeListDetails.types';
import { EmailService } from 'src/email/email.service';
import { LlmService } from 'src/llm/llm.service';

@Injectable()
export class RemindersService {
    private readonly logger = new Logger(RemindersService.name);

    constructor(
      private readonly appointmentService: AppointmentsService,
      private readonly nextDayappointmentService: NextDayAppointmentsService,
      private readonly emailService: EmailService,
      private readonly llmService: LlmService,
    ){}

     // shared logic used by cron + manual endpoint
  async runTomorrowAppointmentReminders(): Promise<void> {
    this.logger.log('Running reminder job for tomorrow appointments...');

    const appts: IntakeListDetails[] =
      await this.nextDayappointmentService.findNextDayAppointmentsWithPatientStatus();

    for (const appt of appts) {
      if (!appt.patient_id) continue;
      // tiny delay so Mailtrap doesn't send failure
      await new Promise((resolve) => setTimeout(resolve, 1000));
   
      await this.sendReminderForAppointmentInternal(appt);
    }
  }

  @Cron('08 16 * * *')
  async sendTomorrowAppointmentReminders() {
    console.log("***********************************************Cron triggered***********************************************");
    await this.runTomorrowAppointmentReminders();
  }

   // send reminder for a single appointment by id
  async sendReminderForAppointment(appointmentId: number): Promise<void> {

    const appt: IntakeListDetails | undefined =
      await this.appointmentService.findAppointmentWithPatientStatusById(appointmentId);

    if (!appt) {
      throw new NotFoundException(
        `Appointment with id ${appointmentId} not found`,
      );
    }

    if (!appt.patient_id) {
      throw new BadRequestException(
        `Appointment ${appointmentId} has no patient linked`,
      );
    }

    await this.sendReminderForAppointmentInternal(appt);
  }

  //internal helper (used by both cron + manual single-send)
  private async sendReminderForAppointmentInternal(
    appt: IntakeListDetails,
  ): Promise<void> {
    const subject = 'Appointment reminder';
    const text = await this.llmService.buildReminderEmail(appt);

    await this.emailService.send(appt.email, subject, text);

    this.logger.log(
      `Reminder sent to ${appt.patient_id} (${appt.email}) for appt #${appt.appointment_id}`,
    );
  }

}

