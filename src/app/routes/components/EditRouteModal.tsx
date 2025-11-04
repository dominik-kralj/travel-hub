'use client';

import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
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

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { updateRoute } from '../actions';
import { useRoutes } from '@/hooks/useRoutes';
import { Route, RouteDTO, RouteSchema } from '@/models/Route';
import { Error } from '@/models/Error';
import { AirlineSelect } from './AirlineSelect';
import { AirportSelect } from './AirportSelect';
import { useAirlines } from '@/hooks/useAirlines';
import { useAirports } from '@/hooks/useAirports';

interface EditRouteModalProps {
    route: Route;
}

export default function EditRouteModal({ route }: EditRouteModalProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useRoutes();
    const { data: airlines } = useAirlines();
    const { data: airports } = useAirports();

    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        control,
        formState: { errors, touchedFields, isValid },
        reset,
    } = useForm<RouteDTO>({
        resolver: zodResolver(RouteSchema),
        defaultValues: {
            airlineId: route.airlineId,
            fromAirportId: route.fromAirportId,
            toAirportId: route.toAirportId,
        },
        mode: 'onTouched',
    });

    useEffect(() => {
        if (open) {
            reset({
                airlineId: route.airlineId,
                fromAirportId: route.fromAirportId,
                toAirportId: route.toAirportId,
            });
        }
    }, [open, route, reset]);

    const onRouteSubmit = (data: RouteDTO) => {
        startTransition(async () => {
            try {
                await updateRoute(route.id, data);
                await mutate();

                toaster.create({
                    title: 'Route updated successfully!',
                    type: 'success',
                });

                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to update route!',
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
                <IconButton aria-label="Edit route" size="sm" variant="ghost">
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

                        <form onSubmit={handleSubmit(onRouteSubmit)}>
                            <Dialog.Header>Edit Route</Dialog.Header>

                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root
                                        invalid={!!errors.airlineId && touchedFields.airlineId}
                                    >
                                        <Controller
                                            control={control}
                                            name="airlineId"
                                            render={({ field }) => (
                                                <AirlineSelect
                                                    data={airlines}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) =>
                                                        field.onChange(val ? Number(val) : 0)
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.airlineId && touchedFields.airlineId && (
                                            <Field.ErrorText>
                                                {errors.airlineId.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        invalid={
                                            !!errors.fromAirportId && touchedFields.fromAirportId
                                        }
                                    >
                                        <Controller
                                            control={control}
                                            name="fromAirportId"
                                            render={({ field }) => (
                                                <AirportSelect
                                                    data={airports}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) =>
                                                        field.onChange(val ? Number(val) : 0)
                                                    }
                                                    label="From Airport"
                                                />
                                            )}
                                        />
                                        {errors.fromAirportId && touchedFields.fromAirportId && (
                                            <Field.ErrorText>
                                                {errors.fromAirportId.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        invalid={!!errors.toAirportId && touchedFields.toAirportId}
                                    >
                                        <Controller
                                            control={control}
                                            name="toAirportId"
                                            render={({ field }) => (
                                                <AirportSelect
                                                    data={airports}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) =>
                                                        field.onChange(val ? Number(val) : 0)
                                                    }
                                                    label="To Airport"
                                                />
                                            )}
                                        />
                                        {errors.toAirportId && touchedFields.toAirportId && (
                                            <Field.ErrorText>
                                                {errors.toAirportId.message}
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
