import { generateRetirementBenefitMatrix } from '../../application/services/GenerateRetirementBenefitMatrix';

export function RetirementBenefitMatrixPage() {
  const response = generateRetirementBenefitMatrix({
    estimates: [
      {
        age: 62,
        monthlyBenefitAmount: 1000,
      },
      {
        age: 63,
        monthlyBenefitAmount: 1100,
      },
      {
        age: 64,
        monthlyBenefitAmount: 1200,
      },
      {
        age: 65,
        monthlyBenefitAmount: 1300,
      },
      {
        age: 66,
        monthlyBenefitAmount: 1400,
      },
      {
        age: 67,
        monthlyBenefitAmount: 1500,
      },
      {
        age: 68,
        monthlyBenefitAmount: 1600,
      },
      {
        age: 69,
        monthlyBenefitAmount: 1700,
      },
      {
        age: 70,
        monthlyBenefitAmount: 1800,
      },
    ],
    projectionEndAge: 100,
  });

  return <div>{JSON.stringify(response.matrix)}</div>;
}
