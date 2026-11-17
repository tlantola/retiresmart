import { useState } from 'react';
import {
  MAX_REASONABLE_BENEFIT_AMOUNT,
  MINIMUM_BENEFIT_AMOUNT,
} from '../domain/BenefitRules';

interface BenefitInputFormProps {
  onCalculate: (benefitAmount: number) => void;
}

export function BenefitInputForm({ onCalculate }: BenefitInputFormProps) {
  const [benefitAmount, setBenefitAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (benefitAmount.trim() === '') {
      setError('Please enter a monthly benefit amount.');
      return;
    }

    const amount = Number(benefitAmount);

    if (Number.isNaN(amount)) {
      setError('Please enter a valid monthly benefit amount.');
      return;
    }

    if (amount <= MINIMUM_BENEFIT_AMOUNT) {
      setError(
        `Please enter a monthly benefit amount that is greater than ${MINIMUM_BENEFIT_AMOUNT}.`,
      );
      return;
    }

    if (amount > MAX_REASONABLE_BENEFIT_AMOUNT) {
      setError(
        `Please enter a monthly benefit amount that is less than or equal to ${MAX_REASONABLE_BENEFIT_AMOUNT}.`,
      );
      return;
    }

    setError(null);
    onCalculate(amount);
  };

  const handleBenefitAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBenefitAmount(e.target.value);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="benefit">Monthly Benefit at FRA</label>

        <input
          id="benefit"
          type="number"
          value={benefitAmount}
          onChange={handleBenefitAmountChange}
        />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </div>

      <button type="submit">Calculate</button>
    </form>
  );
}
