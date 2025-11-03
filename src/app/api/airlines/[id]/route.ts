import { NextResponse } from 'next/server';
import { AirlineSchema } from '@/models/Airline';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const parsed = AirlineSchema.parse(body);

        const airline = await prisma.airline.update({
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
            include: {
                country: { select: { id: true, name: true, code: true } },
                airlinesOnAirports: {
                    include: {
                        airport: { select: { id: true, name: true, iata: true, icao: true } },
                    },
                },
            },
        });

        return NextResponse.json(airline);
    } catch (error) {
        console.error('[PUT /airlines/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update airline' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        await prisma.airline.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[DELETE /airlines/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete airline' }, { status: 500 });
    }
}
