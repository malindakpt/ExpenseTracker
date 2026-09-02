import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SyncOperation, SyncStatus } from '../types/expense.types';

interface OfflineState {
    isOnline: boolean;
    queue: SyncOperation[];
    status: SyncStatus;
    lastSyncedAt?: string;
    error?: string;
}

const initialState: OfflineState = {
    isOnline: typeof navigator === 'undefined' || navigator.onLine,
    queue: [],
    status: 'idle',
};

export const offlineSlice = createSlice({
    name: 'offline',
    initialState,
    reducers: {
        hydrateOfflineState(state, action: PayloadAction<SyncOperation[]>) {
            state.queue = action.payload;
        },
        setOnlineStatus(state, action: PayloadAction<boolean>) {
            state.isOnline = action.payload;
            if (!action.payload) {
                state.status = 'idle';
            }
        },
        enqueue(state, action: PayloadAction<SyncOperation>) {
            state.queue.push(action.payload);
        },
        removeOperation(state, action: PayloadAction<string>) {
            state.queue = state.queue.filter((operation) => operation.id !== action.payload);
        },
        setSyncStatus(state, action: PayloadAction<SyncStatus>) {
            state.status = action.payload;
        },
        setSyncError(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        },
        setLastSyncedAt(state, action: PayloadAction<string>) {
            state.lastSyncedAt = action.payload;
            state.status = 'idle';
            state.error = undefined;
        },
    },
});

export const {
    enqueue,
    hydrateOfflineState,
    removeOperation,
    setLastSyncedAt,
    setOnlineStatus,
    setSyncError,
    setSyncStatus,
} = offlineSlice.actions;