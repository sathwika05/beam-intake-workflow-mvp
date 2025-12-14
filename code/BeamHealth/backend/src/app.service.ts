import { Injectable } from '@nestjs/common';
import appointments from './data/appointments.json';
import insurances from './data/insurances.json';
import patients from './data/patients.json';
import { Appointment } from './common/types/appointments.types';
import { Insurance } from './common/types/insurances.types';
import { Patient } from './common/types/patients.type';


@Injectable()
export class AppService {
  private appointments:Appointment[]=appointments;
  private insurances:Insurance[]=insurances;
  private patients:Patient[]=patients;

  getHello(): string {
    return 'Hello World!';
  }

 

  


  
  
}
