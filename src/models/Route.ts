import { z } from 'zod';

export const RouteSchema = z
    .object({
        airlineId: z.number().min(1, 'Airline is required'),
        fromAirportId: z.number().min(1, 'Departure airport is required'),
        toAirportId: z.number().min(1, 'Destination airport is required'),
    })
    .refine((data) => data.fromAirportId !== data.toAirportId, {
        message: 'Departure and destination must be different',
        path: ['toAirportId'],
    });

export type RouteDTO = z.infer<typeof RouteSchema>;

export type Route = RouteDTO & {
    id: number;
    airline: { id: number; name: string };
    fromAirport: { id: number; name: string; iata: string | null; icao: string };
    toAirport: { id: number; name: string; iata: string | null; icao: string };
};
