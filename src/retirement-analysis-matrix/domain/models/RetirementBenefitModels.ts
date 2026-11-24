// Value Types
export type Age = number;
export type MonthlyBenefitAmount = number;
export type CumulativeBenefitAmount = number;

// Collection Types
export type CumulativeBenefitAmountByAge = Record<Age, CumulativeBenefitAmount>;

export type ClaimingAgeBenefits = Record<Age, ClaimingAgeBenefitProjection>;

// Domain Objects
export interface PersonalizedMonthlyRetirementBenefitEstimate {
  age: Age;
  monthlyBenefitAmount: MonthlyBenefitAmount;
}

export interface ClaimingAgeBenefitProjection {
  claimingAge: Age;
  cumulativeBenefitAmountByAge: CumulativeBenefitAmountByAge;
}

export interface RetirementBenefitMatrix {
  claimingAgeBenefits: ClaimingAgeBenefits;
}
