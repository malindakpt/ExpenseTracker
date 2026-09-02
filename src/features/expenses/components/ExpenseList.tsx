import type { Expense } from '../types/expense.types';
import { memo } from 'react';
import { ExpenseItem } from './ExpenseItem';
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
        return <p className={styles.empty}>No expenses found.</p>;
    }

    return (
        <div className={styles.list}>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
});