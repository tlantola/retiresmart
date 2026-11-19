import { describe, expect, it } from 'vitest';

import { BenefitAnalysisService } from '../domain/BenefitAnalysisService';

describe('BreakEvenAnalysis', () => {
  it('identifies when a later claiming strategy overtakes an earlier strategy', () => {
    const service = new BenefitAnalysisService();

    const projections = service.analyze([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
      {
        age: 65,
        monthlyBenefit: 1400,
      },
    ]);

    const breakEvenAge = service.findBreakEvenAge(
      projections[62],
      projections[65],
    );

    expect(breakEvenAge).toBe(72);
  });

  it('returns a different break-even age for different projections', () => {
    const service = new BenefitAnalysisService();

    const projections = service.analyze([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
      {
        age: 65,
        monthlyBenefit: 3000,
      },
    ]);

    const breakEvenAge = service.findBreakEvenAge(
      projections[62],
      projections[65],
    );

    expect(breakEvenAge).toBeLessThan(70);
  });
});
