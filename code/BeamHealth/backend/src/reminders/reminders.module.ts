import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { EmailModule } from 'src/email/email.module';
import { LlmModule } from 'src/llm/llm.module';

@Module({
  imports: [AppointmentsModule, EmailModule, LlmModule],
  providers: [RemindersService],
  controllers: [RemindersController],
  exports: [RemindersService],
})
export class RemindersModule {}
