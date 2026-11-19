import { useState } from 'react';

import { BenefitInputForm } from './components/BenefitInputForm';
import { BreakEvenResults } from './components/BreakEvenResults';
import { RetirementAnalysisService } from './application/RetirementAnalysisService';

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
