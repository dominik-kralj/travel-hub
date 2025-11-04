'use client';

import { Airline } from '@/models/Airline';
import { Select, createListCollection } from '@chakra-ui/react';

interface AirlineSelectProps {
    data: Airline[];
    value: string;
    onChange: (value: string) => void;
}

export function AirlineSelect({ data = [], value, onChange }: AirlineSelectProps) {
    const airlines = createListCollection({
        items:
            data?.map((airline) => ({
                label: airline.name,
                value: airline.id.toString(),
            })) ?? [],
    });

    return (
        <Select.Root
            collection={airlines}
            value={[value]}
            onValueChange={(details) => {
                onChange(details.value[0] || '');
            }}
        >
            <Select.HiddenSelect />
            <Select.Label>Airline</Select.Label>

            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select airline" />
                </Select.Trigger>

                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content>
                    {airlines.items.map((airline) => (
                        <Select.Item item={airline} key={airline.value}>
                            {airline.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
}
