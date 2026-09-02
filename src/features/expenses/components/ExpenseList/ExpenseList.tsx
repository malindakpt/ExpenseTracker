import { memo } from 'react';
import type { Expense } from '../../types/expense.types';
import { ExpenseItem } from '../ExpenseItem/ExpenseItem';
import styles from './ExpenseList.module.scss';

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: string) => void;
}

export const ExpenseList = memo(({
    expenses,
    onDelete,
}: ExpenseListProps) => {
    if (expenses.length === 0) {
        return <p className={styles.empty} role="status">No expenses found.</p>;
    }

    return (
        <ul aria-label="Expenses" className={styles.list}>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
});