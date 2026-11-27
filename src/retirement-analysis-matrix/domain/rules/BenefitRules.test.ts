import { describe, expect, it } from 'vitest';

import {
  isBenefitAmountValid,
  isProjectionEndAgeValid,
  MAX_REASONABLE_BENEFIT_AMOUNT,
  MINIMUM_BENEFIT_AMOUNT,
} from './BenefitRules';

describe('BenefitRules', () => {
  describe('isProjectionEndAgeValid', () => {
    it('accepts the minimum claiming age', () => {
      expect(isProjectionEndAgeValid(62)).toBe(true);
    });

    it('rejects ages below the minimum claiming age', () => {
      expect(isProjectionEndAgeValid(61)).toBe(false);
    });
  });

  describe('isBenefitAmountValid', () => {
    it('accepts a valid benefit amount', () => {
      expect(isBenefitAmountValid(2500)).toBe(true);
    });

    it('rejects benefit amounts less than the minimum', () => {
      expect(isBenefitAmountValid(MINIMUM_BENEFIT_AMOUNT - 0.01)).toBe(false);
    });

    it('rejects unreasonably large benefit amounts', () => {
      expect(isBenefitAmountValid(MAX_REASONABLE_BENEFIT_AMOUNT + 0.01)).toBe(
        false,
      );
    });
  });
});
