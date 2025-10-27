import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { CountrySchema } from '@/models/Country';

type RouteContext = {
	params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;
		const body = await request.json();
		const validatedData = CountrySchema.parse(body);

		const country = await prisma.country.update({
			where: { id: parseInt(id) },
			data: validatedData,
		});

		return NextResponse.json(country);
	} catch (error: unknown) {
		if (
			typeof error === 'object' &&
			error !== null &&
			'code' in error &&
			(error as { code?: string }).code === 'P2002'
		) {
			return NextResponse.json(
				{ message: 'Country with this name or code already exists' },
				{ status: 400 },
			);
		}
		console.error('Failed to update country:', error);
		return NextResponse.json(
			{ message: 'Failed to update country' },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;

		await prisma.country.delete({
			where: { id: parseInt(id) },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Failed to delete country:', error);
		return NextResponse.json(
			{ message: 'Failed to delete country' },
			{ status: 500 },
		);
	}
}
