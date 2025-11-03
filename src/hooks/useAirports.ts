'use client';

import useSWR from 'swr';
import { Airport } from '../models/Airport';
import { fetcher } from '../lib/fetcher';

export function useAirports() {
    const { data, error, isLoading, mutate } = useSWR<Airport[]>('/api/airports', fetcher);
    return { data: data ?? [], isLoading, error, mutate };
}
