'use client';

import {
    Button,
    Dialog,
    Portal,
    DialogOpenChangeDetails,
    IconButton,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useTransition } from 'react';
import { MdDelete } from 'react-icons/md';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { deleteAirport } from '../actions'; // You need to implement this action!
import { useAirports } from '@/app/hooks/useAirports';
import { Airport } from '@/models/Airport';
import { Error } from '@/models/Error';

type DeleteAirportModalProps = {
    airport: Airport;
};

export default function DeleteAirportModal({ airport }: DeleteAirportModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useAirports();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteAirport(airport.id);
                toaster.create({
                    title: 'Airport deleted successfully!',
                    type: 'success',
                });
                await mutate();
                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title:
                        (error as Error)?.message ||
                        'Failed to delete airport!',
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
        <Dialog.Root
            open={open}
            onOpenChange={handleOpenChange}
            placement="center"
        >
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
                            Are you sure you want to delete{' '}
                            <strong>{airport.name}</strong>?
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                onClick={handleDelete}
                               	loading={isPending}
                            >
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