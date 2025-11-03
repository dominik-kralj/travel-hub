import { fetcher } from '@/lib/fetcher';
import { Country } from '@/models/Country';
import useSWR from 'swr';

export function useCountries() {
    const { data, error, mutate, isLoading } = useSWR<Country[]>('/api/countries', fetcher);

    return {
        data: data ?? [],
        isLoading,
        error,
        mutate,
    };
}
