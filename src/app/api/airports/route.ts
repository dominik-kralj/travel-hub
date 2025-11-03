import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AirportSchema } from '@/models/Airport';

export async function GET() {
    try {
        const airports = await prisma.airport.findMany({
            orderBy: { name: 'asc' },
            include: {
                country: { select: { id: true, name: true, code: true } },
            },
        });
        return NextResponse.json(airports);
    } catch (error) {
        console.error('Failed to fetch airports:', error);
        return NextResponse.json({ message: 'Failed to fetch airports' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = AirportSchema.parse(body);

        const airport = await prisma.airport.create({
            data: parsed,
        });

        return NextResponse.json(airport, { status: 201 });
    } catch (error) {
        console.error('[POST /airports] Error:', error);
        return NextResponse.json({ error: 'Failed to create airport' }, { status: 500 });
    }
}
