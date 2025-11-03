import { prisma } from '@/lib/prisma';
import { CountrySchema } from '@/models/Country';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const country = await prisma.country.findUnique({
            where: { id: Number(id) },
        });
        if (!country) {
            return NextResponse.json({ error: 'Country not found' }, { status: 404 });
        }
        return NextResponse.json(country);
    } catch (error) {
        console.error('[GET /countries/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const parsed = CountrySchema.parse(body);

        const updated = await prisma.country.update({
            where: { id: Number(id) },
            data: parsed,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PUT /countries/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.country.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('[DELETE /countries/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
    }
}
