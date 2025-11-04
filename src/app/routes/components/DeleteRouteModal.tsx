'use client';

import { useTransition } from 'react';
import {
    Button,
    Dialog,
    Portal,
    DialogOpenChangeDetails,
    IconButton,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { deleteRoute } from '../actions';
import { useRoutes } from '@/hooks/useRoutes';
import { Route } from '@/models/Route';
import { Error } from '@/models/Error';

interface DeleteRouteModalProps {
    route: Route;
}

export default function DeleteRouteModal({ route }: DeleteRouteModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useRoutes();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteRoute(route.id);
                await mutate();

                toaster.create({
                    title: 'Route deleted successfully!',
                    type: 'success',
                });

                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to delete route!',
                    type: 'error',
                });
            }
        });
    };

    const handleOpenChange = (details: DialogOpenChangeDetails) => {
        if (details.open) {
            onOpen();
        } else {
            onClose();
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
            <Dialog.Trigger asChild>
                <IconButton aria-label="Delete route" size="sm" variant="ghost" colorPalette="red">
                    <MdDelete />
                </IconButton>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Header>Delete Route</Dialog.Header>

                        <Dialog.Body>
                            Are you sure you want to delete the route from{' '}
                            <strong>{route.fromAirport.name}</strong> to{' '}
                            <strong>{route.toAirport.name}</strong> operated by{' '}
                            <strong>{route.airline.name}</strong>?
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            <Button colorPalette="red" onClick={handleDelete} loading={isPending}>
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <Toaster />
        </Dialog.Root>
    );
}
