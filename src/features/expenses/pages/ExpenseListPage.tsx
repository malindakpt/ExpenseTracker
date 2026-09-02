import { useEffect, useState } from 'react';

import {
    useDeleteExpenseMutation,
    useGetExpensesQuery,
} from '../api/expensesApi';

import type {
    Expense,
    ExpenseCategory,
} from '../types/expense.types';

import type {
    ExpenseSortField,
    SortOrder,
} from '../types/expense-api.types';

import { ExpenseFilters } from '../components/ExpenseFilters';
import { ExpenseList } from '../components/ExpenseList';
import { usePagination } from '../../../hooks/usePagination';

const PAGE_SIZE = 4;

export const ExpenseListPage = () => {
    const [category, setCategory] = useState<ExpenseCategory>();
    const [sortBy, setSortBy] = useState<ExpenseSortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [page, setPage] = useState(1); 

    const { data, isLoading, isFetching } = useGetExpensesQuery({
        page,
        limit: PAGE_SIZE,
        category,
        sortBy,
        sortOrder,
    });

    const { items,resetData } = usePagination<Expense>({data, isFetching, page})

    const [deleteExpense] = useDeleteExpenseMutation();


    const handleCategoryChange = (
        value?: ExpenseCategory,
    ) => {
        setCategory(value);
        setPage(1);
        resetData();
    };

    const handleSortChange = (
        field: ExpenseSortField,
        order: SortOrder,
    ) => {
        setSortBy(field);
        setSortOrder(order);
        setPage(1);
        resetData();
    };

    const handleEdit = (expense: Expense) => {
        console.log('Edit:', expense);
    };

    const handleDelete = async (id: string) => {
        await deleteExpense(id).unwrap();
    };

    if (isLoading) {
        return <p>Loading expenses...</p>;
    }

    return (
        <main>
            <h1>Expense Tracker</h1>

            <ExpenseFilters
                category={category}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
            />

            <ExpenseList
                expenses={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {data?.hasMore && (
                <button
                    disabled={isFetching}
                    onClick={() =>
                        setPage((current) => current + 1)
                    }
                >
                    {isFetching ? 'Loading...' : 'Load More'}
                </button>
            )}
        </main>
    );
}
