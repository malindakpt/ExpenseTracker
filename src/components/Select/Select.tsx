import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';
import styles from './Select.module.scss';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
    label: string;
    error?: string;
}

export const Select = ({
    className,
    error,
    id,
    label,
    ...props
}: SelectProps) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;

    return (
        <label className={styles.field}>
            <span className={styles.label}>{label}</span>
            <select
                aria-describedby={error ? errorId : undefined}
                className={[styles.select, className].filter(Boolean).join(' ')}
                id={selectId}
                {...props}
            />
            {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
        </label>
    );
};
