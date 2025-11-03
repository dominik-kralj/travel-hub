import { z } from 'zod';

export const AirlineSchema = z.object({
    name: z.string().trim().min(1, 'Airline name is required'),
    countryId: z.number().min(1, 'Base country is required'),
    airportIds: z.array(z.number()).min(1, 'At least one serviced airport is required'),
});

export type AirlineDTO = z.infer<typeof AirlineSchema>;

export type Airline = AirlineDTO & {
    id: number;
    country: { id: number; name: string; code: string };
    airlinesOnAirports: Array<{
        airport: { id: number; name: string; iata: string | null; icao: string };
    }>;
};
