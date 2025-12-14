import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/common/types/appointments.types';
import { Insurance } from 'src/common/types/insurances.types';
import { Patient } from 'src/common/types/patients.type';
import appointments from '../data/appointments.json';
import insurances from '../data/insurances.json';
import patients from '../data/patients.json';

@Injectable()
export class InsurancesService {
     private appointments:Appointment[]=appointments;
     private insurances:Insurance[]=insurances;
     private patients:Patient[]=patients;

    async findAllInsurances(){
     return this.insurances;
  }

  async countInsurances(): Promise<number> {
    return this.insurances.length;
  }
}
