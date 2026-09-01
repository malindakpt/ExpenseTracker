import { http, HttpResponse } from 'msw';

import { expenses } from './data/expenses';
import type {
  CreateExpenseRequest,
  Expense,
} from '../features/expenses/types/expense.types';

export const handlers = [
  // GET /api/expenses
  http.get('/api/expenses', ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 10);

    const category = url.searchParams.get('category');

    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    const sortOrder = url.searchParams.get('sortOrder') ?? 'desc';

    let result = [...expenses];

    if (category) {
      result = result.filter(
        (expense) => expense.category === category,
      );
    }

    result.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'amount') {
        return (a.amount - b.amount) * multiplier;
      }

      return (
        (new Date(a.date).getTime() -
          new Date(b.date).getTime()) *
        multiplier
      );
    });

    const start = (page - 1) * limit;
    const end = start + limit;

    const data = result.slice(start, end);

    return HttpResponse.json({
      data,
      page,
      limit,
      total: result.length,
      hasMore: end < result.length,
    });
  }),

  // POST /api/expenses
  http.post('/api/expenses', async ({ request }) => {
    const body = (await request.json()) as CreateExpenseRequest;

    const now = new Date().toISOString();

    const expense: Expense = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: now,
      updatedAt: now,
    };

    expenses.unshift(expense);

    return HttpResponse.json(expense, {
      status: 201,
    });
  }),

  // PATCH /api/expenses/:id
  http.patch('/api/expenses/:id', async ({ params, request }) => {
    const id = String(params.id);

    const index = expenses.findIndex(
      (expense) => expense.id === id,
    );

    if (index === -1) {
      return HttpResponse.json(
        {
          message: 'Expense not found',
        },
        {
          status: 404,
        },
      );
    }

    const body = (await request.json()) as Partial<
      CreateExpenseRequest
    >;

    const updatedExpense: Expense = {
      ...expenses[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    expenses[index] = updatedExpense;

    return HttpResponse.json(updatedExpense);
  }),

  // DELETE /api/expenses/:id
  http.delete('/api/expenses/:id', ({ params }) => {
    const id = String(params.id);

    const index = expenses.findIndex(
      (expense) => expense.id === id,
    );

    if (index === -1) {
      return HttpResponse.json(
        {
          message: 'Expense not found',
        },
        {
          status: 404,
        },
      );
    }

    expenses.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];