import { TodoType } from './types/Todo';
import { TodoList } from './components/todo-list';
import { Header } from './components/header';
import { useEffect, useState } from 'react';
import { $api } from './http/api';
import { TodoForm } from './components/todo-form';

function App() {
	const [todos, setTodos] = useState<TodoType[]>([]);

	useEffect(() => {
		const getTodos = async () => {
			const res = await $api.get<TodoType[]>('/todos');
			setTodos(res.data);
		};
		getTodos();
	}, []);

	return (
		<div className='p-10 min-h-[100svh] flex flex-col relative'>
			<Header />
			<div className='bg-muted/30 backdrop-blur-lg p-5 rounded-xl ring ring-muted'>
				<TodoForm />
				{todos.length !== 0 && <TodoList todos={todos} />}
			</div>

			<div className='inset-0 absolute bg-grid-pattern -z-10'></div>
		</div>
	);
}

export default App;
