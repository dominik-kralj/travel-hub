'use client';

import { FeatureCard } from '@/components/ui/FeatureCard';
import { Box, Heading, Text, Flex, Stack, Container } from '@chakra-ui/react';
import {
	MdFlight,
	MdPublic,
	MdMap,
	MdAddLocation,
	MdCopyright,
} from 'react-icons/md';

export default function Home() {
	return (
		<Flex direction="column" minH="100vh">
			<Box
				bgImage="linear-gradient(90deg, #2563eb 0%, #14b8a6 100%)"
				color="white"
				py={20}
				textAlign="center"
			>
				<Heading size="2xl" mb={4}>
					Welcome to Travel Hub
				</Heading>

				<Text fontSize="xl">
					Your all-in-one platform for managing countries, airports,
					airlines, and routes.
				</Text>
			</Box>

			<Container maxW="5xl" py={16}>
				<Heading size="lg" mb={8} textAlign="center">
					What can you do?
				</Heading>

				<Flex gap={8} flexWrap="wrap" justify="center">
					<FeatureCard
						href="/countries"
						icon={MdPublic}
						title="Manage Countries"
					/>

					<FeatureCard
						href="/airports"
						icon={MdAddLocation}
						title="Manage Airports"
					/>

					<FeatureCard
						href="/airlines"
						icon={MdFlight}
						title="Manage Airlines"
					/>

					<FeatureCard
						href="/routes"
						icon={MdMap}
						title="Plan Routes"
					/>
				</Flex>
			</Container>

			<Container maxW="4xl" py={12}>
				<Heading size="md" mb={6} textAlign="center">
					How it works
				</Heading>

				<Stack align="center">
					<Text>1. Add countries and airports</Text>
					<Text>2. Add airlines</Text>
					<Text>3. Plan and visualize your routes</Text>
				</Stack>
			</Container>

			<Flex
				as="footer"
				py={6}
				align="center"
				justifyContent="center"
				gap={1}
				fontSize="sm"
				mt="auto"
			>
				<MdCopyright
					style={{ display: 'inline', verticalAlign: 'middle' }}
				/>
				{new Date().getFullYear()} Travel Hub. All rights reserved.
			</Flex>
		</Flex>
	);
}
