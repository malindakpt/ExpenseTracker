import { AddExpense } from './features/expenses/components/AddExpense';
import { OfflineStatus } from './features/expenses/components/OfflineStatus';
import { OfflineSyncController } from './features/expenses/components/OfflineSyncController';
import { ExpenseListPage } from './features/expenses/pages/ExpenseListPage';

function App() {
  return (
    <>
      <OfflineSyncController />
      <OfflineStatus />
      <AddExpense />
      <ExpenseListPage />
    </>
  );
}

export default App;