'use client';

import { AbsoluteCenter, Flex, Spinner, Text } from '@chakra-ui/react';

import AddCountryModal from './components/AddCountryModal';
import EditCountryModal from './components/EditCountryModal';
import DeleteCountryModal from './components/DeleteCountryModal';
import DataTable from '@/components/ui/DataTable';

import { useCountries } from '@/app/hooks/useCountries';
import { CrudPageLayout } from '@/components/ui/CrudPageLayout';

export default function CountriesPage() {
    const { data, isLoading, error } = useCountries();

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
                <Text color="red">Error while fetching countries!</Text>
            </AbsoluteCenter>
        );
    }

    return (
        <CrudPageLayout title="Countries" actions={<AddCountryModal />}>
            <DataTable
                data={data}
                columns={[
                    { header: 'Name', cell: (row) => row.name },
                    { header: 'Code', cell: (row) => row.code },
                    {
                        header: 'Actions',
                        cell: (row) => (
                            <Flex justify="flex-end" align="center" gap={2}>
                                <EditCountryModal country={row} />

                                <DeleteCountryModal country={row} />
                            </Flex>
                        ),
                        textAlign: 'right',
                    },
                ]}
            />
        </CrudPageLayout>
    );
}
