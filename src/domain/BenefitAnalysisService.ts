import { calculateCumulativeBenefits } from './calculators/breakEvenCalculator';
import type {
  BenefitProjection,
  BenefitEntry,
  BenefitProjectionByStartAge,
} from './types';

export class BenefitAnalysisService {
  analyze(benefits: BenefitEntry[]): BenefitProjectionByStartAge {
    return calculateCumulativeBenefits(benefits);
  }

  findBreakEvenAge(
    earlierProjection: BenefitProjection,
    laterProjection: BenefitProjection,
  ): number {
    const earlierBenefits = earlierProjection.cumulativeBenefitDollarsByAge;

    const laterBenefits = laterProjection.cumulativeBenefitDollarsByAge;

    for (const ageKey of Object.keys(earlierBenefits)) {
      const age = Number(ageKey);

      if (laterBenefits[age] >= earlierBenefits[age]) {
        return age;
      }
    }

    return -1;
  }
}
