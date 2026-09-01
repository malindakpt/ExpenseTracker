import type { PaginatedResponse } from "../../../types/paginatedResponse";
import type { Expense, ExpenseCategory } from "./expense.types";

export interface GetExpensesParams {
  page: number;
  limit: number;
  category?: ExpenseCategory;
}

export type PaginatedExpensesResponse = PaginatedResponse<Expense>;