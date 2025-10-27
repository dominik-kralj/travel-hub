import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { CountrySchema } from '@/models/Country';

export async function GET() {
	try {
		const countries = await prisma.country.findMany({
			orderBy: { name: 'asc' },
		});
		return NextResponse.json(countries);
	} catch (error) {
		console.error('Failed to fetch countries:', error);
		return NextResponse.json(
			{ message: 'Failed to fetch countries' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = CountrySchema.parse(body);

		const country = await prisma.country.create({
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

		console.error('Failed to create country:', error);

		return NextResponse.json(
			{ message: 'Failed to create country' },
			{ status: 500 },
		);
	}
}
