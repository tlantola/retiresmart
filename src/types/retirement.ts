export type Age = number;
export type BenefitDollars = number;

export interface BenefitEntry {
  age: Age;
  monthlyBenefit: BenefitDollars;
}

export interface YearlyBenefitResult {
  age: Age;
  cumulativeBenefits: Record<Age, BenefitDollars>;
}

export interface BreakEvenResult {
  startAge: Age;
  breakEvenAge: Age | null;
  advantageAt90: BenefitDollars;
}
