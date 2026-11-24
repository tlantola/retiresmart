import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../../domain/models/RetirementBenefitModels';
import {
  MINIMUM_BENEFIT_AMOUNT,
  MAX_REASONABLE_BENEFIT_AMOUNT,
} from '../../domain/rules/BenefitRules';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateRetirementBenefitEstimates(
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[],
): ValidationResult {
  const errors: string[] = [];

  for (const estimate of estimates) {
    if (estimate.monthlyBenefitAmount < MINIMUM_BENEFIT_AMOUNT) {
      errors.push(
        `Age ${estimate.age} monthly benefit amount is below the minimum allowed.`,
      );
    }

    if (estimate.monthlyBenefitAmount > MAX_REASONABLE_BENEFIT_AMOUNT) {
      errors.push(
        `Age ${estimate.age} monthly benefit amount exceeds the maximum allowed.`,
      );
    }
  }

  for (let index = 1; index < estimates.length; index++) {
    const previousEstimate = estimates[index - 1];
    const currentEstimate = estimates[index];

    if (
      currentEstimate.monthlyBenefitAmount <
      previousEstimate.monthlyBenefitAmount
    ) {
      errors.push(
        `Age ${currentEstimate.age} monthly benefit amount must be greater than or equal to age ${previousEstimate.age}.`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
