import type {
  ClaimingAgeBenefits,
  CumulativeBenefitAmountByAge,
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../models/RetirementBenefitModels';

export function calculateRetirementBenefitMatrix(
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[],
  projectionEndAge: number,
): RetirementBenefitMatrix {
  const claimingAgeBenefits: ClaimingAgeBenefits = {};

  estimates.forEach((estimate) => {
    const annualBenefit = estimate.monthlyBenefitAmount * 12;
    const cumulativeBenefitAmountByAge: CumulativeBenefitAmountByAge = {};

    let cumulativeBenefits = 0;

    for (let age = estimate.age; age <= projectionEndAge; age++) {
      cumulativeBenefits += annualBenefit;

      cumulativeBenefitAmountByAge[age] = cumulativeBenefits;
    }
    claimingAgeBenefits[estimate.age] = {
      claimingAge: estimate.age,
      cumulativeBenefitAmountByAge: cumulativeBenefitAmountByAge,
    };
  });

  return {
    claimingAgeBenefits,
  };
}
