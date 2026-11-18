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
});
