import { describe, expect, it } from 'vitest';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';

import { generateRetirementBenefitMatrix } from './GenerateRetirementBenefitMatrix';
import {
  MINIMUM_BENEFIT_AMOUNT,
  MINIMUM_CLAIMING_AGE,
} from '../../domain/rules/BenefitRules';
import { createCompleteEstimateSet } from '../testFixtures/GenerateRetirementBenefitMatrixTestFixtures';

function expectSuccess(response: GenerateRetirementBenefitMatrixResponse) {
  expect(response.isSuccessful).toBe(true);

  if (!response.isSuccessful) {
    throw new Error('Expected successful response');
  }

  return response;
}

function expectFailure(response: GenerateRetirementBenefitMatrixResponse) {
  expect(response.isSuccessful).toBe(false);

  if (response.isSuccessful) {
    throw new Error('Expected failed response');
  }

  return response;
}

describe('GenerateRetirementBenefitMatrix', () => {
  it('returns a retirement benefit matrix generated from the request', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 70,
      estimates: createCompleteEstimateSet([
        1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300,
      ]),
    };

    const response = expectSuccess(generateRetirementBenefitMatrix(request));

    expect(
      response.matrix.claimingAgeBenefits[62].cumulativeBenefitAmountByAge[65],
    ).toBe(72000);
  });

  it('returns a retirement benefit matrix when estimates are valid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 70,
      estimates: createCompleteEstimateSet(),
    };

    const response = expectSuccess(generateRetirementBenefitMatrix(request));

    expect(response.matrix.claimingAgeBenefits[62]).toBeDefined();
    expect(response.matrix.claimingAgeBenefits[63]).toBeDefined();
  });

  it('throws when retirement benefit estimates are invalid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 70,
      estimates: createCompleteEstimateSet([
        2000, 1900, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
      ]),
    };

    const response = expectFailure(generateRetirementBenefitMatrix(request));

    expect(response.validationErrors.length).toBeGreaterThan(0);
  });

  it('throws when projection end age is below the minimum claiming age', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: MINIMUM_CLAIMING_AGE - 1,
      estimates: createCompleteEstimateSet(),
    };

    const response = expectFailure(generateRetirementBenefitMatrix(request));

    expect(response.validationErrors).toContain(
      `Projection end age must be at least ${MINIMUM_CLAIMING_AGE}.`,
    );
  });

  it('throws when a monthly benefit amount is invalid', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 62,
      estimates: createCompleteEstimateSet([
        MINIMUM_BENEFIT_AMOUNT - 0.01,
        2100,
        2200,
        2300,
        2400,
        2500,
        2600,
        2700,
        2800,
      ]),
    };

    const response = expectFailure(generateRetirementBenefitMatrix(request));

    expect(response.validationErrors.length).toBeGreaterThan(0);
  });
});
