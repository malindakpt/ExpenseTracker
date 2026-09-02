import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { offlineStorage } from '../services/offlineStorage';
import { syncPendingOperations } from '../services/syncManager';
import { hydrateOfflineState, setOnlineStatus } from '../store/offlineSlice';

export const OfflineSyncController = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hydrateOfflineState(offlineStorage.getSyncQueue()));

        const handleOnline = () => {
            dispatch(setOnlineStatus(true));
            void syncPendingOperations();
        };
        
        const handleOffline = () => dispatch(setOnlineStatus(false));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        if (navigator.onLine) {
            void syncPendingOperations();
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

    return null;
};