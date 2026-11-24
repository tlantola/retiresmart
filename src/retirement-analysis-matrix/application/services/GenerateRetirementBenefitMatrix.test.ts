import { describe, expect, it } from 'vitest';

import { generateRetirementBenefitMatrix } from './GenerateRetirementBenefitMatrix';

import type { GenerateRetirementBenefitMatrixRequest } from '../models/GenerateRetirementBenefitMatrixModels';

describe('GenerateRetirementBenefitMatrix', () => {
  it('returns a retirement benefit matrix generated from the request', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 1500,
        },
      ],
      projectionEndAge: 65,
    };

    const response = generateRetirementBenefitMatrix(request);

    expect(
      response.matrix.claimingAgeBenefits[62].cumulativeBenefitAmountByAge[65],
    ).toBe(72000);
  });
});
