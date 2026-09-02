import { useState } from 'react';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../api/expensesApi'
import { Expense, ExpenseCategory } from '../types/expense.types';
import { ExpenseFilters } from '../components/ExpenseFilters';
import { ExpenseList } from '../components/ExpenseList';
import { usePagination } from '../../../hooks/usePagination';
import { SortField } from '../../../types/paginatedApi.types';
import { useListControls } from '../../../hooks/useListControls';

const PAGE_SIZE = 4;

export const ExpenseListPage = () => {
    const [deleteExpense] = useDeleteExpenseMutation();
    const [category, setCategory] = useState<ExpenseCategory>();
    const { sortBy, sortOrder, page, nextPage, handleSortChange , resetPage} = useListControls<SortField>({initialSortBy: 'date'});
    const { currentData, isLoading, isFetching } = useGetExpensesQuery(
        {
            page,
            limit: PAGE_SIZE,
            category,
            sortBy,
            sortOrder,
        }
    );
    const { hasMore, items, resetPagination } = usePagination<Expense>({
        data: currentData,
        isFetching,
        page,
    });
    

    const handleCategoryChange = (
        value?: ExpenseCategory,
    ) => {
        setCategory(value);
        resetPage();
        resetPagination();
    };

    const handleDelete = async (id: string) => {
        await deleteExpense(id);
        resetPage();
        resetPagination();
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
                onDelete={handleDelete}
            />

            {hasMore && (
                <button
                    disabled={isFetching}
                    onClick={ nextPage }
                >
                    {isFetching ? 'Loading...' : 'Load More'}
                </button>
            )}
        </main>
    );
}
