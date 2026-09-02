import { useCreateExpenseMutation } from '../../api/expensesApi';
import type { CreateExpenseRequest } from '../../types/expense.types';
import { ExpenseForm } from '../ExpenseForm/ExpenseForm';
import styles from './AddExpense.module.scss';

export const AddExpense = () => {
    const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();

    const handleCreate = async (expense: CreateExpenseRequest) => {
        await createExpense(expense).unwrap();
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Record an expense</h2>
            <ExpenseForm
                isSubmitting={isCreating}
                onSubmit={handleCreate}
            />
        </section>
    );
};