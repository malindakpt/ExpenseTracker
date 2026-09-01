import { http, HttpResponse } from 'msw';

import { expenses } from './data/expenses';

export const handlers = [
  http.get('/api/expenses', ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 10);

    const category = url.searchParams.get('category');

    let result = [...expenses];

    if (category) {
      result = result.filter(
        (expense) => expense.category === category,
      );
    }

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
];