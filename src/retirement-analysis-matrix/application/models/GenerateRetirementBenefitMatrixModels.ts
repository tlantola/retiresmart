import type {
  Age,
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../../domain/models/RetirementBenefitModels';

export interface GenerateRetirementBenefitMatrixRequest {
  projectionEndAge: Age;
  estimates: PersonalizedMonthlyRetirementBenefitEstimate[];
}

export interface GenerateRetirementBenefitMatrixSuccess {
  isSuccessful: true;
  matrix: RetirementBenefitMatrix;
}

export interface GenerateRetirementBenefitMatrixFailure {
  isSuccessful: false;
  validationErrors: string[];
}

export type GenerateRetirementBenefitMatrixResponse =
  | GenerateRetirementBenefitMatrixSuccess
  | GenerateRetirementBenefitMatrixFailure;
