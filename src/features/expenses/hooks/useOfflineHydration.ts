import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { hydrateQueue } from '../store/offlineSlice';
import { offlineStorage } from '../services/offlineStorage';

export const useOfflineHydration = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const queue =
            offlineStorage.getSyncQueue();

        if (queue.length > 0) {
            dispatch(
                hydrateQueue(queue),
            );
        }
    }, [dispatch]);
};