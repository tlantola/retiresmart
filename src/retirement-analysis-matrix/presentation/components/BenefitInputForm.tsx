import { useState } from 'react';

import type { GenerateRetirementBenefitMatrixRequest } from '../../application/models/GenerateRetirementBenefitMatrixModels';
import type { PersonalizedMonthlyRetirementBenefitEstimate } from '../../domain/models/RetirementBenefitModels';
import { DEFAULT_ANALYSIS_END_AGE } from '../../domain/rules/BenefitRules';

interface BenefitInputFormProps {
  onCalculate: (request: GenerateRetirementBenefitMatrixRequest) => void;
}

export function BenefitInputForm({ onCalculate }: BenefitInputFormProps) {
  const [projectionEndAge, setProjectionEndAge] = useState(
    DEFAULT_ANALYSIS_END_AGE,
  );

  const [benefitAmounts, setBenefitAmounts] = useState<Record<number, string>>({
    62: '',
    63: '',
    64: '',
    65: '',
    66: '',
    67: '',
    68: '',
    69: '',
    70: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const estimates: PersonalizedMonthlyRetirementBenefitEstimate[] = [];

    for (let age = 62; age <= 70; age++) {
      const amount = Number(benefitAmounts[age]);

      estimates.push({
        age,
        monthlyBenefitAmount: amount,
      });
    }

    onCalculate({
      projectionEndAge,
      estimates,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectionEndAge">Projection End Age:&nbsp;</label>

      <input
        id="projectionEndAge"
        type="number"
        value={projectionEndAge}
        onChange={(e) => setProjectionEndAge(Number(e.target.value))}
      />

      <h3>Monthly Benefit Amounts</h3>
      <div>
        <div>
          <label htmlFor="benefit-62">Monthly Benefit at Age 62:&nbsp;</label>
          <input
            id="benefit-62"
            type="number"
            value={benefitAmounts[62]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                62: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-63">Monthly Benefit at Age 63:&nbsp;</label>
          <input
            id="benefit-63"
            type="number"
            value={benefitAmounts[63]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                63: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-64">Monthly Benefit at Age 64:&nbsp;</label>
          <input
            id="benefit-64"
            type="number"
            value={benefitAmounts[64]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                64: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-65">Monthly Benefit at Age 65:&nbsp;</label>
          <input
            id="benefit-65"
            type="number"
            value={benefitAmounts[65]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                65: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-66">Monthly Benefit at Age 66:&nbsp;</label>
          <input
            id="benefit-66"
            type="number"
            value={benefitAmounts[66]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                66: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-67">Monthly Benefit at Age 67:&nbsp;</label>
          <input
            id="benefit-67"
            type="number"
            value={benefitAmounts[67]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                67: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-68">Monthly Benefit at Age 68:&nbsp;</label>
          <input
            id="benefit-68"
            type="number"
            value={benefitAmounts[68]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                68: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-69">Monthly Benefit at Age 69:&nbsp;</label>
          <input
            id="benefit-69"
            type="number"
            value={benefitAmounts[69]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                69: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="benefit-70">Monthly Benefit at Age 70:&nbsp;</label>
          <input
            id="benefit-70"
            type="number"
            value={benefitAmounts[70]}
            onChange={(e) =>
              setBenefitAmounts({
                ...benefitAmounts,
                70: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button type="submit">Calculate</button>
    </form>
  );
}
