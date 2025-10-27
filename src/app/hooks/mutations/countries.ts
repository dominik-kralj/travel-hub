import { CountryDTO } from '@/models/Country';

export async function createCountryMutation(
	url: string,
	{ arg: body }: { arg: CountryDTO },
) {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'Failed to create country');
	}

	return res.json();
}

export async function updateCountryMutation(
	url: string,
	{ arg }: { arg: { id: number; data: CountryDTO } },
) {
	const res = await fetch(`/api/countries/${arg.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(arg.data),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'Failed to update country');
	}

	return res.json();
}

export async function deleteCountryMutation(
	url: string,
	{ arg: id }: { arg: number },
) {
	const res = await fetch(`/api/countries/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'Failed to delete country');
	}
}
