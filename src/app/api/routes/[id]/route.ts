import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RouteSchema } from '@/models/Route';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const route = await prisma.route.findUnique({
            where: { id: Number(id) },
            include: {
                airline: { select: { id: true, name: true } },
                fromAirport: { select: { id: true, name: true, iata: true, icao: true } },
                toAirport: { select: { id: true, name: true, iata: true, icao: true } },
            },
        });

        if (!route) {
            return NextResponse.json({ error: 'Route not found' }, { status: 404 });
        }

        return NextResponse.json(route);
    } catch (error) {
        console.error('[GET /routes/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const parsed = RouteSchema.parse(body);

        const route = await prisma.route.update({
            where: { id: Number(id) },
            data: {
                airlineId: parsed.airlineId,
                fromAirportId: parsed.fromAirportId,
                toAirportId: parsed.toAirportId,
            },
            include: {
                airline: { select: { id: true, name: true } },
                fromAirport: { select: { id: true, name: true, iata: true, icao: true } },
                toAirport: { select: { id: true, name: true, iata: true, icao: true } },
            },
        });

        return NextResponse.json(route);
    } catch (error) {
        console.error('[PUT /routes/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.route.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[DELETE /routes/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete route' }, { status: 500 });
    }
}
