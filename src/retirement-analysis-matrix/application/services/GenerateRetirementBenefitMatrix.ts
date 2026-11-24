import { calculateRetirementBenefitMatrix } from '../../domain/services/RetirementBenefitMatrixCalculator';
import { areRetirementBenefitEstimatesValid } from '../validators/RetirementBenefitEstimateValidator';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';
import { isProjectionEndAgeValid } from '../../domain/rules/BenefitRules';

export function generateRetirementBenefitMatrix(
  request: GenerateRetirementBenefitMatrixRequest,
): GenerateRetirementBenefitMatrixResponse {
  if (!areRetirementBenefitEstimatesValid(request.estimates)) {
    throw new Error('Retirement benefit estimates are invalid');
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
