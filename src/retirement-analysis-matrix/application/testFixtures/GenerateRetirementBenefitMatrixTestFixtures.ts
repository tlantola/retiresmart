import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../../domain/models/RetirementBenefitModels';
import {
  MAXIMUM_REASONABLE_CLAIMING_AGE,
  MINIMUM_CLAIMING_AGE,
} from '../../domain/rules/BenefitRules';

export function createCompleteEstimateSet(
  monthlyBenefitAmounts: readonly number[] = [
    2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
  ],
): PersonalizedMonthlyRetirementBenefitEstimate[] {
  const estimateCount =
    MAXIMUM_REASONABLE_CLAIMING_AGE - MINIMUM_CLAIMING_AGE + 1;

  if (monthlyBenefitAmounts.length !== estimateCount) {
    throw new Error(
      `A complete claiming age estimate set requires ${estimateCount} estimates.`,
    );
  }

  return monthlyBenefitAmounts.map((monthlyBenefitAmount, index) => ({
    age: MINIMUM_CLAIMING_AGE + index,
    monthlyBenefitAmount,
  }));
}
