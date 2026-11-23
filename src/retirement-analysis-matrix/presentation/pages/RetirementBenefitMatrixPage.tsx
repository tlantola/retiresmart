import { useState } from 'react';

import { generateRetirementBenefitMatrix } from '../../application/services/GenerateRetirementBenefitMatrix';
import { BenefitInputForm } from '../components/BenefitInputForm';
import { RetirementBenefitMatrixTable } from '../components/RetirementBenefitMatrixTable';

import type {
  PersonalizedMonthlyRetirementBenefitEstimate,
  RetirementBenefitMatrix,
} from '../../domain/models/RetirementBenefitModels';

export function RetirementBenefitMatrixPage() {
  const [matrix, setMatrix] = useState<RetirementBenefitMatrix | null>(null);

  const handleCalculate = (
    estimates: PersonalizedMonthlyRetirementBenefitEstimate[],
  ) => {
    const response = generateRetirementBenefitMatrix({
      estimates,
      projectionEndAge: 90,
    });

    setMatrix(response.matrix);
  };

  return (
    <>
      <h1>RetireSmart</h1>

      <BenefitInputForm onCalculate={handleCalculate} />

      {matrix && <RetirementBenefitMatrixTable matrix={matrix} />}
    </>
  );
}
