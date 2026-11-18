export type Age = number;
export type BenefitDollars = number;
export type CumulativeBenefitDollarsByAge = Record<Age, BenefitDollars>;
export type BenefitProjectionByStartAge = Record<Age, BenefitProjection>;

export interface BenefitEntry {
  age: Age;
  monthlyBenefit: BenefitDollars;
}
export interface BenefitProjection {
  startAge: Age;
  cumulativeBenefitDollarsByAge: CumulativeBenefitDollarsByAge;
}
