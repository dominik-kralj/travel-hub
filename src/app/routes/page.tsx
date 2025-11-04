'use client';

import { AbsoluteCenter, Flex, Spinner, Text } from '@chakra-ui/react';

import DataTable from '@/components/ui/DataTable';

import { useRoutes } from '@/hooks/useRoutes';
import { CrudPageLayout } from '@/components/ui/CrudPageLayout';
import AddRouteModal from './components/AddRouteModal';
import DeleteRouteModal from './components/DeleteRouteModal';
import EditRouteModal from './components/EditRouteModal';

export default function RoutesPage() {
    const { data, isLoading, error } = useRoutes();

    if (isLoading) {
        return (
            <AbsoluteCenter>
                <Spinner size="xl" color="blue" />
            </AbsoluteCenter>
        );
    }

    if (error) {
        return (
            <AbsoluteCenter>
                <Text color="red">Error while fetching routes!</Text>
            </AbsoluteCenter>
        );
    }

    return (
        <CrudPageLayout title="Routes" actions={<AddRouteModal />}>
            <DataTable
                data={data}
                columns={[
                    { header: 'Airline', cell: (row) => row.airline.name },
                    {
                        header: 'From',
                        cell: (row) => `${row.fromAirport.name} (${row.fromAirport.icao})`,
                    },
                    {
                        header: 'To',
                        cell: (row) => `${row.toAirport.name} (${row.toAirport.icao})`,
                    },
                    {
                        header: 'Actions',
                        cell: (row) => (
                            <Flex justify="flex-end" align="center" gap={2}>
                                <EditRouteModal route={row} />
                                <DeleteRouteModal route={row} />
                            </Flex>
                        ),
                        textAlign: 'right',
                    },
                ]}
            />
        </CrudPageLayout>
    );
}
