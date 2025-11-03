'use client';

import {
    Button,
    Dialog,
    Portal,
    CloseButton,
    Text,
    useDisclosure,
    IconButton,
    DialogOpenChangeDetails,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useTransition } from 'react';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { Country } from '@/models/Country';
import { deleteCountry } from '../actions';
import { useCountries } from '@/app/hooks/useCountries';
import { Error } from '@/models/Error';

type DeleteCountryModalProps = {
    country: Country;
};

export default function DeleteCountryModal({ country }: DeleteCountryModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useCountries();

    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteCountry(country.id);
                await mutate();
                toaster.create({
                    title: 'Country deleted successfully!',
                    type: 'success',
                });
                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error) || 'Failed to delete country!',
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
                <IconButton aria-label="Delete country" size="sm" variant="ghost" color="red.500">
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

                        <Dialog.Header>Delete Country</Dialog.Header>

                        <Dialog.Body>
                            <Text>
                                Are you sure you want to delete <strong>{country.name}</strong>?
                                This action cannot be undone.
                            </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            <Button
                                colorPalette="red"
                                onClick={handleDelete}
                                loading={isPending}
                                disabled={isPending}
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
