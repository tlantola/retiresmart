import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../../domain/models/RetirementBenefitModels';

export function areRetirementBenefitEstimatesValid(
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[],
): boolean {
  for (let index = 1; index < estimates.length; index++) {
    const previousEstimate = estimates[index - 1];
    const currentEstimate = estimates[index];

    if (
      currentEstimate.monthlyBenefitAmount <
      previousEstimate.monthlyBenefitAmount
    ) {
      return false;
    }
  }

  return true;
}
