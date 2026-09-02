import type { AppDispatch } from '../../../app/store';
import { enqueue } from '../store/offlineSlice';
import { CreateExpenseRequest } from '../types/expense.types';
import { generateId } from '../utils/generateId';

export const queueCreateExpense = (
    dispatch: AppDispatch,
    payload: CreateExpenseRequest,
): string => {
    const expenseId = generateId();

    dispatch(
        enqueue({
            id: generateId(),
            type: 'create',
            payload,
            createdAt: new Date().toISOString(),
        }),
    );

    return expenseId;
};