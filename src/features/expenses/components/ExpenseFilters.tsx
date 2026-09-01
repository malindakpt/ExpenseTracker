import {
    EXPENSE_CATEGORIES,
    type ExpenseCategory,
} from '../types/expense.types';
import type {
    ExpenseSortField,
    SortOrder,
} from '../types/expense-api.types';

interface ExpenseFiltersProps {
    category?: ExpenseCategory;
    sortBy: ExpenseSortField;
    sortOrder: SortOrder;
    onCategoryChange: (
        category?: ExpenseCategory,
    ) => void;
    onSortChange: (
        sortBy: ExpenseSortField,
        sortOrder: SortOrder,
    ) => void;
}

export const ExpenseFilters = ({
    category,
    sortBy,
    sortOrder,
    onCategoryChange,
    onSortChange,
}: ExpenseFiltersProps) => {
    return (
        <div>
            <label>
                Category

                <select
                    value={category ?? ''}
                    onChange={(event) => {
                        const value = event.target.value;

                        onCategoryChange(
                            value
                                ? (value as ExpenseCategory)
                                : undefined,
                        );
                    }}
                >
                    <option value="">All</option>

                    {EXPENSE_CATEGORIES.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Sort by

                <select
                    value={sortBy}
                    onChange={(event) => {
                        onSortChange(
                            event.target.value as ExpenseSortField,
                            sortOrder,
                        );
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
            </label>

            <label>
                Order

                <select
                    value={sortOrder}
                    onChange={(event) => {
                        onSortChange(
                            sortBy,
                            event.target.value as SortOrder,
                        );
                    }}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </label>
        </div>
    );
}
