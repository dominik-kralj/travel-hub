import { Box, HStack, Text } from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            as="footer"
            bg="gray.100"
            borderTopWidth="1px"
            borderColor="gray.200"
            py={4}
            px={6}
            mt="auto"
        >
            <HStack justify="center" align="center">
                <Text fontSize="sm" color="gray.600" textAlign="center">
                    © {new Date().getFullYear()} Travel Hub. All rights reserved.
                </Text>
            </HStack>
        </Box>
    );
}
