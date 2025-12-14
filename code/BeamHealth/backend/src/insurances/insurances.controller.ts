import { Controller, Get } from '@nestjs/common';
import { InsurancesService } from './insurances.service';

@Controller('insurances')
export class InsurancesController {
  constructor(private readonly insuranceService:InsurancesService){}

/**
   * GET /insurances/getAllInsurances
   *
   * Returns all insurance plans supported by the system,
   * including payer, plan type, eligibility status, and copay details.
   */
 @Get("/getAllInsurances")
  async getInsurances(){
     const insurances= await this.insuranceService.findAllInsurances();
     return insurances;
  }

   /**
   * GET /insurances/count
   *
   * Returns the total number of insurance plans.
   */
   @Get('/count')
  async getInsuranceCount() {
    const count = await this.insuranceService.countInsurances();
    return { count };
  }

}
