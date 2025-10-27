'use server';

import { prisma } from '@/lib/prisma';
import { CountryDTO, CountrySchema } from '@/models/Country';
import { revalidatePath } from 'next/cache';

export async function createCountry(data: CountryDTO) {
	const validatedData = CountrySchema.parse(data);

	await prisma.country.create({
		data: validatedData,
	});

	revalidatePath('/countries');
}

export async function updateCountry(id: number, data: CountryDTO) {
	const validatedData = CountrySchema.parse(data);

	await prisma.country.update({
		where: { id },
		data: validatedData,
	});

	revalidatePath('/countries');
}

export async function deleteCountry(id: number) {
	await prisma.country.delete({
		where: { id },
	});

	revalidatePath('/countries');
}
