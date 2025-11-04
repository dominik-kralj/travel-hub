import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const routes = await prisma.route.findMany({
            orderBy: [{ airline: { name: 'asc' } }, { fromAirport: { name: 'asc' } }],
            include: {
                airline: { select: { id: true, name: true } },
                fromAirport: { select: { id: true, name: true, iata: true, icao: true } },
                toAirport: { select: { id: true, name: true, iata: true, icao: true } },
            },
        });

        return NextResponse.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
    }
}
