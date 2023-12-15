import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Todos } from '@/components/todos';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<Todos />
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
