import { Controller, Get } from '@nestjs/common';
import { InsurancesService } from './insurances.service';

@Controller('insurances')
export class InsurancesController {
  constructor(private readonly insuranceService:InsurancesService){}

 @Get("/getAllInsurances")
  async getInsurances(){
     const insurances= await this.insuranceService.findAllInsurances();
     return insurances;
  }

   @Get('/count')
  async getInsuranceCount() {
    const count = await this.insuranceService.countInsurances();
    return { count };
  }

}
