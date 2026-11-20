import type {
  Age,
  BenefitDollars,
  ClaimingAgeBenefitProjection,
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../models/RetirementBenefitModels';

export function calculateRetirementBenefitMatrix(
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[],
  projectionEndAge: number,
): RetirementBenefitMatrix {
  const claimingAgeBenefits: Record<number, ClaimingAgeBenefitProjection> = {};

  estimates.forEach((estimate) => {
    const annualBenefit = estimate.monthlyBenefitAmount * 12;
    const cumulativeBenefitDollarsByAge: Record<Age, BenefitDollars> = {};

    let cumulativeBenefits = 0;

    for (let age = estimate.age; age <= projectionEndAge; age++) {
      cumulativeBenefits += annualBenefit;

      cumulativeBenefitDollarsByAge[age] = cumulativeBenefits;
    }
    claimingAgeBenefits[estimate.age] = {
      claimingAge: estimate.age,
      cumulativeBenefitDollarsByAge,
    };
  });

  return {
    claimingAgeBenefits,
  };
}
