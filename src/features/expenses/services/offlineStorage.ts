import type { SyncOperation } from '../types/expense.types';

const SYNC_QUEUE_KEY = 'expense-tracker:sync-queue';

const readStorage = <T>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    const value = window.localStorage.getItem(key);

    if (!value) {
        return fallback;
    }

    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

const writeStorage = <T>(key: string, value: T): void => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

export const offlineStorage = {
    getSyncQueue: (): SyncOperation[] => readStorage(SYNC_QUEUE_KEY, []),
    saveSyncQueue: (queue: SyncOperation[]): void => writeStorage(SYNC_QUEUE_KEY, queue),
};