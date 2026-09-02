import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '../types/expense.types';

export const createExpenseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required.'),

    amount: z
        .number()
        .positive('Amount must be greater than zero.'),

    date: z
        .iso
        .date('Enter a valid date.'),

    category: z.enum(EXPENSE_CATEGORIES, {
        error: 'Select a category.',
    }),

    notes: z
        .string()
        .trim()
        .optional(),
});