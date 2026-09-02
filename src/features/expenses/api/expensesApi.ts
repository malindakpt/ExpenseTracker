import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PaginatedExpensesResponse, GetExpensesParams } from '../types/expense-api.types';
import type { CreateExpenseRequest, Expense, UpdateExpenseRequest } from '../types/expense.types';


export const expensesApi = createApi({
    reducerPath: 'expensesApi',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api/'
    }),

    endpoints: (builder) => ({
        getExpenses: builder.query<PaginatedExpensesResponse, GetExpensesParams>({
            query: (params) => ({
                url: '/expenses',
                params
            }),
            providesTags: (result) => result ? [
                { type: 'Expense', id: 'LIST' },
                ...result.data.map(({ id }) => (
                    { type: 'Expense' as const, id }))] :
                [{ type: 'Expense', id: 'LIST' }],
        }),

        createExpense: builder.mutation<Expense, CreateExpenseRequest>({
            query: (body) => ({
                url: '/expenses',
                method: 'POST',
                body
            }),
            invalidatesTags: () => [{ type: 'Expense', id: 'LIST' }],
        }),

        updateExpense: builder.mutation<Expense, UpdateExpenseRequest>({
            query: (id, ...body) => ({
                url: `expenses/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Expense', id },
                { type: 'Expense', id: 'LIST' }
            ],
        }),

        deleteExpense: builder.mutation<void, string>({
            query: (id) => ({
                url: `expenses/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: 'Expense', id },
                { type: 'Expense', id: 'LIST' },
            ],
        })
    }),

    tagTypes: ['Expense'],
});

export const {
    useGetExpensesQuery,
    useCreateExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = expensesApi;