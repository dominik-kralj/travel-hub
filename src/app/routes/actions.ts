'use server';

import { prisma } from '@/lib/prisma';
import { RouteDTO, RouteSchema } from '@/models/Route';
import { revalidatePath } from 'next/cache';

export async function createRoute(data: RouteDTO) {
    const parsed = RouteSchema.parse(data);

    await prisma.route.create({
        data: {
            airlineId: parsed.airlineId,
            fromAirportId: parsed.fromAirportId,
            toAirportId: parsed.toAirportId,
        },
    });

    revalidatePath('/routes');
}

export async function updateRoute(id: number, data: RouteDTO) {
    const parsed = RouteSchema.parse(data);

    await prisma.route.update({
        where: { id },
        data: {
            airlineId: parsed.airlineId,
            fromAirportId: parsed.fromAirportId,
            toAirportId: parsed.toAirportId,
        },
    });

    revalidatePath('/routes');
}

export async function deleteRoute(id: number) {
    await prisma.route.delete({
        where: { id },
    });

    revalidatePath('/routes');
}
