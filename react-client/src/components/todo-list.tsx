import { TodoType } from '@/types/Todo';
import { Todo } from './todo';
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export const TodoList = ({ todos }: { todos: TodoType[] }) => {
	return (
		<Table className='rounded-md overflow-hidden mt-8'>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Description</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{todos.map((todo) => (
					<Todo todo={todo} key={todo.id} />
				))}
			</TableBody>
		</Table>
	);
};
