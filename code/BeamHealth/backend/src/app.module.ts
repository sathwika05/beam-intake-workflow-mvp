import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { EmailModule } from './email/email.module';
import { LlmModule } from './llm/llm.module';
import { RemindersModule } from './reminders/reminders.module';
import { PatientsModule } from './patients/patients.module';
import { InsurancesModule } from './insurances/insurances.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),AppointmentsModule, EmailModule, LlmModule, RemindersModule, PatientsModule, InsurancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
