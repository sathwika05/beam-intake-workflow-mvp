import { BadRequestException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetAppointmentsDto } from 'src/appointments/dto/getappointments.dto';
import { NextDayAppointmentsService } from './nextDayAppointments.service';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService:AppointmentsService,
        private readonly nextDayAppointmentsService:NextDayAppointmentsService){}

  @Get("/getAllAppointments")
  async getAppointments(@Query() query: GetAppointmentsDto ){
      return await this.appointmentsService.findAllAppointments();
  }

@Get('/count')
async getAppointmentsCount() {
  return { count: await this.appointmentsService.countAppointments() };
}

// GET /appointments/ ?date=2026-01-13
  @Get('booked')
  async getBookedByDate(@Query('date') date: string) {
    if (!date) throw new BadRequestException('date query param is required (YYYY-MM-DD)');
    return this.appointmentsService.findBookedAppointmentsByDateWithPatient(date);
  }

@Get('available')
findAvailable(@Query('date') date: string) {
  return this.appointmentsService.findAllAvailableAppointmentsByDate(date);
}

  @Get("/intake-worklist")
  async getWorkList(@Query('date') date:String){
      return await this.nextDayAppointmentsService.findNextDayAppointmentsWithPatientStatus();
  }



}
