import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/common/types/appointments.types';
import { Insurance } from 'src/common/types/insurances.types';
import { Patient } from 'src/common/types/patients.type';
import appointments from '../data/appointments.json';
import insurances from '../data/insurances.json';
import patients from '../data/patients.json';

@Injectable()
export class PatientsService {

  private appointments:Appointment[]=appointments;
  private insurances:Insurance[]=insurances;
  private patients:Patient[]=patients;

     async findAllPatients(){
     return this.patients;
  }

    async countPatients(): Promise<number> {
  return this.patients.length;
}
    async findInsuranceByPatiendId(id:number){
      //Find the existence of patient_id
      const patient=this.patients.find(p=>{return p.id==id});
      if(!patient){
        throw new Error(`Patient with ${id} not found`);
      }
      //check whether patient has insurance or not 
      if(!patient.insurance_id){
        throw new Error(`Patient with ${id} does not have insurance`);
      }

      //Find the insurance record
      const insurance=insurances.find(i=>{return i.id==patient.insurance_id});

      if(!insurance){
        throw new Error(`Insurance with id ${patient.insurance_id} not found for patient ${id}`);
      }
     const {id:insurance_id,...allInsurancefields}={...insurance};
      return {...patient,...allInsurancefields};
  }


}
