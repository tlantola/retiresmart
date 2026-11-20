import { calculateCumulativeBenefits } from '../calculators/RetirementAnalysisMatrixCalculator';
import type {
  BenefitProjection,
  BenefitEntry,
  BenefitProjectionByStartAge,
} from '../../../retirement-analysis-matrix/domain/models/RetirementBenefitModels';

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

  generateClaimingStrategies(fraBenefitAmount: number): BenefitEntry[] {
    return [
      {
        age: 62,
        monthlyBenefitAmount: fraBenefitAmount * 0.7,
      },
      {
        age: 67,
        monthlyBenefitAmount: fraBenefitAmount * 1.0,
      },
      {
        age: 70,
        monthlyBenefitAmount: fraBenefitAmount * 1.24,
      },
    ];
  }
}
