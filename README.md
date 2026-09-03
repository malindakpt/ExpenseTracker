# Expense Tracker

A React and TypeScript expense-tracking application. It lets users record expenses and browse a filterable, sortable history backed by an in-browser mocked API.

## Run locally

Prerequisites: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. In development, Mock Service Worker (MSW) intercepts `/api/expenses` requests and supplies seeded in-memory expense data.

Other available commands:

```bash
npm run build
npm run lint
```

## Implemented well

- **Add expenses:** The form collects a title, positive amount, date, category, and optional notes. Client-side Zod validation reports field-level errors, while failed submissions show an accessible error message.
- **Expense history:** The list shows title, category, date, amount, and optional notes. Users can delete an expense from the list.
- **Pagination:** A Load More control retrieves pages incrementally and accumulates prior results without duplicate IDs.
- **Filtering and sorting:** The history can be filtered by category and sorted by date or amount in ascending or descending order. Changing a filter or sort resets the loaded results.
- **Mocked CRUD API:** MSW provides `GET`, `POST`, `PATCH`, and `DELETE` handlers for `/api/expenses`. RTK Query manages request lifecycle state, caching, and list invalidation for the active add/delete flows.
- **Code organization:** Expense-specific API, components, page, types, and validation are grouped under `src/features/expenses`. Shared form controls, Redux store setup, and pagination/list-control hooks live in dedicated modules.
- **Responsive and accessible basics:** Form and list styles include mobile and desktop layouts. Inputs use labels, loading/error messages use appropriate live-region roles, and destructive actions have descriptive labels.

## Current scope and gaps

This submission prioritizes the usable create, browse, filter/sort, paginate, and delete flow within the assignment window.

- **Editing is not complete:** The mock server supports `PATCH`, and an RTK Query update endpoint is declared, but there is no edit UI or edit form. The current client update query wiring also needs correction before it can be used.
- **Offline mode is not connected:** A reusable `StorageManager` wrapper around `localStorage` exists, but expenses and pending mutations are not persisted. There is no online/offline indicator or queued synchronization when connectivity returns.
- **Retry handling is not implemented:** Failed requests are surfaced to the user for create operations, but automatic retry/backoff and a retry action are not yet provided.
- **Mock API only in development:** MSW starts only during `npm run dev`. A production deployment would need a real API base URL and server implementation.
- **Tests are not yet included:** The project does not currently contain unit or integration tests for reducers, API behavior, form validation, or pagination.
- **Pagination uses a Load More button:** This satisfies the preferred interaction alternative in the brief; infinite scroll has not been added.

