'use client';

import { Airport } from '@/models/Airport';
import { Select, createListCollection } from '@chakra-ui/react';

interface AirportSelectProps {
    data?: Airport[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export function AirportSelect({
    data = [],
    value,
    onChange,
    label = 'Airport',
}: AirportSelectProps) {
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
            value={[value]}
            onValueChange={(details) => {
                onChange(details.value[0] || '');
            }}
        >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>

            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select airport" />
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
