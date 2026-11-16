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

    expect(result[62][0]).toBe(12000);
    expect(result[62][1]).toBe(24000);
  });
});