import { useState } from 'react';

import type { GenerateRetirementBenefitMatrixRequest } from '../../application/models/GenerateRetirementBenefitMatrixModels';
import type { RetirementBenefitMatrix } from '../../domain/models/RetirementBenefitModels';

import { BenefitInputForm } from '../components/BenefitInputForm';
import { RetirementBenefitMatrixTable } from '../components/RetirementBenefitMatrixTable';
import { generateRetirementBenefitMatrix } from '../../application/services/GenerateRetirementBenefitMatrix';

export function RetirementBenefitMatrixPage() {
  const [matrix, setMatrix] = useState<RetirementBenefitMatrix | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleCalculate = (request: GenerateRetirementBenefitMatrixRequest) => {
    const response = generateRetirementBenefitMatrix(request);

    if (!response.isSuccessful) {
      setValidationErrors(response.validationErrors);
      setMatrix(null);
      return;
    }

    setValidationErrors([]);
    setMatrix(response.matrix);
  };

  return (
    <>
      <h1>RetireSmart</h1>

      <BenefitInputForm onCalculate={handleCalculate} />

      {validationErrors.length > 0 && (
        <div style={{ color: 'red' }}>
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {matrix && <RetirementBenefitMatrixTable matrix={matrix} />}
    </>
  );
}
