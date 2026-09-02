export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

export interface GetPaginationParams {
  page: number;
  limit: number;
  sortBy: SortField;
  sortOrder: SortOrder;
}