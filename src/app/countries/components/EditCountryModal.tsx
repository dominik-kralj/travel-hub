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
	IconButton,
} from '@chakra-ui/react';
import { useTransition } from 'react';
import { MdEdit } from 'react-icons/md';

import { Toaster, toaster } from '@/components/chakra-ui/toaster';
import { Country, CountryDTO, CountrySchema } from '@/models/Country';
import { updateCountry } from '../actions';
import { useCountries } from '@/app/hooks/useCountries';
import { Error } from '@/models/Error';

type EditCountryModalProps = {
	country: Country;
};

export default function EditCountryModal({ country }: EditCountryModalProps) {
	const { open, onClose, onOpen } = useDisclosure();
	const { mutate } = useCountries();

	const [isPending, startTransition] = useTransition();

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

	const onCountrySubmit = (data: CountryDTO) => {
		startTransition(async () => {
			try {
				await updateCountry(country.id, data);
				await mutate();
				toaster.create({
					title: 'Country updated successfully!',
					type: 'success',
				});
				onClose();
			} catch (error: unknown) {
				toaster.create({
					title: (error as Error) || 'Failed to update country!',
					type: 'error',
				});
			}
		});
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
									loading={isPending}
									disabled={!isValid || isPending}
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
