'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Input,
    Dialog,
    Portal,
    Stack,
    Field,
    CloseButton,
    useDisclosure,
    DialogOpenChangeDetails,
} from '@chakra-ui/react';
import { useTransition } from 'react';

import { CountryDTO, CountrySchema } from '@/models/Country';
import { toaster } from '@/components/chakra-ui/toaster';
import { useCountries } from '@/hooks/useCountries';
import { createCountry } from '../actions';

export default function AddCountryModal() {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useCountries();

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
        reset,
    } = useForm<CountryDTO>({
        resolver: zodResolver(CountrySchema),
        defaultValues: { name: '', code: '' },
        mode: 'onTouched',
    });

    const onCountrySubmit = (data: CountryDTO) => {
        startTransition(async () => {
            try {
                await createCountry(data);
                toaster.create({
                    title: 'Country created successfully!',
                    type: 'success',
                });
                await mutate();
                reset();
                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error) || 'Failed to create a country!',
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
            reset();
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
            <Dialog.Trigger asChild>
                <Button colorPalette="blue">Add Country</Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <form onSubmit={handleSubmit(onCountrySubmit)}>
                            <Dialog.Header>Add Country</Dialog.Header>

                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root invalid={!!errors.name && touchedFields.name}>
                                        <Field.Label>Country Name</Field.Label>
                                        <Input
                                            placeholder="e.g., United States"
                                            {...register('name')}
                                        />
                                        {errors.name && touchedFields.name && (
                                            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.code && touchedFields.code}>
                                        <Field.Label>Country Code</Field.Label>
                                        <Input
                                            placeholder="e.g., US or USA"
                                            {...register('code')}
                                            textTransform="uppercase"
                                        />
                                        {errors.code && touchedFields.code && (
                                            <Field.ErrorText>{errors.code.message}</Field.ErrorText>
                                        )}
                                        <Field.HelperText>
                                            2-3 character country code (ISO format)
                                        </Field.HelperText>
                                    </Field.Root>
                                </Stack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>

                                <Button
                                    type="submit"
                                    colorPalette="blue"
                                    disabled={!isValid || isPending}
                                    loading={isPending}
                                >
                                    Save
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
