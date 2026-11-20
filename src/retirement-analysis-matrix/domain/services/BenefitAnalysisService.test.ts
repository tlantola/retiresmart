import { describe, expect, it } from 'vitest';
import { BenefitAnalysisService } from './BenefitAnalysisService';

describe('BenefitAnalysisService', () => {
  describe('analyze', () => {
    it('analyzes benefit projections', () => {
      const service = new BenefitAnalysisService();

      const result = service.analyze([
        {
          age: 62,
          monthlyBenefitAmount: 1000,
        },
      ]);

      expect(result[62].cumulativeBenefitDollarsByAge[62]).toBe(12000);
    });
  });

  describe('findBreakEvenAge', () => {
    it('identifies when a later claiming strategy overtakes an earlier strategy', () => {
      const service = new BenefitAnalysisService();

      const projections = service.analyze([
        {
          age: 62,
          monthlyBenefitAmount: 1000,
        },
        {
          age: 65,
          monthlyBenefitAmount: 1400,
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
          monthlyBenefitAmount: 1000,
        },
        {
          age: 65,
          monthlyBenefitAmount: 3000,
        },
      ]);

      const breakEvenAge = service.findBreakEvenAge(
        projections[62],
        projections[65],
      );

      expect(breakEvenAge).toBeLessThan(70);
    });
  });
});
