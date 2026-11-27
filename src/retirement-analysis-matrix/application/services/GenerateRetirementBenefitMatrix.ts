import { calculateRetirementBenefitMatrix } from '../../domain/services/RetirementBenefitMatrixCalculator';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';
import { validateGenerateRetirementBenefitMatrixRequest } from '../validators/GenerateRetirementBenefitMatrixRequestValidator';

export function generateRetirementBenefitMatrix(
  request: GenerateRetirementBenefitMatrixRequest,
): GenerateRetirementBenefitMatrixResponse {
  const validationResult =
    validateGenerateRetirementBenefitMatrixRequest(request);

  if (!validationResult.isValid) {
    return {
      isSuccessful: false,
      validationErrors: validationResult.errors,
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
