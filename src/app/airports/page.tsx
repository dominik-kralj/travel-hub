'use client';

import {
	AbsoluteCenter,
	Flex,
	Spinner,
	Text,
} from '@chakra-ui/react';

import AddAirportModal from './components/AddAirportModal';
import EditAirportModal from './components/EditAirportModal';
import DeleteAirportModal from './components/DeleteAirportModal';
import DataTable  from '@/components/ui/DataTable';


import { useAirports } from '@/app/hooks/useAirports';
import { CrudPageLayout } from '@/components/ui/CrudPageLayout';


export default function AirportsPage() {
	const { data, isLoading, error } = useAirports();

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
				<Text color="red">Error while fetching airports!</Text>
			</AbsoluteCenter>
		);
	}

	return (
		<CrudPageLayout title="Airports" actions={<AddAirportModal />}>
			<DataTable
				data={data}
				columns={[
					{ header: 'Name', cell: (row) => row.name },
					{ header: 'IATA', cell: (row) => row.iata.toUpperCase() },
					{ header: 'ICAO', cell: (row) => row.icao.toUpperCase() },
					{ header: 'Latitude', cell: (row) => row.latitude },
					{ header: 'Longitude', cell: (row) => row.longitude },
					{
						header: 'Country',
						cell: (row) => row.country?.name ?? '-',
					},
					{
						header: 'Actions',
						cell: (row) => (
							<Flex justify="flex-end" align="center" gap={2}>
								<EditAirportModal airport={row} />
								<DeleteAirportModal airport={row} />
							</Flex>
						),
						textAlign: 'right',
					},
				]}
			/>
		</CrudPageLayout>
	);
}
