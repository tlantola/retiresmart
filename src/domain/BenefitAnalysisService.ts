import { calculateCumulativeBenefits } from '../services/breakEvenCalculator';
import type { BenefitEntry, BenefitProjectionByStartAge } from './types';

export class BenefitAnalysisService {
  analyze(benefits: BenefitEntry[]): BenefitProjectionByStartAge {
    return calculateCumulativeBenefits(benefits);
  }
}
