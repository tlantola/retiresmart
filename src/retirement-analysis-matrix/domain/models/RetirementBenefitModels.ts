export type Age = number;
export type BenefitDollars = number;

export interface PersonalizedMonthlyRetirementBenefitEstimate {
  age: Age;
  monthlyBenefitAmount: BenefitDollars;
}

export interface ClaimingAgeBenefitProjection {
  claimingAge: Age;
  cumulativeBenefitDollarsByAge: Record<Age, BenefitDollars>;
}

export interface RetirementBenefitMatrix {
  claimingAgeBenefits: Record<Age, ClaimingAgeBenefitProjection>;
}

export type CumulativeBenefitDollarsByAge = Record<Age, BenefitDollars>;
export type BenefitProjectionByStartAge = Record<Age, BenefitProjection>;

export interface BenefitEntry {
  age: Age;
  monthlyBenefitAmount: BenefitDollars;
}
export interface BenefitProjection {
  startAge: Age;
  cumulativeBenefitDollarsByAge: CumulativeBenefitDollarsByAge;
}
