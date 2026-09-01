import type { Expense } from '../types/expense.types';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export const ExpenseList = ({
    expenses,
    onEdit,
    onDelete,
}: ExpenseListProps) => {
    if (expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

    return (
        <div>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}