import { useState } from 'react';
import { BenefitInputForm } from './retirement-analysis-matrix/presentation/components/BenefitInputForm';
import { generateRetirementBenefitMatrix } from './retirement-analysis-matrix/application/services/GenerateRetirementBenefitMatrix';
import { RetirementBenefitMatrixTable } from './retirement-analysis-matrix/presentation/components/RetirementBenefitMatrixTable';

import type { PersonalizedMonthlyRetirementBenefitEstimate } from './retirement-analysis-matrix/domain/models/RetirementBenefitModels';
import type { RetirementBenefitMatrix } from './retirement-analysis-matrix/domain/models/RetirementBenefitModels';

function App() {
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

export default App;
