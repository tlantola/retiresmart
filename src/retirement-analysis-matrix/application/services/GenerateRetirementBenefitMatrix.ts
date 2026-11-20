import { calculateRetirementBenefitMatrix } from '../../domain/services/RetirementBenefitMatrixCalculator';

import type {
  GenerateRetirementBenefitMatrixRequest,
  GenerateRetirementBenefitMatrixResponse,
} from '../models/GenerateRetirementBenefitMatrixModels';

export function generateRetirementBenefitMatrix(
  request: GenerateRetirementBenefitMatrixRequest,
): GenerateRetirementBenefitMatrixResponse {
  const matrix = calculateRetirementBenefitMatrix(
    request.estimates,
    request.projectionEndAge,
  );

  return {
    matrix,
  };
}
