'use client';

import {
	AbsoluteCenter,
	Box,
	Flex,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';

import { DataTable } from '@/components/ui/DataTable';
import { useCountries } from '@/app/hooks/useCountries';

import AddCountryModal from './components/AddCountryModal';
import EditCountryModal from './components/EditCountryModal';
import DeleteCountryModal from './components/DeleteCountryModal';
import { BackButton } from '@/components/ui/BackButton';

export default function CountriesPage() {
	const { countries, isCountriesLoading, countriesError } = useCountries();

	if (isCountriesLoading) {
		return (
			<AbsoluteCenter>
				<Spinner size="xl" color="blue" />
			</AbsoluteCenter>
		);
	}

	if (countriesError) {
		return (
			<AbsoluteCenter>
				<Text color="red">Error while fetching countries!</Text>
			</AbsoluteCenter>
		);
	}

	return (
		<Box p={6}>
			<Box
				bg="gray.50"
				borderRadius="lg"
				borderWidth="1px"
				p={4}
				mb={6}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				boxShadow="sm"
			>
				<BackButton />

				<Heading size="lg" color="blue.700" letterSpacing="tight">
					Countries
				</Heading>

				<AddCountryModal />
			</Box>

			<DataTable
				data={countries ?? []}
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
		</Box>
	);
}
