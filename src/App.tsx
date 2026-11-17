import { useState } from 'react';

import { BenefitInputForm } from './components/BenefitInputForm';
import { BreakEvenResults } from './components/BreakEvenResults';

function App() {
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null);

  const handleCalculate = (benefitAmount: number) => {
    console.log(benefitAmount);

    setBreakEvenAge(79);
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
