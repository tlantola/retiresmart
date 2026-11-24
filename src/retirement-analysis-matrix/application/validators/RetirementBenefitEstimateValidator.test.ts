import { describe, expect, it } from 'vitest';

import { validateRetirementBenefitEstimates } from './RetirementBenefitEstimateValidator';

import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../../domain/models/RetirementBenefitModels';

describe('RetirementBenefitEstimateValidator', () => {
  it('rejects estimates when a later claiming age has a lower monthly benefit amount', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 2000,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1900,
      },
    ];

    const result = validateRetirementBenefitEstimates(estimates);

    expect(result.isValid).toBe(false);

    expect(result.errors).toContain(
      'Age 63 monthly benefit amount must be greater than or equal to age 62.',
    );
  });

  it('accepts estimates when monthly benefit amounts increase with claiming age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 2000,
      },
      {
        age: 63,
        monthlyBenefitAmount: 2100,
      },
    ];

    const result = validateRetirementBenefitEstimates(estimates);

    expect(result.isValid).toBe(true);
  });

  it('accepts estimates when adjacent claiming ages have equal monthly benefit amounts', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 2000,
      },
      {
        age: 63,
        monthlyBenefitAmount: 2000,
      },
    ];

    const result = validateRetirementBenefitEstimates(estimates);

    expect(result.isValid).toBe(true);
  });
});
