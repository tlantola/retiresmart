import type { BenefitEntry } from '../types/retirement';

export function calculateCumulativeBenefits(
  benefits: BenefitEntry[],
  maxAge = 90
) {
  const results: Record<number, number[]> = {};

  benefits.forEach((entry) => {
    let cumulative = 0;
    const yearlyTotals: number[] = [];

    for (let age = 62; age <= maxAge; age++) {
      if (age >= entry.age) {
        cumulative += entry.monthlyBenefit * 12;
      }

      yearlyTotals.push(cumulative);
    }

    results[entry.age] = yearlyTotals;
  });

  return results;
}
