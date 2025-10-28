'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AirportDTO, AirportSchema } from '@/models/Airport';

export async function getAirports() {
	return prisma.airport.findMany({
		include: { country: true },
		orderBy: { name: 'asc' },
	});
}

export async function createAirport(data: AirportDTO) {
	const parsed = AirportSchema.parse(data);

	await prisma.airport.create({ data: parsed });
	revalidatePath('/airports');
}

export async function updateAirport(id: number, data: AirportDTO) {
	const parsed = AirportSchema.parse(data);

	await prisma.airport.update({
		where: { id },
		data: parsed,
	});
	revalidatePath('/airports');
}

export async function deleteAirport(id: number) {
	await prisma.airport.delete({ where: { id } });
	revalidatePath('/airports');
}
