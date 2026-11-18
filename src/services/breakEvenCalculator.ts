import {
  DEFAULT_ANALYSIS_END_AGE,
  MINIMUM_CLAIMING_AGE,
  isAgeBeforeBenefitStart,
} from '../domain/BenefitRules';
import type { Age, BenefitDollars, BenefitEntry } from '../domain/types';

export function calculateCumulativeBenefits(
  benefits: BenefitEntry[],
  maxAge = DEFAULT_ANALYSIS_END_AGE,
) {
  const results: Record<Age, Record<Age, BenefitDollars>> = {};

  benefits.forEach((entry) => {
    let cumulativeBenefitDollars = 0;

    const cumulativeBenefitDollarsByAge: Record<Age, BenefitDollars> = {};

    for (let age = MINIMUM_CLAIMING_AGE; age <= maxAge; age++) {
      if (!isAgeBeforeBenefitStart(age, entry.age)) {
        cumulativeBenefitDollars += entry.monthlyBenefit * 12;
      }

      cumulativeBenefitDollarsByAge[age] = cumulativeBenefitDollars;
    }

    results[entry.age] = cumulativeBenefitDollarsByAge;
  });

  return results;
}
