import { configureStore } from '@reduxjs/toolkit';
import { expensesApi } from '../features/expenses/api/expensesApi';
import { offlineSlice } from '../features/expenses/store/offlineSlice';

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [offlineSlice.reducerPath]: offlineSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expensesApi.middleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;