import type { GetPaginationParams } from "../../../types/paginatedApi.types";
import type { PaginatedResponse } from "../../../types/paginatedResponse";
import type { Expense, ExpenseCategory } from "./expense.types";

export interface GetExpensesParams extends GetPaginationParams {
  category?: ExpenseCategory;
}

export type PaginatedExpensesResponse = PaginatedResponse<Expense>;