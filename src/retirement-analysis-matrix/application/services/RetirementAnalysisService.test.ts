import { describe, expect, it } from 'vitest';

import { RetirementAnalysisService } from '../../application/services/RetirementAnalysisService';
import { BenefitAnalysisService } from '../../domain/services/BenefitAnalysisService';

describe('RetirementAnalysisService', () => {
  it('calculates retirement benefit projections', () => {
    const service = new RetirementAnalysisService();

    const result = service.calculate([
      {
        age: 62,
        monthlyBenefitAmount: 1000,
      },
    ]);

    expect(result[62].cumulativeBenefitDollarsByAge[62]).toBe(12000);
  });

  it('returns projections for multiple claiming ages', () => {
    const service = new RetirementAnalysisService();

    const result = service.calculate([
      {
        age: 62,
        monthlyBenefitAmount: 1000,
      },
      {
        age: 65,
        monthlyBenefitAmount: 1400,
      },
    ]);

    expect(result[62].startAge).toBe(62);
    expect(result[65].startAge).toBe(65);
  });

  it('creates claiming strategies from a full retirement age benefit', () => {
    const service = new BenefitAnalysisService();

    const strategies = service.generateClaimingStrategies(2000);

    expect(strategies[0].age).toBe(62);
    expect(strategies[1].age).toBe(67);
    expect(strategies[2].age).toBe(70);

    expect(strategies[0].monthlyBenefitAmount).toBeLessThan(
      strategies[1].monthlyBenefitAmount,
    );

    expect(strategies[2].monthlyBenefitAmount).toBeGreaterThan(
      strategies[1].monthlyBenefitAmount,
    );
  });

  it('calculates a break-even age from an FRA benefit amount', () => {
    const service = new RetirementAnalysisService();

    const breakEvenAge = service.calculateBreakEvenAgeFromFraBenefit(2000);

    expect(breakEvenAge).toBeGreaterThan(67);
  });
});
