import { EventEmissionDataRow, EventEmissionBreakdown, EmissionFactorRow } from '../types/events';

export interface Co2ComputationResult {
  total_co2: number;
  breakdown: EventEmissionBreakdown;
}

export interface Co2CalculationService {
  calculate(
    emissionData: EventEmissionDataRow,
    factors: EmissionFactorRow[]
  ): Promise<Co2ComputationResult> | Co2ComputationResult;
}

class PlaceholderCo2CalculationService implements Co2CalculationService {
  calculate(emissionData: EventEmissionDataRow): Co2ComputationResult {
    return {
      total_co2: emissionData.total_co2,
      breakdown: {
        energy: 0,
        travel: 0,
        catering: 0,
        waste: 0
      }
    };
  }
}

export const co2CalculationService: Co2CalculationService = new PlaceholderCo2CalculationService();
