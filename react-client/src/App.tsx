import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoType } from './types/Todo';
import { TodoList } from './components/todo-list';

function App() {
	const [todos, setTodos] = useState<TodoType[]>([]);
	useEffect(() => {
		const getData = async () => {
			const response = await axios.get<TodoType[]>('http://localhost:8080/todos');
			setTodos(response.data);
		};
		getData();
	}, []);
	return (
		<div
			className={'flex flex-col items-center justify-center space-y-4 min-h-screen container'}
		>
			{todos.length !== 0 && <TodoList todos={todos} />}
		</div>
	);
}

export default App;
