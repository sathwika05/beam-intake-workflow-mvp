export interface BaseInsurance {
  id: number;
  payer: string;
  plan: string;
}

export interface EligibleInsurance extends BaseInsurance {
  eligible: boolean;     // discriminator
  coPay: number;      // exists only when eligible = true
}

export interface IneligibleInsurance extends BaseInsurance {
  eligible: boolean;    // discriminator
  reason: string;     // exists only when eligible = false
}

export type Insurance = EligibleInsurance | IneligibleInsurance;
