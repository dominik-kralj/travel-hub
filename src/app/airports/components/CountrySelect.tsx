'use client';

import { Combobox, useFilter, useListCollection } from '@chakra-ui/react';
import { Country } from '@/models/Country';

type Props = {
  data: Country[];
  value?: string;
  onChange?: (value: string) => void;
};

export const CountrySelect = ({ data, value, onChange }: Props) => {
	const { contains } = useFilter({ sensitivity: 'base' });

	const countries =
		data?.map((country) => ({
			label: country.name,
			value: country.id.toString(),
	})) ?? [];

	const { collection, filter } = useListCollection({
		initialItems: countries,
		filter: contains,
	});

	return (
		<Combobox.Root
			collection={collection}
			multiple={false}
			value={value ? [value] : []}
			onValueChange={details => {
				onChange?.(details.value[0] ?? '');
			}}
			onInputValueChange={(e) => filter(e.inputValue)}
		>
			<Combobox.Label>Country</Combobox.Label>

			<Combobox.Control>
				<Combobox.Input placeholder="Type to search" />

				<Combobox.IndicatorGroup>
				<Combobox.ClearTrigger />
				<Combobox.Trigger />
				</Combobox.IndicatorGroup>
			</Combobox.Control>

			<Combobox.Positioner>
				<Combobox.Content>
				<Combobox.Empty>No items found</Combobox.Empty>

				{collection.items.map((item) => (
					<Combobox.Item item={item} key={item.value}>
						{item.label}
						<Combobox.ItemIndicator />
					</Combobox.Item>
				))}
				</Combobox.Content>
			</Combobox.Positioner>
		</Combobox.Root>
	);
};