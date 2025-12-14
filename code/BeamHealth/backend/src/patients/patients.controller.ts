import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {

    constructor(private readonly patientService:PatientsService ){}

     @Get("/getAllPatients")
      async getPatients(){
          const patients=await this.patientService.findAllPatients();
          return patients;
      }

      @Get('/count')
      async getPatientsCount() {
         return { count: await this.patientService.countPatients() };
     }

       @Get("/getPatientInsuranceById/:id/insurance")
       async getInsuranceOfPatient(@Param('id') id: number){
      return await this.patientService.findInsuranceByPatiendId(id);
  }
}
