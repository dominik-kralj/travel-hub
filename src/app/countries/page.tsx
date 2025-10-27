'use client';

import {
	Box,
	Heading,
	Flex,
	Text,
	Spinner,
	Button,
	Table,
	AbsoluteCenter,
} from '@chakra-ui/react';

import AddCountryModal from './components/AddCountryModal';
import EditCountryModal from './components/EditCountryModal';
import DeleteCountryDialog from './components/DeleteCountryModal';
import { useCountries } from '@/app/hooks/useCountries';
import { useState } from 'react';

const PAGE_SIZE = 10;

export default function CountriesPage() {
	const { countries, isCountriesLoading, countriesError } = useCountries();
	const [page, setPage] = useState(1);

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
				<Text color="red">
					Error loading countries. Please try again.
				</Text>
			</AbsoluteCenter>
		);
	}

	const totalCountries = countries?.length || 0;
	const pageCount = Math.max(1, Math.ceil(totalCountries / PAGE_SIZE));
	const paginatedCountries =
		countries?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || [];

	if (totalCountries === 0)
		return (
			<AbsoluteCenter>
				<Text color="gray">
					No countries yet. Add your first country to get started!
				</Text>
			</AbsoluteCenter>
		);

	return (
		<Box p={8}>
			<Box
				bg="gray.50"
				borderRadius="lg"
				borderWidth="1px"
				px={6}
				py={4}
				mb={6}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				boxShadow="sm"
			>
				<Heading size="lg" color="blue.700" letterSpacing="tight">
					Countries
				</Heading>

				<AddCountryModal />
			</Box>

			<Box
				borderWidth="1px"
				borderRadius="lg"
				bg="white"
				overflowX="auto"
				shadow="sm"
				w="100%"
				maxW="100%"
				px={{ base: 0, md: 2 }}
				py={2}
			>
				<Table.Root w="100%" maxW="100%">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Name</Table.ColumnHeader>

							<Table.ColumnHeader
								maxW="80px"
								w="80px"
								textAlign="center"
							>
								Code
							</Table.ColumnHeader>

							<Table.ColumnHeader textAlign="end">
								Actions
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{paginatedCountries.map((country) => (
							<Table.Row
								key={country.id}
								_hover={{ bg: 'gray.50' }}
							>
								<Table.Cell>{country.name}</Table.Cell>

								<Table.Cell
									color="gray.600"
									textAlign="center"
									maxW="80px"
									w="80px"
									fontSize="sm"
								>
									{country.code}
								</Table.Cell>

								<Table.Cell>
									<Flex gap={2} justify="flex-end">
										<EditCountryModal country={country} />

										<DeleteCountryDialog
											country={country}
										/>
									</Flex>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>

					{totalCountries > PAGE_SIZE && (
						<Table.Footer>
							<Table.Row>
								<Table.Cell colSpan={3}>
									<Flex
										mt={2}
										justify="flex-end"
										gap={2}
										align="center"
									>
										<Button
											size="sm"
											onClick={() =>
												setPage((p) =>
													Math.max(1, p - 1),
												)
											}
											disabled={page === 1}
											variant="outline"
										>
											Previous
										</Button>

										<Text fontSize="sm" color="gray.600">
											Page {page} of {pageCount}
										</Text>

										<Button
											size="sm"
											onClick={() =>
												setPage((p) =>
													Math.min(pageCount, p + 1),
												)
											}
											disabled={page === pageCount}
											variant="outline"
										>
											Next
										</Button>
									</Flex>
								</Table.Cell>
							</Table.Row>
						</Table.Footer>
					)}
				</Table.Root>
			</Box>
		</Box>
	);
}
