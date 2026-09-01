 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 

 export const expensesApi = createApi({
    reducerPath: 'expensesApi',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),

    endpoints: (builder) => ({
        getExpenses: builder.query({
            query: (params) => ({
                url: '/expenses',
                params
            })
        })
    }),

    tagTypes: ['Expense'],
 })