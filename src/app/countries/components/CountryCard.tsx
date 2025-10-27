'use client';

import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import EditCountryModal from './EditCountryModal';
import DeleteCountryDialog from './DeleteCountryModal';

type Country = {
	id: number;
	name: string;
	code: string;
};

type CountryCardProps = {
	country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
	return (
		<Box
			p={4}
			borderWidth="1px"
			borderRadius="lg"
			_hover={{ shadow: 'md' }}
			transition="all 0.2s"
			position="relative"
		>
			<Flex justify="space-between" align="start">
				<Box flex="1">
					<Heading size="sm" mb={2}>
						{country.name}
					</Heading>
					<Text fontSize="sm" color="gray.600">
						Code: {country.code}
					</Text>
				</Box>

				<Flex gap={2}>
					<EditCountryModal country={country} />
					<DeleteCountryDialog country={country} />
				</Flex>
			</Flex>
		</Box>
	);
}
