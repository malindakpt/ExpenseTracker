import { AddExpense } from './features/expenses/components/AddExpense';
import { ExpenseListPage } from './features/expenses/pages/ExpenseListPage';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AddExpense />
        <ExpenseListPage />
      </div>
    </div>
  );
}

export default App;