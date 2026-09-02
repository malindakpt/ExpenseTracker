import type { IStorageManager } from './IStorageManager';

export class StorageManager implements IStorageManager {
    constructor(private readonly storage: Storage = localStorage) {}

    getItem<T>(key: string): T | null {
        const value = this.storage.getItem(key);

        if (value === null) {
            return null;
        }

        try {
            return JSON.parse(value) as T;
        } catch {
            return null;
        }
    }

    setItem<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }
}