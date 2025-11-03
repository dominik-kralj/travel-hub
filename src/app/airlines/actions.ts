'use server';

import { prisma } from '@/lib/prisma';
import { AirlineDTO, AirlineSchema } from '@/models/Airline';

export async function createAirline(data: AirlineDTO) {
    const parsed = AirlineSchema.parse(data);

    await prisma.airline.create({
        data: {
            name: parsed.name,
            countryId: parsed.countryId,
            airlinesOnAirports: {
                create: parsed.airportIds.map((airportId) => ({
                    airportId,
                })),
            },
        },
    });
}

export async function updateAirline(id: number, data: AirlineDTO) {
    const parsed = AirlineSchema.parse(data);

    await prisma.airline.update({
        where: { id },
        data: {
            name: parsed.name,
            countryId: parsed.countryId,
            airlinesOnAirports: {
                deleteMany: {},
                create: parsed.airportIds.map((airportId) => ({
                    airportId,
                })),
            },
        },
    });
}

export async function deleteAirline(id: number) {
    await prisma.airline.delete({
        where: { id },
    });
}
