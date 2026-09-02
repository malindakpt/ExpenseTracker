import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';
import styles from './Input.module.scss';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label: string;
    error?: string;
}

export const Input = ({
    className,
    error,
    id,
    label,
    ...props
}: InputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
        <label className={styles.field}>
            <span className={styles.label}>{label}</span>
            <input
                aria-describedby={error ? errorId : undefined}
                className={[styles.input, className].filter(Boolean).join(' ')}
                id={inputId}
                {...props}
            />
            {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
        </label>
    );
};
