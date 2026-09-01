export const EXPENSE_CATEGORIES = [
  'food',
  'travel',
  'shopping',
  'utilities',
  'health',
  'entertainment',
  'other',
];

export type ExpenseCategory = typeof EXPENSE_CATEGORIES;

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

