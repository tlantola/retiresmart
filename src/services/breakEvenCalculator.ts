import type { Age, BenefitDollars, BenefitEntry } from '../types/retirement';

export function calculateCumulativeBenefits(
  benefits: BenefitEntry[],
  maxAge = 90
) {
  const results: Record<
    Age,
    Record<Age, BenefitDollars>
  > = {};

  benefits.forEach((entry) => {
    let cumulativeBenefitDollars  = 0;

    const cumulativeBenefitDollarsByAge: Record<
      Age,
      BenefitDollars
    > = {};

    for (let age = 62; age <= maxAge; age++) {
      if (age >= entry.age) {
        cumulativeBenefitDollars  += entry.monthlyBenefit * 12;
      }

      cumulativeBenefitDollarsByAge[age] = cumulativeBenefitDollars ;
    }

    results[entry.age] = cumulativeBenefitDollarsByAge;
  });

  return results;
}
