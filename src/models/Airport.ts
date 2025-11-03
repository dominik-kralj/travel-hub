import { z } from 'zod';

export const AirportSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    iata: z
        .string()
        .trim()
        .length(3, 'IATA must be exactly 3 characters')
        .optional()
        .or(z.literal('')),
    icao: z.string().trim().length(4, 'ICAO must be exactly 4 characters'),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    countryId: z.number().min(1, 'Country is required'),
});

export type AirportDTO = z.infer<typeof AirportSchema>;

export type Airport = AirportDTO & {
    id: number;
    country: { id: number; name: string; code: string };
};
