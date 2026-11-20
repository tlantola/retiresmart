import { BenefitAnalysisService } from '../../domain/services/BenefitAnalysisService';

import type {
  BenefitEntry,
  BenefitProjectionByStartAge,
} from '../../../retirement-analysis-matrix/domain/models/RetirementBenefitModels';

export class RetirementAnalysisService {
  private readonly benefitAnalysisService = new BenefitAnalysisService();

  calculate(benefits: BenefitEntry[]): BenefitProjectionByStartAge {
    return this.benefitAnalysisService.analyze(benefits);
  }

  calculateBreakEvenAgeFromFraBenefit(fraBenefitAmount: number): number {
    const strategies =
      this.benefitAnalysisService.generateClaimingStrategies(fraBenefitAmount);

    const projections = this.benefitAnalysisService.analyze(strategies);

    return this.benefitAnalysisService.findBreakEvenAge(
      projections[62],
      projections[67],
    );
  }
}
