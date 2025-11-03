import { z } from 'zod';

export const CountrySchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .regex(/^[A-Za-z\s\-]+$/, 'Name can only contain letters, spaces, and hyphens'),
    code: z
        .string()
        .min(1, 'Code is required')
        .min(2, 'Code must be at least 2 characters')
        .max(3, 'Code must be at most 3 characters')
        .regex(/^[A-Za-z]+$/, 'Code can only contain letters')
        .toUpperCase(),
});

export type CountryDTO = z.infer<typeof CountrySchema>;

export type Country = {
    id: number;
    name: string;
    code: string;
};
