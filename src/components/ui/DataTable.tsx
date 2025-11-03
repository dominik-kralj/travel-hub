'use client';

import { Box, Table, Flex, Text, IconButton, AbsoluteCenter } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ReactNode, useState } from 'react';

type Column<T> = {
    header: string | ReactNode;
    cell: (row: T) => ReactNode;
    width?: string | number;
    textAlign?: 'left' | 'center' | 'right';
};

type DataTableProps<T> = {
    data?: T[];
    columns: Column<T>[];
    pageSize?: number;
    isLoading?: boolean;
    error?: string | null;
    title?: string;
    actions?: ReactNode;
};

export default function DataTable<T>({ data = [], columns, pageSize = 10 }: DataTableProps<T>) {
    const [page, setPage] = useState(1);

    const total = data?.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const paginated = data?.slice((page - 1) * pageSize, page * pageSize);

    if (!total) {
        return (
            <AbsoluteCenter>
                <Text color="gray">No data found.</Text>
            </AbsoluteCenter>
        );
    }

    return (
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
                        {columns.map((col, idx) => (
                            <Table.ColumnHeader
                                key={idx}
                                w={col.width}
                                textAlign={col.textAlign || 'left'}
                            >
                                {col.header}
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginated.map((row, i) => (
                        <Table.Row key={i} _hover={{ bg: 'gray.50' }}>
                            {columns.map((col, idx) => (
                                <Table.Cell key={idx} textAlign={col.textAlign || 'left'}>
                                    {col.cell(row)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
                {pageCount > 1 && (
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan={columns.length}>
                                <Flex mt={2} justify="flex-end" gap={2} align="center">
                                    <IconButton
                                        aria-label="Previous page"
                                        size="sm"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        variant="ghost"
                                    >
                                        <MdChevronLeft />
                                    </IconButton>
                                    <Text fontSize="sm" color="gray.600">
                                        Page {page} of {pageCount}
                                    </Text>
                                    <IconButton
                                        aria-label="Next page"
                                        size="sm"
                                        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                        disabled={page === pageCount}
                                        variant="ghost"
                                    >
                                        <MdChevronRight />
                                    </IconButton>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                )}
            </Table.Root>
        </Box>
    );
}
