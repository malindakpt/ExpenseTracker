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

const PAGE_SIZE = 10;

export const ExpenseListPage = () => {
    const [category, setCategory] = useState<ExpenseCategory>();
    const [sortBy, setSortBy] = useState<ExpenseSortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [page, setPage] = useState(1);
    const [loadedExpenses, setLoadedExpenses] = useState<Expense[]>([]);

    const { data, isLoading, isFetching } = useGetExpensesQuery({
        page,
        limit: PAGE_SIZE,
        category,
        sortBy,
        sortOrder,
    });

    const [deleteExpense] = useDeleteExpenseMutation();

    useEffect(() => {
        if (!data) {
            return;
        }

        setLoadedExpenses((current) => {
            if (page === 1) {
                return data.data;
            }

            const existingIds = new Set(current.map((expense) => expense.id));
            const newExpenses = data.data.filter((expense) => !existingIds.has(expense.id));

            return [...current, ...newExpenses];
        });
    }, [data, page]);

    const handleCategoryChange = (
        value?: ExpenseCategory,
    ) => {
        setCategory(value);
        setPage(1);
        setLoadedExpenses([]);
    };

    const handleSortChange = (
        field: ExpenseSortField,
        order: SortOrder,
    ) => {
        setSortBy(field);
        setSortOrder(order);
        setPage(1);
        setLoadedExpenses([]);
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
                expenses={loadedExpenses}
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
