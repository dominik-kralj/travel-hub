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

import { deleteAirport } from '../actions';
import { toaster } from '@/components/chakra-ui/toaster';
import { useAirports } from '@/hooks/useAirports';
import { Airport } from '@/models/Airport';

interface DeleteAirportModalProps {
    airport: Airport;
}

export default function DeleteAirportModal({ airport }: DeleteAirportModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useAirports();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteAirport(airport.id);
                await mutate();

                toaster.create({
                    title: 'Airport deleted successfully!',
                    type: 'success',
                });

                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to delete airport!',
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
                <IconButton
                    aria-label="Delete airport"
                    size="sm"
                    variant="ghost"
                    colorPalette="red"
                >
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

                        <Dialog.Header>Delete Airport</Dialog.Header>

                        <Dialog.Body>
                            Are you sure you want to delete <strong>{airport.name}</strong>?
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
        </Dialog.Root>
    );
}
