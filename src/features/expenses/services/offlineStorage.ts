import type { Expense } from '../types/expense.types';
import type { SyncOperation } from '../types/sync.types';

const EXPENSES_KEY = 'expense-tracker:expenses';
const SYNC_QUEUE_KEY = 'expense-tracker:sync-queue';

const readStorage = <T>(
    key: string,
    fallback: T,
): T => {
    const value = localStorage.getItem(key);

    if (!value) {
        return fallback;
    }

    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

const writeStorage = <T>(
    key: string,
    value: T,
): void => {
    localStorage.setItem(
        key,
        JSON.stringify(value),
    );
};

export const offlineStorage = {
    getExpenses(): Expense[] {
        return readStorage<Expense[]>(
            EXPENSES_KEY,
            [],
        );
    },

    saveExpenses(expenses: Expense[]): void {
        writeStorage(
            EXPENSES_KEY,
            expenses,
        );
    },

    getSyncQueue(): SyncOperation[] {
        return readStorage<SyncOperation[]>(
            SYNC_QUEUE_KEY,
            [],
        );
    },

    saveSyncQueue(
        queue: SyncOperation[],
    ): void {
        writeStorage(
            SYNC_QUEUE_KEY,
            queue,
        );
    },

    clear(): void {
        localStorage.removeItem(EXPENSES_KEY);
        localStorage.removeItem(SYNC_QUEUE_KEY);
    },
};