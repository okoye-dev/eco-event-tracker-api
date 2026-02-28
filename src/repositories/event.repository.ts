import { supabase } from '../config/supabase';
import {
  CreateEventRequest,
  CreateEventResult,
  EmissionFactorRow,
  EventEmissionDataRow,
  EventRow,
  EventWithEmissionAndFactors
} from '../types/events';

export class EventRepository {
  async createEventWithEmissionData(input: CreateEventRequest, createdBy: string): Promise<CreateEventResult> {
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        title: input.title,
        location: input.location,
        event_date: input.event_date,
        participant_count: input.participant_count,
        is_virtual: input.is_virtual,
        created_by: createdBy
      })
      .select('*')
      .single();

    if (eventError || !event) {
      throw new Error(eventError?.message || 'Failed to create event');
    }

    const { data: emissionData, error: emissionError } = await supabase
      .from('event_emission_data')
      .insert({
        event_id: event.id,
        energy_kwh: input.energy_kwh,
        travel_km: input.travel_km,
        catering_meals: input.catering_meals,
        waste_kg: input.waste_kg,
        total_co2: 0
      })
      .select('*')
      .single();

    if (emissionError || !emissionData) {
      await supabase.from('events').delete().eq('id', event.id);
      throw new Error(emissionError?.message || 'Failed to create emission data');
    }

    return { event: event as EventRow, emissionData: emissionData as EventEmissionDataRow };
  }

  async getEventWithEmissionAndFactors(eventId: string): Promise<EventWithEmissionAndFactors | null> {
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError) {
      if (eventError.code === 'PGRST116') {
        return null;
      }
      throw new Error(eventError.message || 'Failed to fetch event');
    }

    const { data: emissionData, error: emissionError } = await supabase
      .from('event_emission_data')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (emissionError || !emissionData) {
      throw new Error(emissionError?.message || 'Failed to fetch emission data');
    }

    const { data: factors, error: factorError } = await supabase
      .from('emission_factors')
      .select('*')
      .in('category', ['energy', 'travel', 'catering', 'waste']);

    if (factorError || !factors) {
      throw new Error(factorError?.message || 'Failed to fetch emission factors');
    }

    return {
      event: event as EventRow,
      emissionData: emissionData as EventEmissionDataRow,
      factors: factors as EmissionFactorRow[]
    };
  }
}

export const eventRepository = new EventRepository();
