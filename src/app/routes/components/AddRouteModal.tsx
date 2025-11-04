'use client';

import { useTransition } from 'react';
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
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { createRoute } from '../actions';
import { useRoutes } from '@/hooks/useRoutes';
import { RouteDTO, RouteSchema } from '@/models/Route';
import { Error } from '@/models/Error';
import { AirlineSelect } from './AirlineSelect';
import { AirportSelect } from './AirportSelect';
import { useAirlines } from '@/hooks/useAirlines';
import { useAirports } from '@/hooks/useAirports';

export default function AddRouteModal() {
    const { open, onOpen, onClose } = useDisclosure();
    const { mutate } = useRoutes();
    const { data: airlines } = useAirlines();
    const { data: airports } = useAirports();

    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        reset,
        trigger,
    } = useForm<RouteDTO>({
        resolver: zodResolver(RouteSchema),
        defaultValues: {
            airlineId: 0,
            fromAirportId: 0,
            toAirportId: 0,
        },
        mode: 'onChange',
    });

    const onRouteSubmit = (data: RouteDTO) => {
        startTransition(async () => {
            try {
                await createRoute(data);
                await mutate();

                toaster.create({
                    title: 'Route created successfully!',
                    type: 'success',
                });

                reset();
                onClose();
            } catch (error: unknown) {
                toaster.create({
                    title: (error as Error)?.message || 'Failed to create route!',
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
                <Button colorPalette="blue">
                    <MdAdd />
                    Add Route
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <form onSubmit={handleSubmit(onRouteSubmit)}>
                            <Dialog.Header>Add Route</Dialog.Header>

                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root invalid={!!errors.airlineId}>
                                        <Controller
                                            control={control}
                                            name="airlineId"
                                            render={({ field }) => (
                                                <AirlineSelect
                                                    data={airlines}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) => {
                                                        field.onChange(val ? Number(val) : 0);
                                                        trigger('airlineId');
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.airlineId && (
                                            <Field.ErrorText>
                                                {errors.airlineId.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.fromAirportId}>
                                        <Controller
                                            control={control}
                                            name="fromAirportId"
                                            render={({ field }) => (
                                                <AirportSelect
                                                    data={airports}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) => {
                                                        field.onChange(val ? Number(val) : 0);
                                                        trigger(['fromAirportId', 'toAirportId']);
                                                    }}
                                                    label="From Airport"
                                                />
                                            )}
                                        />
                                        {errors.fromAirportId && (
                                            <Field.ErrorText>
                                                {errors.fromAirportId.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.toAirportId}>
                                        <Controller
                                            control={control}
                                            name="toAirportId"
                                            render={({ field }) => (
                                                <AirportSelect
                                                    data={airports}
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={(val) => {
                                                        field.onChange(val ? Number(val) : 0);
                                                        trigger(['fromAirportId', 'toAirportId']);
                                                    }}
                                                    label="To Airport"
                                                />
                                            )}
                                        />
                                        {errors.toAirportId && (
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
                                    Create
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
