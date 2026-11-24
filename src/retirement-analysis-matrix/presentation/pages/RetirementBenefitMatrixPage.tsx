import { useState } from 'react';

import type { GenerateRetirementBenefitMatrixRequest } from '../../application/models/GenerateRetirementBenefitMatrixModels';
import type { RetirementBenefitMatrix } from '../../domain/models/RetirementBenefitModels';

import { BenefitInputForm } from '../components/BenefitInputForm';
import { RetirementBenefitMatrixTable } from '../components/RetirementBenefitMatrixTable';
import { generateRetirementBenefitMatrix } from '../../application/services/GenerateRetirementBenefitMatrix';

export function RetirementBenefitMatrixPage() {
  const [matrix, setMatrix] = useState<RetirementBenefitMatrix | null>(null);

  const handleCalculate = (request: GenerateRetirementBenefitMatrixRequest) => {
    const response = generateRetirementBenefitMatrix(request);

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
