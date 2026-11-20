import { describe, it, expect } from 'vitest';
import { calculateCumulativeBenefits } from '../domain/calculators/RetirementAnalysisMatrixCalculator';

describe('calculateCumulativeBenefits', () => {
  it('accumulates benefits correctly', () => {
    const result = calculateCumulativeBenefits([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[62].cumulativeBenefitDollarsByAge[62]).toBe(12000);
    expect(result[62].cumulativeBenefitDollarsByAge[63]).toBe(24000);
  });

  it('does not accumulate benefits before the start age', () => {
    const result = calculateCumulativeBenefits([
      {
        age: 65,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[65].cumulativeBenefitDollarsByAge[62]).toBe(0);
    expect(result[65].cumulativeBenefitDollarsByAge[63]).toBe(0);
    expect(result[65].cumulativeBenefitDollarsByAge[64]).toBe(0);
  });
});
