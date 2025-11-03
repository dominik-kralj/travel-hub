import { prisma } from '@/lib/prisma';
import { AirportSchema } from '@/models/Airport';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const airport = await prisma.airport.findUnique({
            where: { id: Number(params.id) },
            include: { country: true },
        });
        if (!airport) {
            return NextResponse.json({ error: 'Airport not found' }, { status: 404 });
        }
        return NextResponse.json(airport);
    } catch (error) {
        console.error('[GET /airports/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch airport' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const parsed = AirportSchema.parse(body);

        const updated = await prisma.airport.update({
            where: { id: Number(params.id) },
            data: parsed,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PUT /airports/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update airport' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.airport.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ message: 'Airport deleted successfully' });
    } catch (error) {
        console.error('[DELETE /airports/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete airport' }, { status: 500 });
    }
}
