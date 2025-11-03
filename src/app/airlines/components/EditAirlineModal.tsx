'use client';

import { useEffect, useTransition } from 'react';
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
    IconButton,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

import { updateAirline } from '../actions';

import { CountrySelect } from '@/app/airports/components/CountrySelect';

import AirportMultiSelect from './AirportMultiSelect';
import { Airline, AirlineDTO, AirlineSchema } from '@/models/Airline';
import { toaster } from '@/components/chakra-ui/toaster';
import { useAirlines } from '@/hooks/useAirlines';
import { useAirports } from '@/hooks/useAirports';
import { useCountries } from '@/hooks/useCountries';

interface EditAirlineModalProps {
    airline: Airline;
}

export default function EditAirlineModal({ airline }: EditAirlineModalProps) {
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
            name: airline.name,
            countryId: airline.countryId,
            airportIds: airline.airlinesOnAirports?.map((a) => a.airport.id) || [],
        },
        mode: 'onTouched',
    });

    useEffect(() => {
        if (open) {
            reset({
                name: airline.name,
                countryId: airline.countryId,
                airportIds: airline.airlinesOnAirports?.map((a) => a.airport.id) || [],
            });
        }
    }, [open, airline, reset]);

    const onAirlineSubmit = (data: AirlineDTO) => {
        startTransition(async () => {
            try {
                await updateAirline(airline.id, data);
                await mutate();

                toaster.create({
                    title: 'Airline updated successfully!',
                    type: 'success',
                });

                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to update airline!',
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
                <IconButton aria-label="Edit airline" size="sm" variant="ghost">
                    <MdEdit />
                </IconButton>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <form onSubmit={handleSubmit(onAirlineSubmit)}>
                            <Dialog.Header>Edit Airline</Dialog.Header>

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
