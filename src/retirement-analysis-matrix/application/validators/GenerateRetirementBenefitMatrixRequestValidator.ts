import {
  MINIMUM_CLAIMING_AGE,
  MINIMUM_BENEFIT_AMOUNT,
  MAX_REASONABLE_BENEFIT_AMOUNT,
  isProjectionEndAgeValid,
  isBenefitAmountValid,
  MAXIMUM_REASONABLE_CLAIMING_AGE,
} from '../../domain/rules/BenefitRules';
import type { GenerateRetirementBenefitMatrixRequest } from '../models/GenerateRetirementBenefitMatrixModels';

import type { ValidationResult } from '../models/ValidationResult';

export function validateGenerateRetirementBenefitMatrixRequest(
  request: GenerateRetirementBenefitMatrixRequest,
): ValidationResult {
  const errors: string[] = [];

  // Request-level validation.
  if (!isProjectionEndAgeValid(request.projectionEndAge)) {
    errors.push(`Projection end age must be at least ${MINIMUM_CLAIMING_AGE}.`);
  }

  const expectedEstimateCount =
    MAXIMUM_REASONABLE_CLAIMING_AGE - MINIMUM_CLAIMING_AGE + 1;
  if (request.estimates.length !== expectedEstimateCount) {
    errors.push(
      `Retirement benefit estimates must be provided for all claiming ages from ${MINIMUM_CLAIMING_AGE} through ${MAXIMUM_REASONABLE_CLAIMING_AGE}.`,
    );
  }

  // Per-estimate validation.
  for (let index = 0; index < request.estimates.length; index++) {
    const expectedAge = MINIMUM_CLAIMING_AGE + index;
    const currentEstimate = request.estimates[index];

    if (currentEstimate.age !== expectedAge) {
      errors.push(
        `Expected claiming age ${expectedAge} but found ${currentEstimate.age}.`,
      );
    }

    if (request.projectionEndAge < currentEstimate.age) {
      errors.push(
        `Projection end age must be greater than or equal to claiming age ${currentEstimate.age}.`,
      );
    }

    if (!isBenefitAmountValid(currentEstimate.monthlyBenefitAmount)) {
      errors.push(
        `Age ${currentEstimate.age} monthly benefit amount must be between ${MINIMUM_BENEFIT_AMOUNT} and ${MAX_REASONABLE_BENEFIT_AMOUNT}.`,
      );
    }
  }

  // Cross-estimate validation: Ensure that the monthly benefit amounts are increasing with age.
  for (let index = 1; index < request.estimates.length; index++) {
    const previousEstimate = request.estimates[index - 1];
    const currentEstimate = request.estimates[index];

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
