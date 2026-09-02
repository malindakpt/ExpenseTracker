import { useState } from 'react';
import type { CreateExpenseRequest } from '../types/expense.types';
import { EXPENSE_CATEGORIES } from '../types/expense.types';
import { createExpenseSchema } from '../validation/expense.schema';

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
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', placeItems: 'center' }}>
            <label>
                <input
                    placeholder='Title'
                    value={values.title}
                    onChange={(event) => updateValue('title', event.target.value)}
                />
                {errors.title && <p style={{ color: 'red' }} role="alert">{errors.title}</p>}
            </label>

            <label>
                <input
                    placeholder='Amount'
                    min="0.01"
                    step="0.01"
                    type="number"
                    value={values.amount}
                    onChange={(event) => updateValue('amount', event.target.value)}
                />
                {errors.amount && <p role="alert" style={{ color: 'red' }}>{errors.amount}</p>}
            </label>

            <label>
                Date
                <input
                    type="date"
                    value={values.date}
                    onChange={(event) => updateValue('date', event.target.value)}
                />
                {errors.date && <p role="alert" style={{ color: 'red' }}>{errors.date}</p>}
            </label>

            <label>
                Category
                <select
                    value={values.category}
                    onChange={(event) => updateValue('category', event.target.value)}
                >
                    <option value="">Select a category</option>
                    {EXPENSE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && <p role="alert" style={{ color: 'red' }}>{errors.category}</p>}
            </label>


            {submitError && <p role="alert">{submitError}</p>}

            <button style={{ margin: 20 }} disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Adding...' : 'Add expense'}
            </button>
        </form>
    );
};
