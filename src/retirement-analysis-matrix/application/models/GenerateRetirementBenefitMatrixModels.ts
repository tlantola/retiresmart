import type {
  Age,
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../../domain/models/RetirementBenefitModels';

export interface GenerateRetirementBenefitMatrixRequest {
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[];
  projectionEndAge: Age;
}

export interface GenerateRetirementBenefitMatrixResponse {
  matrix: RetirementBenefitMatrix;
}
