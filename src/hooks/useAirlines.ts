import useSWR from 'swr';
import { Airline } from '../models/Airline';
import { fetcher } from '../lib/fetcher';

export function useAirlines() {
    const { data, error, isLoading, mutate } = useSWR<Airline[]>('/api/airlines', fetcher);

    return {
        data: data || [],
        isLoading,
        error,
        mutate,
    };
}
