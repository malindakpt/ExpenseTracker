import { store } from '../../../app/store';
import { expensesApi } from '../api/expensesApi';
import {
    enqueue,
    removeOperation,
    setLastSyncedAt,
    setSyncError,
    setSyncStatus,
} from '../store/offlineSlice';
import { offlineStorage } from './offlineStorage';
import type { SyncOperation } from '../types/expense.types';
import type { GetExpensesParams } from '../types/expense-api.types';

const MAX_ATTEMPTS = 3;
let isSyncing = false;

const errorMessage = (error: unknown): string =>
    error instanceof Error ? error.message : 'Unable to synchronize pending expenses.';

const deleteWithRetry = async (expenseId: string): Promise<void> => {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
        try {
            await store.dispatch(
                expensesApi.endpoints.deleteExpense.initiate(expenseId),
            ).unwrap();
            return;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
};

export const queueDelete = (
    expenseId: string,
    queryArgs: GetExpensesParams,
): void => {
    const operation: SyncOperation = {
        id: crypto.randomUUID(),
        type: 'delete',
        expenseId,
        createdAt: new Date().toISOString(),
    };
    store.dispatch(enqueue(operation));
    offlineStorage.saveSyncQueue(store.getState().offline.queue);
    store.dispatch(expensesApi.util.updateQueryData(
        'getExpenses',
        queryArgs,
        (draft) => {
            draft.data = draft.data.filter((expense) => expense.id !== expenseId);
            draft.total = Math.max(0, draft.total - 1);
            draft.hasMore = draft.data.length < draft.total;
        },
    ));
};

export const syncPendingOperations = async (): Promise<void> => {
    if (isSyncing || !store.getState().offline.isOnline) {
        return;
    }

    isSyncing = true;
    store.dispatch(setSyncStatus('syncing'));

    try {
        while (store.getState().offline.queue.length > 0) {
            const operation = store.getState().offline.queue[0];
            await deleteWithRetry(operation.expenseId);
            store.dispatch(removeOperation(operation.id));
            offlineStorage.saveSyncQueue(store.getState().offline.queue);
        }

        store.dispatch(expensesApi.util.invalidateTags([{ type: 'Expense', id: 'LIST' }]));
        store.dispatch(setLastSyncedAt(new Date().toISOString()));
    } catch (error) {
        store.dispatch(setSyncError(errorMessage(error)));
    } finally {
        isSyncing = false;
    }
};