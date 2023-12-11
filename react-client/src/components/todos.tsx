import { useQuery } from '@tanstack/react-query';
import { Header } from './header';
import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import { TodoService } from '@/services/todo-service';

export const Todos = () => {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['get', 'todos'],
		queryFn: TodoService.getTodos,
	});
	const todos = data?.data;
	return (
		<div className='p-10 min-h-[100svh] flex flex-col relative'>
			<Header />
			<div className='bg-muted/30 backdrop-blur-lg p-5 rounded-xl ring ring-muted'>
				<TodoForm />
				{isLoading || isFetching
					? 'Loading...'
					: todos && todos?.length !== 0 && <TodoList todos={todos} />}
			</div>

			<div className='inset-0 absolute bg-grid-pattern -z-10'></div>
		</div>
	);
};
