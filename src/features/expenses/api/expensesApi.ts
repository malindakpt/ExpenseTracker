 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PaginatedExpensesResponse, GetExpensesParams } from '../types/expense-api.types';
import type { CreateExpenseRequest, Expense, UpdateExpenseRequest } from '../types/expense.types';
 

 export const expensesApi = createApi({
    reducerPath: 'expensesApi',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),

    endpoints: (builder) => ({
        getExpenses: builder.query<PaginatedExpensesResponse, GetExpensesParams>({
            query: (params) => ({
                url: '/expenses',
                params
            }),
            providesTags: ['Expense'],
        }),

        createExpense: builder.mutation<Expense, CreateExpenseRequest>({
            query: (body) => ({
                url: '/expenses',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Expense'],
        }),

        updateExpense: builder.mutation<Expense, UpdateExpenseRequest>({
            query: (id, ...body) => ({
                url: `expenses/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Expense'],
        }),

        deleteExpense: builder.mutation<void, string>({
            query: (id) => ({
                url: `expenses/${id}`,
                method:'DELETE'
            }),
            invalidatesTags: ['Expense'],
        })
    }),

    tagTypes: ['Expense'],
 });