import { configureStore } from '@reduxjs/toolkit';
import { expensesApi } from '../features/expenses/api/expensesApi';
import { offlineSlice } from '../features/expenses/store/offlineSlice';
import { offlinePersistenceMiddleware } from '../features/expenses/store/offlinePersistenceMiddleware';

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [offlineSlice.reducerPath]: offlineSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(expensesApi.middleware)
      .concat(offlinePersistenceMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;