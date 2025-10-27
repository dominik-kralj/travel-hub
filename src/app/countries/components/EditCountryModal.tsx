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
} from '@chakra-ui/react';

import { Toaster } from '@/components/ui/toaster';

import { Country, CountryDTO, CountrySchema } from '@/models/Country';
import { useCountries } from '@/app/hooks/useCountries';

type EditCountryModalProps = {
	country: Country;
};

export default function EditCountryModal({ country }: EditCountryModalProps) {
	const { open, onClose, onOpen } = useDisclosure();
	const { updateCountry, isCountryUpdating } = useCountries();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isValid },
		reset,
	} = useForm<CountryDTO>({
		resolver: zodResolver(CountrySchema),
		defaultValues: {
			name: country.name,
			code: country.code,
		},
		mode: 'onTouched',
	});

	const onCountrySubmit = async (data: CountryDTO) => {
		try {
			await updateCountry({ id: country.id, data });
			onClose();
		} catch (error) {
			console.error('Failed to update country:', error);
		}
	};

	const handleOpenChange = (details: { open: boolean }) => {
		if (details.open) {
			onOpen();
		} else {
			onClose();
			reset({ name: country.name, code: country.code });
		}
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={handleOpenChange}
			placement="center"
		>
			<Dialog.Trigger asChild>
				<Button size="sm" variant="outline">
					Edit
				</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>

						<form onSubmit={handleSubmit(onCountrySubmit)}>
							<Dialog.Header>Edit Country</Dialog.Header>

							<Dialog.Body>
								<Stack gap={4}>
									<Field.Root
										invalid={
											!!errors.name && touchedFields.name
										}
									>
										<Field.Label>Country Name</Field.Label>
										<Input {...register('name')} />
										<Field.ErrorText minH="20px">
											{errors.name && touchedFields.name
												? errors.name.message
												: ' '}
										</Field.ErrorText>
									</Field.Root>

									<Field.Root
										invalid={
											!!errors.code && touchedFields.code
										}
									>
										<Field.Label>Country Code</Field.Label>
										<Input
											{...register('code')}
											textTransform="uppercase"
										/>
										<Field.ErrorText minH="20px">
											{errors.code && touchedFields.code
												? errors.code.message
												: ' '}
										</Field.ErrorText>
										<Field.HelperText>
											2-3 character country code (ISO
											format)
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
									loading={isCountryUpdating}
									disabled={!isValid || isCountryUpdating}
								>
									Update
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
