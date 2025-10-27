import { toaster } from '@/components/chakra-ui/toaster';
import { fetcher } from '@/lib/fetcher';
import { Country, CountryDTO } from '@/models/Country';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
	createCountryMutation,
	updateCountryMutation,
	deleteCountryMutation,
} from './mutations/countries';
import { Error } from '@/models/Error';

const COUNTRIES_KEY = '/api/countries';

export const useCountries = (config?: SWRConfiguration) => {
	const { data, mutate, isLoading, error } = useSWR<Country[]>(
		COUNTRIES_KEY,
		fetcher,
		config,
	);

	const { trigger: createCountry, isMutating: isCreating } = useSWRMutation<
		Country,
		unknown,
		string,
		CountryDTO
	>(COUNTRIES_KEY, createCountryMutation, {
		onSuccess: async () => {
			await mutate();
			toaster.create({
				title: 'Country created successfully',
				type: 'success',
			});
		},
		onError: (error: unknown) => {
			toaster.create({
				title: (error as Error).message || 'Failed to create country',
				type: 'error',
			});
		},
	});

	const { trigger: updateCountry, isMutating: isUpdating } = useSWRMutation<
		Country,
		unknown,
		string,
		{ id: number; data: CountryDTO }
	>(COUNTRIES_KEY, updateCountryMutation, {
		onSuccess: async () => {
			await mutate();
			toaster.create({
				title: 'Country updated successfully',
				type: 'success',
			});
		},
		onError: (error: unknown) => {
			toaster.create({
				title: (error as Error).message || 'Failed to update country',
				type: 'error',
			});
		},
	});

	const { trigger: deleteCountry, isMutating: isDeleting } = useSWRMutation<
		void,
		unknown,
		string,
		number
	>(COUNTRIES_KEY, deleteCountryMutation, {
		onSuccess: async () => {
			await mutate();
			toaster.create({
				title: 'Country deleted successfully',
				type: 'success',
			});
		},
		onError: (error: unknown) => {
			toaster.create({
				title: (error as Error).message || 'Failed to delete country',
				type: 'error',
			});
		},
	});

	return {
		countries: data,
		isCountriesLoading: isLoading,
		countriesError: error,
		mutateCountries: mutate,
		createCountry,
		isCountryCreating: isCreating,
		updateCountry,
		isCountryUpdating: isUpdating,
		deleteCountry,
		isCountryDeleting: isDeleting,
	};
};
