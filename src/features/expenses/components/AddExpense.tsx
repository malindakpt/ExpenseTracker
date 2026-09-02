import { useCreateExpenseMutation } from '../api/expensesApi';
import type { CreateExpenseRequest } from '../types/expense.types';
import { ExpenseForm } from './ExpenseForm';

export const AddExpense = () => {
    const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();

    const handleCreate = async (expense: CreateExpenseRequest) => {
        await createExpense(expense).unwrap();
    };

    return (
        <div>
            <ExpenseForm
                isSubmitting={isCreating}
                onSubmit={handleCreate}
            />
        </div>
    );
};
