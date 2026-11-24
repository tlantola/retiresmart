import { calculateRetirementBenefitMatrix } from '../../domain/services/RetirementBenefitMatrixCalculator';
import { validateRetirementBenefitEstimates } from '../validators/RetirementBenefitEstimateValidator';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';
import { isProjectionEndAgeValid } from '../../domain/rules/BenefitRules';

export function generateRetirementBenefitMatrix(
  request: GenerateRetirementBenefitMatrixRequest,
): GenerateRetirementBenefitMatrixResponse {
  const validationResult = validateRetirementBenefitEstimates(
    request.estimates,
  );

  if (!validationResult.isValid) {
    throw new Error(validationResult.errors.join(', '));
  }

  if (!isProjectionEndAgeValid(request.projectionEndAge)) {
    throw new Error('Projection end age is invalid');
  }

  const matrix = calculateRetirementBenefitMatrix(
    request.estimates,
    request.projectionEndAge,
  );

  return {
    matrix,
  };
}
