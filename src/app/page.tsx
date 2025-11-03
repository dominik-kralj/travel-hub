'use client';

import { FeatureCard } from '../components/ui/FeatureCard';
import Footer from '../components/ui/Footer';
import { Box, Heading, Text, Flex, Stack, Container } from '@chakra-ui/react';
import { MdFlight, MdPublic, MdMap, MdAddLocation } from 'react-icons/md';

export default function Home() {
    return (
        <Flex direction="column" minH="100vh">
            <Box
                bgImage="linear-gradient(90deg, #2563eb 0%, #14b8a6 100%)"
                color="white"
                py={{ base: 12, md: 20 }}
                px={{ base: 4, md: 0 }}
                textAlign="center"
            >
                <Heading
                    size={{ base: 'xl', md: '2xl' }}
                    mb={{ base: 2, md: 4 }}
                    lineHeight={{ base: 'short', md: 'shorter' }}
                >
                    Welcome to Travel Hub
                </Heading>

                <Text
                    fontSize={{ base: 'md', md: 'xl' }}
                    maxW={{ base: 'full', md: '2xl' }}
                    mx="auto"
                >
                    Your all-in-one platform for managing countries, airports, airlines, and routes.
                </Text>
            </Box>

            <Container maxW="5xl" py={16}>
                <Heading size="lg" mb={8} textAlign="center">
                    What can you do?
                </Heading>

                <Flex gap={8} flexWrap="wrap" justify="center">
                    <FeatureCard href="/countries" icon={MdPublic} title="Manage Countries" />

                    <FeatureCard href="/airports" icon={MdAddLocation} title="Manage Airports" />

                    <FeatureCard href="/airlines" icon={MdFlight} title="Manage Airlines" />

                    <FeatureCard href="/routes" icon={MdMap} title="Plan Routes" />
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

            <Footer />
        </Flex>
    );
}
