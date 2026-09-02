import { useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';

import {
    setSyncStatus,
} from '../store/offlineSlice';

export const useNetworkStatus = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleOnline = () => {
            dispatch(
                setSyncStatus('idle'),
            );
        };

        const handleOffline = () => {
            dispatch(
                setSyncStatus('offline'),
            );
        };


        // TODO: Move this to sepearate useEffect

        window.addEventListener(
            'online',
            handleOnline,
        );

        window.addEventListener(
            'offline',
            handleOffline,
        );

        return () => {
            window.removeEventListener(
                'online',
                handleOnline,
            );

            window.removeEventListener(
                'offline',
                handleOffline,
            );
        };
    }, [dispatch]);
};