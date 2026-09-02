import { useCallback, useState } from 'react';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../api/expensesApi'
import { Expense, ExpenseCategory } from '../types/expense.types';
import { ExpenseFilters } from '../components/ExpenseFilters/ExpenseFilters';
import { ExpenseList } from '../components/ExpenseList/ExpenseList';
import { usePagination } from '../../../hooks/usePagination';
import { SortField } from '../../../types/paginatedApi.types';
import { useListControls } from '../../../hooks/useListControls';
import styles from './ExpenseListPage.module.scss';

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
    

    const handleCategoryChange = useCallback((
        value?: ExpenseCategory,
    ) => {
        setCategory(value);
        resetPage();
        resetPagination();
    }, [resetPage, resetPagination]);

    const handleDelete = useCallback(async (id: string) => {
        await deleteExpense(id);
        resetPage();
        resetPagination();
    }, [deleteExpense, resetPage, resetPagination]);

    if (isLoading) {
        return <p className={styles.loading}>Loading expenses...</p>;
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Expense ledger</p>
                    <h1 className={styles.title}>Expenses</h1>
                </div>
            </header>

            <section className={styles.filterArea}>
                <ExpenseFilters
                    category={category}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                />
            </section>

            <ExpenseList
                expenses={items}
                onDelete={handleDelete}
            />

            {hasMore && (
                <button
                    className={styles.loadMore}
                    disabled={isFetching}
                    onClick={ nextPage }
                    type="button"
                >
                    {isFetching ? 'Loading...' : 'Load More'}
                </button>
            )}
        </main>
    );
}
