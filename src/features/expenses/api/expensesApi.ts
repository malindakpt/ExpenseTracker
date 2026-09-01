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
            })
        }),

        createExpense: builder.mutation<Expense, CreateExpenseRequest>({
            query: (body) => ({
                url: '/expenses',
                method: 'POST',
                body
            })
        }),

        updateExpense: builder.mutation<Expense, UpdateExpenseRequest>({
            query: (id, ...body) => ({
                url: `expenses/${id}`,
                method: 'PATCH',
                body
            })
        }),

        deleteExpense: builder.mutation<void, string>({
            query: (id) => ({
                url: `expenses/${id}`,
                method:'DELETE'
            })
        })
    }),

    tagTypes: ['Expense'],
 });