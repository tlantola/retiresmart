import { calculateRetirementBenefitMatrix } from '../../domain/services/RetirementBenefitMatrixCalculator';
import { isProjectionEndAgeValid } from '../../domain/rules/BenefitRules';
import { validateRetirementBenefitEstimates } from '../validators/RetirementBenefitEstimateValidator';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';

export function generateRetirementBenefitMatrix(
  request: GenerateRetirementBenefitMatrixRequest,
): GenerateRetirementBenefitMatrixResponse {
  const validationResult = validateRetirementBenefitEstimates(
    request.estimates,
  );

  if (!validationResult.isValid) {
    return {
      isSuccessful: false,
      validationErrors: validationResult.errors,
    };
  }

  if (!isProjectionEndAgeValid(request.projectionEndAge)) {
    return {
      isSuccessful: false,
      validationErrors: ['Projection end age is invalid'],
    };
  }

  const matrix = calculateRetirementBenefitMatrix(
    request.estimates,
    request.projectionEndAge,
  );

  return {
    isSuccessful: true,
    matrix,
  };
}
