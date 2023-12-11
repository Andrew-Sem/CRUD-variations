import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Todos } from '@/components/todos';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<Todos />
		</QueryClientProvider>
	);
}

export default App;
