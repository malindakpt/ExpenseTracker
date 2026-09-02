import { useCallback, useState } from 'react';
import type { SortOrder } from '../types/paginatedApi.types';


interface UseListControlsOptions<TSortField> {
    initialSortBy: TSortField;
    initialSortOrder?: SortOrder;
}

export const useListControls = <TSortField,>({
    initialSortBy,
    initialSortOrder,
}: UseListControlsOptions<TSortField>) => {

    const [sortBy, setSortBy] = useState<TSortField>(initialSortBy);
    const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder ?? 'asc');
    const [page, setPage] = useState(1);

    const handleSortChange = useCallback((field: TSortField, order: SortOrder) => {
        setSortBy(field);
        setSortOrder(order);
        setPage(1);
    }, []);

    const nextPage = useCallback(() => {
        setPage((current) => current + 1);
    }, []);

    const resetPage = useCallback(() => {
        setPage(1);
    }, []);

    return {
        sortBy,
        sortOrder,
        page,
        handleSortChange,
        nextPage,
        resetPage,
    };
};