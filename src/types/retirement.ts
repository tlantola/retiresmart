import type { Age, BenefitDollars } from '../domain/types';

export interface YearlyBenefitResult {
  age: Age;
  cumulativeBenefits: Record<Age, BenefitDollars>;
}

export interface BreakEvenResult {
  startAge: Age;
  breakEvenAge: Age | null;
  advantageAt90: BenefitDollars;
}
