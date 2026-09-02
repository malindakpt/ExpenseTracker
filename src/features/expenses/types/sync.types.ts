import { CreateExpenseRequest, UpdateExpenseRequest } from "./expense.types";

export type SyncOperation =
    | {
          id: string;
          type: 'create';
          payload: CreateExpenseRequest;
          createdAt: string;
      }
    | {
          id: string;
          type: 'update';
          expenseId: string;
          payload: UpdateExpenseRequest;
          createdAt: string;
      }
    | {
          id: string;
          type: 'delete';
          expenseId: string;
          createdAt: string;
      };

export type SyncStatus =
    | 'idle'
    | 'offline'
    | 'syncing'
    | 'error';
