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

export interface GenerateRetirementBenefitMatrixRequest {
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[];
  projectionEndAge: Age;
}

export interface GenerateRetirementBenefitMatrixResponse {
  matrix: RetirementBenefitMatrix;
}
