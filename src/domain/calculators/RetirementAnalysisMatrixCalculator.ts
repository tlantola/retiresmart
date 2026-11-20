import {
  DEFAULT_ANALYSIS_END_AGE,
  MINIMUM_CLAIMING_AGE,
  isAgeBeforeBenefitStart,
} from '../BenefitRules';
import type {
  BenefitEntry,
  BenefitProjectionByStartAge,
  CumulativeBenefitDollarsByAge,
} from '../types';

export function calculateCumulativeBenefits(
  benefits: BenefitEntry[],
  maxAge = DEFAULT_ANALYSIS_END_AGE,
) {
  const results: BenefitProjectionByStartAge = {};

  benefits.forEach((entry) => {
    let cumulativeBenefitDollars = 0;

    const cumulativeBenefitDollarsByAge: CumulativeBenefitDollarsByAge = {};

    for (let age = MINIMUM_CLAIMING_AGE; age <= maxAge; age++) {
      if (!isAgeBeforeBenefitStart(age, entry.age)) {
        cumulativeBenefitDollars += entry.monthlyBenefit * 12;
      }

      cumulativeBenefitDollarsByAge[age] = cumulativeBenefitDollars;
    }

    results[entry.age] = { startAge: entry.age, cumulativeBenefitDollarsByAge };
  });

  return results;
}
