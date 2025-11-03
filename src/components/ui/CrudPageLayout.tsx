import { Box, Heading, Text, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import BackButton from './BackButton';

type CrudPageLayoutProps = {
    title: string;
    actions?: ReactNode;
    children: ReactNode;
};

export function CrudPageLayout({ title, actions, children }: CrudPageLayoutProps) {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box flex="1" p={6}>
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
                        {title}
                    </Heading>

                    {actions}
                </Box>

                {children}
            </Box>

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
        </Box>
    );
}
