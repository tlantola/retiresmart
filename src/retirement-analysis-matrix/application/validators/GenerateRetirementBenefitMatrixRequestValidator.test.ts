import { describe, expect, it } from 'vitest';

import { validateGenerateRetirementBenefitMatrixRequest } from './GenerateRetirementBenefitMatrixRequestValidator';

import {
  MINIMUM_BENEFIT_AMOUNT,
  MAX_REASONABLE_BENEFIT_AMOUNT,
  MINIMUM_CLAIMING_AGE,
} from '../../domain/rules/BenefitRules';

import type { GenerateRetirementBenefitMatrixRequest } from '../models/GenerateRetirementBenefitMatrixModels';

describe('GenerateRetirementBenefitMatrixRequestValidator', () => {
  it('rejects estimates when a later claiming age has a lower monthly benefit amount', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 90,
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

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(false);

    expect(result.errors).toContain(
      'Age 63 monthly benefit amount must be greater than or equal to age 62.',
    );
  });

  it('accepts estimates when monthly benefit amounts increase with claiming age', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 90,
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

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(true);
  });

  it('accepts estimates when adjacent claiming ages have equal monthly benefit amounts', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 90,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
        {
          age: 63,
          monthlyBenefitAmount: 2000,
        },
      ],
    };

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(true);
  });

  it('rejects benefit amounts below the minimum allowed amount', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 90,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: MINIMUM_BENEFIT_AMOUNT - 0.01,
        },
      ],
    };

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(false);

    expect(result.errors).toContain(
      `Age 62 monthly benefit amount must be between ${MINIMUM_BENEFIT_AMOUNT} and ${MAX_REASONABLE_BENEFIT_AMOUNT}.`,
    );
  });

  it('rejects benefit amounts above the maximum allowed amount', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: 90,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: MAX_REASONABLE_BENEFIT_AMOUNT + 0.01,
        },
      ],
    };

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(false);

    expect(result.errors).toContain(
      `Age 62 monthly benefit amount must be between ${MINIMUM_BENEFIT_AMOUNT} and ${MAX_REASONABLE_BENEFIT_AMOUNT}.`,
    );
  });

  it('rejects projection end ages below the minimum claiming age', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: MINIMUM_CLAIMING_AGE - 1,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
      ],
    };

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(false);

    expect(result.errors).toContain(
      `Projection end age must be at least ${MINIMUM_CLAIMING_AGE}.`,
    );
  });

  it('accepts projection end age equal to the minimum claiming age', () => {
    const request: GenerateRetirementBenefitMatrixRequest = {
      projectionEndAge: MINIMUM_CLAIMING_AGE,
      estimates: [
        {
          age: 62,
          monthlyBenefitAmount: 2000,
        },
      ],
    };

    const result = validateGenerateRetirementBenefitMatrixRequest(request);

    expect(result.isValid).toBe(true);
  });
});
