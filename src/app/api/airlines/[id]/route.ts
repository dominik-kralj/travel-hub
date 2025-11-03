import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AirlineSchema } from '@/models/Airline';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const airlineId = parseInt(id);

        const body = await request.json();
        const parsed = AirlineSchema.parse(body);

        const airline = await prisma.airline.update({
            where: { id: airlineId },
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const airlineId = parseInt(id);

        await prisma.airline.delete({
            where: { id: airlineId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[DELETE /airlines/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete airline' }, { status: 500 });
    }
}
