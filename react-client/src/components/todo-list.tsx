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
		<Table>
			<TableCaption>Here is your todos</TableCaption>
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
