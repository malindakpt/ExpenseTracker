import { useAppSelector } from '../../../app/hooks';

export const OfflineStatus = () => {
    const { isOnline, status } = useAppSelector((state) => state.offline);

    if (!isOnline) {
        return <p role="status">Offline</p>;
    }

    if (status === 'syncing') {
        return <p role="status">Syncing...</p>;
    }

    if (status === 'failed') {
        return <p role="status">Sync failed</p>;
    }

    return <p role="status">Online</p>;
};