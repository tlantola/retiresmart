import { useState } from 'react';

import { BenefitInputForm } from './retirement-analysis-matrix/presentation/components/BenefitInputForm';
import { BreakEvenResults } from './retirement-analysis-matrix/presentation/components/BreakEvenResults';
import { RetirementAnalysisService } from './retirement-analysis-matrix/application/services/RetirementAnalysisService';

function App() {
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null);

  const retirementAnalysisService = new RetirementAnalysisService();

  const handleCalculate = (benefitAmount: number) => {
    const breakEvenAge =
      retirementAnalysisService.calculateBreakEvenAgeFromFraBenefit(
        benefitAmount,
      );

    setBreakEvenAge(breakEvenAge);
  };

  return (
    <>
      <h1>RetireSmart</h1>

      <BenefitInputForm onCalculate={handleCalculate} />

      {breakEvenAge && <BreakEvenResults breakEvenAge={breakEvenAge} />}
    </>
  );
}

export default App;
