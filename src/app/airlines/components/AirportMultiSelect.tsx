'use client';

import { Airport } from '@/models/Airport';
import { Select, createListCollection } from '@chakra-ui/react';

interface AirportMultiSelectProps {
    data?: Airport[];
    value: number[];
    onChange: (value: number[]) => void;
}

export default function AirportMultiSelect({
    data = [],
    value,
    onChange,
}: AirportMultiSelectProps) {
    const airports = createListCollection({
        items:
            data?.map((airport) => ({
                label: `${airport.name} (${airport.icao})`,
                value: airport.id.toString(),
            })) ?? [],
    });

    return (
        <Select.Root
            collection={airports}
            multiple
            value={value.map(String)}
            onValueChange={(details) => {
                onChange(details.value.map(Number));
            }}
        >
            <Select.HiddenSelect />
            <Select.Label>Serviced Airports</Select.Label>

            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select airports" />
                </Select.Trigger>

                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content>
                    {airports.items.map((airport) => (
                        <Select.Item item={airport} key={airport.value}>
                            {airport.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
}
