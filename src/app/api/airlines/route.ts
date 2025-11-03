import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const airlines = await prisma.airline.findMany({
            orderBy: { name: 'asc' },
            include: {
                country: { select: { id: true, name: true, code: true } },
                airlinesOnAirports: {
                    include: {
                        airport: { select: { id: true, name: true, iata: true, icao: true } },
                    },
                },
            },
        });

        return NextResponse.json(airlines);
    } catch (error) {
        console.error('Error fetching airlines:', error);
        return NextResponse.json({ error: 'Failed to fetch airlines' }, { status: 500 });
    }
}
