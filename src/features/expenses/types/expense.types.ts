export const EXPENSE_CATEGORIES = [
  'food',
  'travel',
  'shopping',
  'utilities',
  'health',
  'entertainment',
  'other'
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateExpenseRequest = Omit<Expense, "id" | "createdAt" |"updatedAt">;

export type UpdateExpenseRequest = {id : string} & Partial<Omit<Expense, "id" | "createdAt" |"updatedAt">>;
