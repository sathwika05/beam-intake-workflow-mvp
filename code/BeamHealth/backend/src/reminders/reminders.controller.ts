import { Body, Controller, Post } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { SendReminderDto } from './dto/sendReminder.dto';

@Controller('reminders')
export class RemindersController {
   constructor(private readonly remindersService: RemindersService){}
   
    /**
   * POST /reminders/send-one
   *
   * Triggers a reminder for a specific appointment.
   * The action is context-aware and intended to be used only when outreach is required, reducing staff errors
   *  and unnecessary patient notifications.
   */
  @Post('send-one')
  async sendOne(@Body() body: SendReminderDto) {
    await this.remindersService.sendReminderForAppointment(body.appointmentId);

    return {
      message: `Reminder triggered for appointment ${body.appointmentId}`,
    };
  }
}
