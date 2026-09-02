import type { Expense } from '../types/expense.types';

interface ExpenseItemProps {
    expense: Expense;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export const ExpenseItem = ({
    expense,
    onEdit,
    onDelete,
}: ExpenseItemProps) => {
    return (
        <div>
            <div>
                <h3>{expense.id}: {expense.title}</h3>

                <p>
                    {expense.category} · {expense.date}
                </p>

                {expense.notes && <p>{expense.notes}</p>}
            </div>

            <strong>${expense.amount.toFixed(2)}</strong>

            <div>
                <button onClick={() => onEdit(expense)}>
                    Edit
                </button>

                <button onClick={() => onDelete(expense.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
