import { describe, expect, it } from 'vitest';

import { RetirementAnalysisService } from '../application/RetirementAnalysisService';

describe('RetirementAnalysisService', () => {
  it('calculates retirement benefit projections', () => {
    const service = new RetirementAnalysisService();

    const result = service.calculate([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[62].cumulativeBenefitDollarsByAge[62]).toBe(12000);
  });

  it('returns projections for multiple claiming ages', () => {
    const service = new RetirementAnalysisService();

    const result = service.calculate([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
      {
        age: 65,
        monthlyBenefit: 1400,
      },
    ]);

    expect(result[62].startAge).toBe(62);
    expect(result[65].startAge).toBe(65);
  });
});
