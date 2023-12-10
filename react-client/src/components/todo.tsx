import { TodoType } from '@/types/Todo';
import { TableCell, TableRow } from './ui/table';

export const Todo = ({ todo }: { todo: TodoType }) => {
	return (
		<TableRow className=''>
			<TableCell>{todo.title}</TableCell>
			<TableCell>{todo.description}</TableCell>
		</TableRow>
	);
};
