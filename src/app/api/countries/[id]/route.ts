import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CountrySchema } from '@/models/Country';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const country = await prisma.country.findUnique({
            where: { id: Number(params.id) },
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const parsed = CountrySchema.parse(body);

        const updated = await prisma.country.update({
            where: { id: Number(params.id) },
            data: parsed,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PUT /countries/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.country.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('[DELETE /countries/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
    }
}
