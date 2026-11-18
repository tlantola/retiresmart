import { BenefitAnalysisService } from '../domain/BenefitAnalysisService';

import type {
  BenefitEntry,
  BenefitProjectionByStartAge,
} from '../domain/types';

export class RetirementAnalysisService {
  private readonly benefitAnalysisService = new BenefitAnalysisService();

  calculate(benefits: BenefitEntry[]): BenefitProjectionByStartAge {
    return this.benefitAnalysisService.analyze(benefits);
  }
}
