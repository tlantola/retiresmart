import type { Age } from './types';

export const MINIMUM_BENEFIT_AMOUNT = 0;
export const MAX_REASONABLE_BENEFIT_AMOUNT = 10000;
export const MINIMUM_CLAIMING_AGE = 62;
export const MAXIMUM_REASONABLE_CLAIMING_AGE = 70;
export const DEFAULT_ANALYSIS_END_AGE = 90;

export function isAgeBeforeBenefitStart(
  age: Age,
  benefitStartAge: Age,
): boolean {
  return age < benefitStartAge;
}
