export interface CreateEventRequest {
  title: string;
  location: string;
  event_date: string;
  attendance_count: number;
  energy_kwh: number;
  travel_km: number;
  catering_meals: number;
  waste_kg: number;
}

export interface EventRow {
  id: string;
  title: string;
  location: string;
  event_date: string;
  attendance_count: number;
  created_by: string;
  created_at: string;
}

export interface EventEmissionDataRow {
  id: string;
  event_id: string;
  energy_kwh: number;
  travel_km: number;
  catering_meals: number;
  waste_kg: number;
  total_co2: number;
  created_at: string;
}

export interface CreateEventResult {
  event: EventRow;
  emissionData: EventEmissionDataRow;
}

export interface EmissionFactorRow {
  id: string;
  category: 'energy' | 'travel' | 'catering' | 'waste';
  unit: string;
  value: number;
  created_at: string;
}

export interface EventWithEmissionAndFactors {
  event: EventRow;
  emissionData: EventEmissionDataRow;
  factors: EmissionFactorRow[];
}

export interface EventEmissionBreakdown {
  energy: number;
  travel: number;
  catering: number;
  waste: number;
}

export interface EventDetailsResponse {
  title: string;
  location: string;
  event_date: string;
  total_co2: number;
  breakdown: EventEmissionBreakdown;
}
