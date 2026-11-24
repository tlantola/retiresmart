import { describe, expect, it } from 'vitest';

import { generateRetirementBenefitMatrix } from './GenerateRetirementBenefitMatrix';

import type { GenerateRetirementBenefitMatrixRequest } from '../models/GenerateRetirementBenefitMatrixModels';
import {
  MINIMUM_BENEFIT_AMOUNT,
  MINIMUM_CLAIMING_AGE,
} from '../../domain/rules/BenefitRules';

describe('GenerateRetirementBenefitMatrix', () => {
  it('returns a retirement benefit matrix generated from the request', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 65,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 1500,
        },
      ],
    };

    const response = generateRetirementBenefitMatrix(request);

    expect(
      response.matrix.claimingAgeBenefits[62].cumulativeBenefitAmountByAge[65],
    ).toBe(72000);
  });

  it('returns a retirement benefit matrix when estimates are valid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 63,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
        {
          age: 63,
          monthlyBenefitAmount: 2100,
        },
      ],
    };

    const response = generateRetirementBenefitMatrix(request);

    expect(response.matrix).toBeDefined();
  });

  it('throws when retirement benefit estimates are invalid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 63,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
        {
          age: 63,
          monthlyBenefitAmount: 1900,
        },
      ],
    };

    expect(() => generateRetirementBenefitMatrix(request)).toThrow();
  });

  it('throws when projection end age is below the minimum claiming age', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: MINIMUM_CLAIMING_AGE - 1,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
      ],
    };

    expect(() => generateRetirementBenefitMatrix(request)).toThrow();
  });

  it('throws when a monthly benefit amount is invalid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 62,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: MINIMUM_BENEFIT_AMOUNT - 0.01,
        },
      ],
    };

    expect(() => generateRetirementBenefitMatrix(request)).toThrow();
  });
});
