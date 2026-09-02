import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import { offlineStorage } from '../services/offlineStorage';
import { enqueue, removeOperation } from './offlineSlice';

const PERSISTED_ACTIONS = new Set<string>([
    enqueue.type,
    removeOperation.type,
]);

export const offlinePersistenceMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action);

        if (
            typeof action === 'object' &&
            action !== null &&
            'type' in action &&
            PERSISTED_ACTIONS.has(
                action.type as string,
            )
        ) {
            const state =
                store.getState() as RootState;

            offlineStorage.saveSyncQueue(
                state.offline.queue,
            );
        }

        return result;
    };