import {z} from 'zod';

export const createIssueSchema = z.object({
    title: z
        .string()
        .min(3, 'Title is required and must be 3 characters long')
        .max(255),
    description: z
        .string()
        .min(3, 'Description is required and must be 3 characters long'),
});
