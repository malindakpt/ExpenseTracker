import {
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import type { SyncOperation, SyncStatus } from '../types/sync.types';

interface OfflineState {
    queue: SyncOperation[];
    status: SyncStatus;
    lastSyncedAt?: string;
    error?: string;
}

const initialState: OfflineState = {
    queue: [],
    status: navigator.onLine ? 'idle' : 'offline',
};

export const offlineSlice = createSlice({
    name: 'offline',

    initialState,

    reducers: {
        hydrateQueue(
            state,
            action: PayloadAction<SyncOperation[]>,
        ) {
            state.queue = action.payload;
        },

        enqueue(
            state,
            action: PayloadAction<SyncOperation>,
        ) {
            state.queue.push(action.payload);
            state.error = undefined;
        },

        removeOperation(
            state,
            action: PayloadAction<string>,
        ) {
            state.queue = state.queue.filter(
                (operation) =>
                    operation.id !== action.payload,
            );
        },

        setSyncStatus(
            state,
            action: PayloadAction<SyncStatus>,
        ) {
            state.status = action.payload;
        },

        setSyncError(
            state,
            action: PayloadAction<string>,
        ) {
            state.status = 'error';
            state.error = action.payload;
        },

        setLastSyncedAt(
            state,
            action: PayloadAction<string>,
        ) {
            state.lastSyncedAt = action.payload;
            state.error = undefined;
        },
    },
});

export const {
    hydrateQueue,
    enqueue,
    removeOperation,
    setSyncStatus,
    setSyncError,
    setLastSyncedAt,
} = offlineSlice.actions;
