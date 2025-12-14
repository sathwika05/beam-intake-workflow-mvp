import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {

    constructor(private readonly patientService:PatientsService ){}

     /**
   * GET /patients/getAllPatients
   *
   * Returns the complete patient directory with
   * demographic and contact information.
   * Used for intake and scheduling context.
   */
     @Get("/getAllPatients")
      async getPatients(){
          const patients=await this.patientService.findAllPatients();
          return patients;
      }

      /**
   * GET /patients/count
   *
   * Returns the total number of patients.
   */
      @Get('/count')
      async getPatientsCount() {
         return { count: await this.patientService.countPatients() };
     }

       /**
   * GET /patients/getPatientInsuranceById/:id/insurance
   *
   * Returns a patient’s profile enriched with insurance eligibility and copay details.
   */
       @Get("/getPatientInsuranceById/:id/insurance")
       async getInsuranceOfPatient(@Param('id') id: number){
      return await this.patientService.findInsuranceByPatiendId(id);
  }
}
