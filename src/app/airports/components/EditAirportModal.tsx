'use client';

import { useTransition } from 'react';

import { Controller, useForm, useWatch } from 'react-hook-form';
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

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { updateAirport } from '../actions';
import { useAirports } from '@/app/hooks/useAirports';
import { AirportDTO, AirportSchema, Airport } from '@/models/Airport';
import { Error } from '@/models/Error';
import { CountrySelect } from './CountrySelect';
import { MapPicker } from './MapPicker';
import { useCountries } from '@/app/hooks/useCountries';
import { MdEdit } from 'react-icons/md';

interface EditAirportModalProps {
    airport: Airport;
}

export default function EditAirportModal({ airport }: EditAirportModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useAirports();
    const { data: countries } = useCountries();

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, touchedFields, isValid },
        reset,
    } = useForm<AirportDTO>({
        resolver: zodResolver(AirportSchema),
        defaultValues: {
            name: airport.name,
            iata: airport.iata,
            icao: airport.icao,
            latitude: airport.latitude,
            longitude: airport.longitude,
            countryId: airport.countryId,
        },
        mode: 'onTouched',
    });

    const latitude = useWatch({ control, name: 'latitude' });
    const longitude = useWatch({ control, name: 'longitude' });

    const onAirportSubmit = (data: AirportDTO) => {
        startTransition(async () => {
            try {
                await updateAirport(airport.id, data);
                await mutate();

                toaster.create({
                    title: 'Airport updated successfully!',
                    type: 'success',
                });

                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to update airport!',
                    type: 'error',
                });
            }
        });
    };

    const handleOpenChange = (details: DialogOpenChangeDetails) => {
        if (details.open) {
            onOpen();
            reset({
                name: airport.name,
                iata: airport.iata,
                icao: airport.icao,
                latitude: airport.latitude,
                longitude: airport.longitude,
                countryId: airport.countryId,
            });
        } else {
            onClose();
            reset();
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
            <Dialog.Trigger asChild>
                <IconButton aria-label="Edit country" size="sm" variant="ghost">
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

                        <form onSubmit={handleSubmit(onAirportSubmit)}>
                            <Dialog.Header>Edit Airport</Dialog.Header>

                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root invalid={!!errors.name && touchedFields.name}>
                                        <Field.Label>Name</Field.Label>

                                        <Input
                                            placeholder="e.g., John F. Kennedy International"
                                            {...register('name')}
                                        />

                                        {errors.name && touchedFields.name && (
                                            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.iata && touchedFields.iata}>
                                        <Field.Label>IATA Code</Field.Label>

                                        <Input
                                            placeholder="e.g., JFK"
                                            {...register('iata')}
                                            textTransform="uppercase"
                                        />

                                        {errors.iata && touchedFields.iata && (
                                            <Field.ErrorText>{errors.iata.message}</Field.ErrorText>
                                        )}
                                        <Field.HelperText>3-letter airport code</Field.HelperText>
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.icao && touchedFields.icao}>
                                        <Field.Label>ICAO Code</Field.Label>

                                        <Input
                                            placeholder="e.g., KJFK"
                                            {...register('icao')}
                                            textTransform="uppercase"
                                        />

                                        {errors.icao && touchedFields.icao && (
                                            <Field.ErrorText>{errors.icao.message}</Field.ErrorText>
                                        )}

                                        <Field.HelperText>
                                            4-letter ICAO airport code
                                        </Field.HelperText>
                                    </Field.Root>

                                    <Field.Root
                                        invalid={!!errors.latitude && touchedFields.latitude}
                                    >
                                        <Field.Label>Latitude</Field.Label>

                                        <Input
                                            type="number"
                                            step="any"
                                            {...register('latitude', { valueAsNumber: true })}
                                        />

                                        {errors.latitude && touchedFields.latitude && (
                                            <Field.ErrorText>
                                                {errors.latitude.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        invalid={!!errors.longitude && touchedFields.longitude}
                                    >
                                        <Field.Label>Longitude</Field.Label>

                                        <Input
                                            type="number"
                                            step="any"
                                            {...register('longitude', { valueAsNumber: true })}
                                        />

                                        {errors.longitude && touchedFields.longitude && (
                                            <Field.ErrorText>
                                                {errors.longitude.message}
                                            </Field.ErrorText>
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
                                        invalid={!!errors.latitude && touchedFields.latitude}
                                    >
                                        <Field.Label>Location (click on map)</Field.Label>

                                        <MapPicker
                                            lat={latitude}
                                            lng={longitude}
                                            setLat={(val) => setValue('latitude', Number(val))}
                                            setLng={(val) => setValue('longitude', Number(val))}
                                        />

                                        {errors.latitude && touchedFields.latitude && (
                                            <Field.ErrorText>
                                                {errors.latitude.message}
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
            <Toaster />
        </Dialog.Root>
    );
}
