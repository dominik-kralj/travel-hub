import { z } from 'zod';

export const CountrySchema = z.object({
    name: z.string().trim().min(1, 'Country name is required'),
    code: z
        .string()
        .trim()
        .min(2, 'Code must be at least 2 characters')
        .max(3, 'Code must be at most 3 characters')
        .toUpperCase(),
});

export type CountryDTO = z.infer<typeof CountrySchema>;

export type Country = CountryDTO & {
    id: number;
};
