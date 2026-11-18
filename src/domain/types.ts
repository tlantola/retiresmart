export type Age = number;
export type BenefitDollars = number;

export interface BenefitEntry {
  age: Age;
  monthlyBenefit: BenefitDollars;
}

export type CumulativeBenefitDollarsByAge = Record<Age, BenefitDollars>;
export type BenefitProjectionByStartAge = Record<
  Age,
  CumulativeBenefitDollarsByAge
>;
