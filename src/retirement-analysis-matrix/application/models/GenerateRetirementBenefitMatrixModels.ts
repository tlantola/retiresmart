import type {
  Age,
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../../domain/models/RetirementBenefitModels';

export interface GenerateRetirementBenefitMatrixRequest {
  projectionEndAge: Age;
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[];
}

export interface GenerateRetirementBenefitMatrixResponse {
  matrix: RetirementBenefitMatrix;
}
