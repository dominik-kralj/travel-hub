'use client';

import {
	Button,
	Dialog,
	Portal,
	CloseButton,
	Text,
	useDisclosure,
	IconButton,
} from '@chakra-ui/react';

import { MdDelete } from 'react-icons/md';

import { Toaster } from '@/components/chakra-ui/toaster';

import { useCountries } from '@/app/hooks/useCountries';
import { Country } from '@/models/Country';

type DeleteCountryModalProps = {
	country: Country;
};

export default function DeleteCountryModal({
	country,
}: DeleteCountryModalProps) {
	const { open, onOpen, onClose } = useDisclosure();
	const { deleteCountry, isCountryDeleting } = useCountries();

	const handleDelete = async () => {
		try {
			await deleteCountry(country.id);
			onClose();
		} catch (error) {
			console.error('Failed to delete country:', error);
		}
	};

	const handleOpenChange = (details: { open: boolean }) => {
		if (details.open) {
			onOpen();
		} else {
			onClose();
		}
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={handleOpenChange}
			placement="center"
		>
			<Dialog.Trigger asChild>
				<IconButton
					aria-label="Delete country"
					size="sm"
					variant="ghost"
					color="red.500"
				>
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
								Are you sure you want to delete{' '}
								<strong>{country.name}</strong>? This action
								cannot be undone.
							</Text>
						</Dialog.Body>

						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>

							<Button
								colorPalette="red"
								onClick={handleDelete}
								loading={isCountryDeleting}
								disabled={isCountryDeleting}
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
