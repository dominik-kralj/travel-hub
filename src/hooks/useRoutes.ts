import useSWR from 'swr';
import { Route } from '@/models/Route';
import { fetcher } from '@/lib/fetcher';

export function useRoutes() {
    const { data, error, isLoading, mutate } = useSWR<Route[]>('/api/routes', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    };
}
