'use client';

import { Controller, useForm } from 'react-hook-form';
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

import { CountrySelect } from '@/app/airports/components/CountrySelect';

import { createAirline } from '../actions';
import AirportMultiSelect from './AirportMultiSelect';
import { AirlineDTO, AirlineSchema } from '@/models/Airline';
import { toaster } from '@/components/chakra-ui/toaster';
import { useAirlines } from '@/hooks/useAirlines';
import { useAirports } from '@/hooks/useAirports';
import { useCountries } from '@/hooks/useCountries';

export default function AddAirlineModal() {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useAirlines();
    const { data: countries } = useCountries();
    const { data: airports } = useAirports();

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, touchedFields, isValid },
        reset,
    } = useForm<AirlineDTO>({
        resolver: zodResolver(AirlineSchema),
        defaultValues: {
            name: '',
            countryId: 0,
            airportIds: [],
        },
        mode: 'onTouched',
    });

    const onAirlineSubmit = (data: AirlineDTO) => {
        startTransition(async () => {
            try {
                await createAirline(data);
                await mutate();

                toaster.create({
                    title: 'Airline created successfully!',
                    type: 'success',
                });

                reset();
                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to create airline!',
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
                <Button colorPalette="blue">Add Airline</Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <form onSubmit={handleSubmit(onAirlineSubmit)}>
                            <Dialog.Header>Add New Airline</Dialog.Header>

                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root invalid={!!errors.name && touchedFields.name}>
                                        <Field.Label>Airline Name</Field.Label>

                                        <Input
                                            placeholder="e.g., American Airlines"
                                            {...register('name')}
                                        />

                                        {errors.name && touchedFields.name && (
                                            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        invalid={!!errors.countryId && touchedFields.countryId}
                                    >
                                        <Controller
                                            control={control}
                                            name="countryId"
                                            render={({ field }) => (
                                                <CountrySelect
                                                    data={countries}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) =>
                                                        field.onChange(val ? Number(val) : 0)
                                                    }
                                                />
                                            )}
                                        />

                                        {errors.countryId && touchedFields.countryId && (
                                            <Field.ErrorText>
                                                {errors.countryId.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        invalid={Boolean(
                                            !!errors.airportIds && touchedFields.airportIds,
                                        )}
                                    >
                                        <Controller
                                            control={control}
                                            name="airportIds"
                                            render={({ field }) => (
                                                <AirportMultiSelect
                                                    data={airports}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />

                                        {errors.airportIds && touchedFields.airportIds && (
                                            <Field.ErrorText>
                                                {errors.airportIds.message}
                                            </Field.ErrorText>
                                        )}
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
