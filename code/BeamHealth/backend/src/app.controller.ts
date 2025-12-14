import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetAppointmentsDto } from './appointments/dto/getappointments.dto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 

  

 


  

}
