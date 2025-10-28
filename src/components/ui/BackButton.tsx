import { Link as ChakraLink, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdArrowBack } from 'react-icons/md';

export default function BackButton() {
    return (
        <ChakraLink asChild>
            <NextLink href="/">
                <IconButton variant="ghost" aria-label="Back">
                    <MdArrowBack />
                </IconButton>
            </NextLink>
        </ChakraLink>
    );
}