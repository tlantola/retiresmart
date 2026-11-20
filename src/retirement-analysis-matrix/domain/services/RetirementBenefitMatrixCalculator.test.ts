import { describe, it, expect } from 'vitest';

import { calculateRetirementBenefitMatrix } from './RetirementBenefitMatrixCalculator';

import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../models/RetirementBenefitModels';

describe('RetirementAnalysisMatrixCalculator', () => {
  it('creates an analysis row for each claiming age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1600,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 65);

    expect(matrix.claimingAgeBenefits[62]).toBeDefined();

    expect(matrix.claimingAgeBenefits[63]).toBeDefined();
  });

  it('calculates the first year cumulative benefit for a claiming age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 65);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[62],
    ).toBe(18000);
  });

  it('calculates cumulative benefits for the following year', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 63);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[63],
    ).toBe(36000);
  });

  it('calculates cumulative benefits over multiple years', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 64);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[64],
    ).toBe(54000);
  });

  it('projects cumulative benefits through the specified end age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 65);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[65],
    ).toBe(72000);
  });

  it('creates a projection for each claiming age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1600,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 65);

    expect(matrix.claimingAgeBenefits[62]).toBeDefined();

    expect(matrix.claimingAgeBenefits[63]).toBeDefined();
  });

  it('creates independent projections for each claiming age', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1600,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 65);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[63],
    ).toBe(36000);

    expect(
      matrix.claimingAgeBenefits[63].cumulativeBenefitDollarsByAge[63],
    ).toBe(19200);
  });

  it('builds projections using each estimate monthly benefit amount', () => {
    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [
      {
        age: 62,
        monthlyBenefitAmount: 1500,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1600,
      },
      {
        age: 64,
        monthlyBenefitAmount: 1700,
      },
    ];

    const matrix = calculateRetirementBenefitMatrix(estimates, 64);

    expect(
      matrix.claimingAgeBenefits[62].cumulativeBenefitDollarsByAge[62],
    ).toBe(18000);

    expect(
      matrix.claimingAgeBenefits[63].cumulativeBenefitDollarsByAge[63],
    ).toBe(19200);

    expect(
      matrix.claimingAgeBenefits[64].cumulativeBenefitDollarsByAge[64],
    ).toBe(20400);
  });
});
