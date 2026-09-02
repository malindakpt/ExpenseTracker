import { AddExpense } from './features/expenses/components/AddExpense';
import { ExpenseListPage } from './features/expenses/pages/ExpenseListPage';
import { useOfflineHydration } from './features/expenses/hooks/useOfflineHydration';
import { useNetworkStatus } from './features/expenses/hooks/useNetworkStatus';

function App() {

  useOfflineHydration();
  useNetworkStatus();

  return (
    <>
      <AddExpense />
      <ExpenseListPage />
    </>
  );
}

export default App;