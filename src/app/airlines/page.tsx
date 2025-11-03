'use client';

import { AbsoluteCenter, Flex, Spinner, Text } from '@chakra-ui/react';

import DeleteAirlineModal from './components/DeleteAirlineModal';
import AddAirlineModal from './components/AddAirlineModal';
import EditAirlineModal from './components/EditAirlineModal';
import { CrudPageLayout } from '@/components/ui/CrudPageLayout';
import DataTable from '@/components/ui/DataTable';
import { useAirlines } from '@/hooks/useAirlines';
import { Toaster } from '@/components/chakra-ui/toaster';

export default function AirlinesPage() {
    const { data, isLoading, error } = useAirlines();

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
                <Text color="red">Error while fetching airlines!</Text>
            </AbsoluteCenter>
        );
    }

    return (
        <>
            <CrudPageLayout title="Airlines" actions={<AddAirlineModal />}>
                <DataTable
                    data={data}
                    columns={[
                        { header: 'Name', cell: (row) => row.name },
                        {
                            header: 'Base Country',
                            cell: (row) => row.country.name,
                        },
                        {
                            header: 'Serviced Airports',
                            cell: (row) =>
                                row.airlinesOnAirports?.map((a) => a.airport.name).join(', '),
                        },
                        {
                            header: 'Actions',
                            cell: (row) => (
                                <Flex justify="flex-end" align="center" gap={2}>
                                    <EditAirlineModal airline={row} />
                                    <DeleteAirlineModal airline={row} />
                                </Flex>
                            ),
                            textAlign: 'right',
                        },
                    ]}
                />
            </CrudPageLayout>
            <Toaster />
        </>
    );
}
