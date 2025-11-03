import { z } from 'zod';

export const AirportSchema = z.object({
    name: z.string().min(1, 'Airport name is required'),
    iata: z.string().length(3, 'IATA must be exactly 3 letters'),
    icao: z.string().length(4, 'ICAO must be exactly 4 letters'),
    latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
    longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
    countryId: z.number(),
});

export type AirportDTO = z.infer<typeof AirportSchema>;
export type Airport = AirportDTO & {
    id: number;
    country: { id: number; name: string; code: string };
};
