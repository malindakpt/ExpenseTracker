import { memo } from 'react';
import type { Expense } from '../../types/expense.types';
import styles from './ExpenseItem.module.scss';

interface ExpenseItemProps {
    expense: Expense;
    onDelete: (id: string) => void;
}

export const ExpenseItem = memo(({
    expense,
    onDelete,
}: ExpenseItemProps) => {
    return (
        <article className={styles.item}>
            <div>
                <h3 className={styles.title}>{expense.title}</h3>
                <p className={styles.meta}>
                    {expense.category} · {expense.date}
                </p>
                {expense.notes && <p className={styles.notes}>{expense.notes}</p>}
            </div>

            <div className={styles.actions}>
                <strong className={styles.amount}>${expense.amount.toFixed(2)}</strong>
                <button className={styles.delete} onClick={() => onDelete(expense.id)} type="button">
                    Delete
                </button>
            </div>
        </article>
    );
});