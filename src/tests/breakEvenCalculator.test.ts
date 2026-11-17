import { describe, it, expect } from 'vitest';
import { calculateCumulativeBenefits } from '../services/breakEvenCalculator';

describe('calculateCumulativeBenefits', () => {
  it('accumulates benefits correctly', () => {
    const result = calculateCumulativeBenefits([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[62][62]).toBe(12000);
    expect(result[62][63]).toBe(24000);
  });

  it('does not accumulate benefits before the start age', () => {
    const result = calculateCumulativeBenefits([
      {
        age: 65,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[65][62]).toBe(0);
    expect(result[65][63]).toBe(0);
    expect(result[65][64]).toBe(0);
  });
});
