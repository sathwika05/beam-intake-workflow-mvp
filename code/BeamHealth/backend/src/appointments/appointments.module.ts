import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { NextDayAppointmentsService } from './nextDayAppointments.service';

@Module({
  providers: [AppointmentsService,
    NextDayAppointmentsService,
  ],
  exports: [
     AppointmentsService,
     NextDayAppointmentsService, 
  ],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
