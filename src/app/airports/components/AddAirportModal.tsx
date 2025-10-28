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
import { useEffect, useTransition } from 'react';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { createAirport } from '../actions';
import { useAirports } from '@/app/hooks/useAirports';
import { AirportDTO, AirportSchema } from '@/models/Airport';
import { Error } from '@/models/Error';
import { CountrySelect } from './CountrySelect';
import { MapPicker } from './MapPicker';
import { useCountries } from '@/app/hooks/useCountries';

export default function AddAirportModal() {
	const { open, onOpen, onClose } = useDisclosure();
	const { mutate } = useAirports();
	const { data } = useCountries();

	const [isPending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors, touchedFields, isValid },
		reset,
	} = useForm<AirportDTO>({
		resolver: zodResolver(AirportSchema),
		defaultValues: {
			name: '',
			iata: '',
			latitude: 0,
			longitude: 0,
			countryId: 0,
		},
		mode: 'onTouched',
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setValue('latitude', position.coords.latitude);
			setValue('longitude', position.coords.longitude);
		});
	}, [setValue]);

	const latitude = watch('latitude');
	const longitude = watch('longitude');

	const onAirportSubmit = (data: AirportDTO) => {
		startTransition(async () => {
			try {
				await createAirport(data);
				toaster.create({
					title: 'Airport created successfully!',
					type: 'success',
				});
				await mutate();
				reset();
				onClose();
			} catch (error: unknown) {
				toaster.create({
					title:
						(error as Error)?.message ||
						'Failed to create airport!',
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
		<Dialog.Root
			open={open}
			onOpenChange={handleOpenChange}
			placement="center"
		>
			<Dialog.Trigger asChild>
				<Button colorPalette="blue">Add Airport</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>

						<form onSubmit={handleSubmit(onAirportSubmit)}>
							<Dialog.Header>Add Airport</Dialog.Header>

							<Dialog.Body>
								<Stack gap={4}>
									<Field.Root
										invalid={
											!!errors.name && touchedFields.name
										}
									>
										<Field.Label>Name</Field.Label>

										<Input
											placeholder="e.g., John F. Kennedy International"
											{...register('name')}
										/>

										{errors.name && touchedFields.name && (
											<Field.ErrorText>
												{errors.name.message}
											</Field.ErrorText>
										)}
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.iata && touchedFields.iata
										}
									>
										<Field.Label>IATA Code</Field.Label>

										<Input
											placeholder="e.g., JFK"
											{...register('iata')}
											textTransform="uppercase"
										/>

										{errors.iata && touchedFields.iata && (
											<Field.ErrorText>
												{errors.iata.message}
											</Field.ErrorText>
										)}

										<Field.HelperText>
											3-letter airport code
										</Field.HelperText>
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.icao && touchedFields.icao
										}
									>
										<Field.Label>ICAO Code</Field.Label>

										<Input
											placeholder="e.g., KJFK"
											{...register('icao')}
											textTransform="uppercase"
										/>

										{errors.icao && touchedFields.icao && (
											<Field.ErrorText>
												{errors.icao.message}
											</Field.ErrorText>
										)}

										<Field.HelperText>
											4-letter ICAO airport code
										</Field.HelperText>
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.latitude &&
											touchedFields.latitude
										}
									>
										<Field.Label>Latitude</Field.Label>

										<Input
											type="number"
											step="any"
											{...register('latitude', { valueAsNumber: true })}
											
										/>

										{errors.latitude &&
											touchedFields.latitude && (
												<Field.ErrorText>
													{errors.latitude.message}
												</Field.ErrorText>
											)}
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.longitude &&
											touchedFields.longitude
										}
									>
										<Field.Label>Longitude</Field.Label>

										<Input
											type="number"
											step="any"
											{...register('longitude', { valueAsNumber: true })}
										/>

										{errors.longitude &&
											touchedFields.longitude && (
												<Field.ErrorText>
													{errors.longitude.message}
												</Field.ErrorText>
											)}
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.countryId &&
											touchedFields.countryId
										}
									>
										<Controller
											control={control}
											name="countryId"
											render={({ field }) => (
											<CountrySelect
												data={data}
												value={field.value ? field.value.toString() : ''}
												onChange={val => field.onChange(val ? Number(val) : 0)}
											/>
											)}
										/>

										{errors.countryId &&
											touchedFields.countryId && (
												<Field.ErrorText>
													{errors.countryId.message}
												</Field.ErrorText>
											)}
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.latitude &&
											touchedFields.latitude
										}
									>
										<Field.Label>
											Location (click on map)
										</Field.Label>

										<MapPicker
											lat={latitude}
											lng={longitude}
											setLat={(val) =>
												setValue(
													'latitude',
													Number(val),
												)
											}
											setLng={(val) =>
												setValue(
													'longitude',
													Number(val),
												)
											}
										/>

										{errors.latitude &&
											touchedFields.latitude && (
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
