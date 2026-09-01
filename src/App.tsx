import { useGetExpensesQuery } from './features/expenses/api/expensesApi';

function App() {
  const { data, isLoading, error } = useGetExpensesQuery({
    page: 1,
    limit: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load expenses</div>;
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default App;