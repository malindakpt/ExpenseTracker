import type { PaginatedResponse } from "../../../types/paginatedResponse";
import type { Expense, ExpenseCategory } from "./expense.types";

export type ExpenseSortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';
export interface GetExpensesParams {
  page: number;
  limit: number;
  category?: ExpenseCategory;
  sortBy: ExpenseSortField;
  sortOrder: SortOrder;
}

export type PaginatedExpensesResponse = PaginatedResponse<Expense>;