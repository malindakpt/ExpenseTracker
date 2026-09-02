import { useState } from 'react';
import { Input } from '../../../../../components/Input/Input';
import { Select } from '../../../../../components/Select/Select';
import type { CreateExpenseRequest } from '../../../types/expense.types';
import { EXPENSE_CATEGORIES } from '../../../types/expense.types';
import { createExpenseSchema } from '../../../validation/expense.schema';
import styles from './ExpenseForm.module.scss';

interface ExpenseFormProps {
    isSubmitting: boolean;
    onSubmit: (expense: CreateExpenseRequest) => Promise<void>;
}

type FormValues = {
    title: string;
    amount: string;
    date: string;
    category: string;
    notes: string;
};

const initialValues: FormValues = {
    title: '',
    amount: '',
    date: '',
    category: '',
    notes: '',
};

export const ExpenseForm = ({
    isSubmitting,
    onSubmit,
}: ExpenseFormProps) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState<string>();

    const updateValue = (field: keyof FormValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(undefined);

        const result = createExpenseSchema.safeParse({
            ...values,
            amount: Number(values.amount),
            category: values.category,
            notes: values.notes || undefined,
        });

        if (!result.success) {
            setErrors(
                Object.fromEntries(
                    result.error.issues.map((issue) => [
                        String(issue.path[0]),
                        issue.message,
                    ]),
                ),
            );
            return;
        }

        try {
            await onSubmit(result.data);
        } catch {
            setSubmitError('Unable to add the expense. Please try again.');
        }
    };

    return (
        <form aria-busy={isSubmitting} className={styles.form} onSubmit={handleSubmit}>
            <Input
                error={errors.title}
                label="Title"
                placeholder="Title"
                value={values.title}
                onChange={(event) => updateValue('title', event.target.value)}
            />

            <Input
                error={errors.amount}
                label="Amount"
                placeholder="Amount"
                min="0.01"
                step="0.01"
                type="number"
                value={values.amount}
                onChange={(event) => updateValue('amount', event.target.value)}
            />

            <Input
                error={errors.date}
                label="Date"
                type="date"
                value={values.date}
                onChange={(event) => updateValue('date', event.target.value)}
            />

            <Select
                error={errors.category}
                label="Category"
                value={values.category}
                onChange={(event) => updateValue('category', event.target.value)}
            >
                <option value="">Select a category</option>
                {EXPENSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </Select>

            <button className={styles.submit} disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Adding...' : 'Add expense'}
            </button>

            <p className={styles.status} role="status">
                {isSubmitting ? 'Adding expense' : ''}
            </p>
            {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
        </form>
    );
};