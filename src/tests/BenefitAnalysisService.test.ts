import { describe, expect, it } from 'vitest';

import { BenefitAnalysisService } from '../domain/BenefitAnalysisService';

describe('BenefitAnalysisService', () => {
  it('analyzes benefit projections', () => {
    const service = new BenefitAnalysisService();

    const result = service.analyze([
      {
        age: 62,
        monthlyBenefit: 1000,
      },
    ]);

    expect(result[62].cumulativeBenefitDollarsByAge[62]).toBe(12000);
  });
});
