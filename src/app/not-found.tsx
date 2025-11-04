import { AbsoluteCenter, Heading, Text, VStack } from '@chakra-ui/react';

export default function NotFound() {
    return (
        <AbsoluteCenter>
            <VStack gap={6} textAlign="center">
                <Heading size="4xl" color="blue.500">
                    404
                </Heading>

                <Heading size="xl">Page Not Found</Heading>

                <Text color="gray.600" fontSize="lg">
                    The page you are looking for does not exist or has been moved.
                </Text>
            </VStack>
        </AbsoluteCenter>
    );
}
