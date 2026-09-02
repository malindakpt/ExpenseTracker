import { useCallback, useEffect, useState } from "react";
import type { PaginatedResponse } from "../types/paginatedResponse";

interface UsePaginationOptions<T> {
    page: number;
    data?: PaginatedResponse<T>;
    isFetching: boolean;
}

interface HasId {
    id: string;
}

export const usePagination = <T extends HasId>({
    data,
    page,
    isFetching
}: UsePaginationOptions<T>) => {
    const [loadedItems, setLoadedItems] = useState<T[]>([]);

    const resetPagination = useCallback(() => {
        setLoadedItems([])
    }, [setLoadedItems]);

    useEffect(() => {
        if (!data) return;

        setLoadedItems((current) => {
              if (page === 1) {
                return data.data;
            }

            const existingIds = new Set(current.map((item) => item.id));
            const newExpenses = data.data.filter((item) => !existingIds.has(item.id));

            return [...current, ...newExpenses];
        });
    }, [data, page]);

    const hasMore = Boolean(data && loadedItems.length < data.total);

    return {
        items: loadedItems,
        page,
        hasMore,
        isFetching,
        resetPagination
    };
}