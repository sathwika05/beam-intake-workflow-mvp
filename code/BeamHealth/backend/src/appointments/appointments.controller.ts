import { BadRequestException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetAppointmentsDto } from 'src/appointments/dto/getappointments.dto';
import { NextDayAppointmentsService } from './nextDayAppointments.service';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService:AppointmentsService,
        private readonly nextDayAppointmentsService:NextDayAppointmentsService){}

   /**
   * GET /appointments/getAllAppointments
   *
   * Returns all appointment slots (booked + available).
   */
  @Get("/getAllAppointments")
  async getAppointments(@Query() query: GetAppointmentsDto ){
      return await this.appointmentsService.findAllAppointments();
  }

   /**
   * GET /appointments/count
   *
   * Returns the total number of appointments.
   */

@Get('/count')
async getAppointmentsCount() {
  return { count: await this.appointmentsService.countAppointments() };
}

/**
   * GET /appointments/booked?date=YYYY-MM-DD
   *
   * Returns booked appointments for a specific date,
   * enriched with patient context for intake review.
   */

// GET /appointments/ ?date=2026-01-13
  @Get('booked')
  async getBookedByDate(@Query('date') date: string) {
    if (!date) throw new BadRequestException('date query param is required (YYYY-MM-DD)');
    return this.appointmentsService.findBookedAppointmentsByDateWithPatient(date);
  }

   /**
   * GET /appointments/available?date=YYYY-MM-DD
   *
   * Returns open appointment slots for a given date.
   * Supports scheduling optimization and availability planning.
   */

@Get('available')
findAvailable(@Query('date') date: string) {
  return this.appointmentsService.findAllAvailableAppointmentsByDate(date);
}

 /**
   * GET /appointments/intake-worklist
   *
   * Core Beam workflow endpoint.
   * Provides a unified next-day intake view combining:
   * - appointment details
   * - patient information
   * - intake readiness
   * - insurance eligibility status
   *
   * Designed to reduce staff cognitive load before clinic days.
   */
  
  @Get("/intake-worklist")
  async getWorkList(@Query('date') date:String){
      return await this.nextDayAppointmentsService.findNextDayAppointmentsWithPatientStatus();
  }



}
