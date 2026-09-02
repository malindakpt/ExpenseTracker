import type { SortField, SortOrder } from '../../../types/paginatedApi.types';
import {
    EXPENSE_CATEGORIES,
    type ExpenseCategory,
} from '../types/expense.types';

interface ExpenseFiltersProps {
    category?: ExpenseCategory;
    sortBy: SortField;
    sortOrder: SortOrder;
    onCategoryChange: (
        category?: ExpenseCategory,
    ) => void;
    onSortChange: (
        sortBy: SortField,
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
                            event.target.value as SortField,
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
