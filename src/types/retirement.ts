export interface BenefitEntry {
  age: number;
  monthlyBenefit: number;
}

export interface YearlyBenefitResult {
  age: number;
  cumulativeBenefits: Record<number, number>;
}

export interface BreakEvenResult {
  startAge: number;
  breakEvenAge: number | null;
  advantageAt90: number;
}
