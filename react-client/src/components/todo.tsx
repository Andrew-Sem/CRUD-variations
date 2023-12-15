import { TodoType } from '@/types/Todo';
import { TableCell, TableRow } from './ui/table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { PenBoxIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { EditTodoForm } from './edit-todo-form';
import { useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoService } from '@/services/todo-service';

export const Todo = ({ todo }: { todo: TodoType }) => {
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const { mutate: deleteTodo } = useMutation({
		mutationKey: ['delete', 'todo', todo.id],
		mutationFn: TodoService.deleteTodo,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['get', 'todos'] });
		},
	});
	const queryClient = useQueryClient();
	const deleteTodoHandler = () => {
		deleteTodo({ id: todo.id });
	};
	return (
		<TableRow className=' '>
			<TableCell>{todo.title}</TableCell>
			<TableCell>{todo.description}</TableCell>
			<TableCell className='w-4'>
				<Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
					<DialogTrigger asChild>
						<Button variant={'ghost'} size={'sm'}>
							<PenBoxIcon className='w-4 h-4' />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit todo</DialogTitle>
							<DialogDescription>
								Make changes to your todo here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<EditTodoForm closeDialog={() => setOpenEditDialog(false)} todo={todo} />
					</DialogContent>
				</Dialog>
			</TableCell>
			<TableCell className='w-4'>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={'ghost'} size={'sm'} className='hover:bg-destructive'>
							<XIcon className='w-4 h-4' />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently remove this todo
								from our servers.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className='flex space-x-3 justify-end'>
							<DialogClose asChild>
								<Button variant={'secondary'}>Cancel</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button variant={'destructive'} onClick={deleteTodoHandler}>
									Delete todo
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</TableCell>
		</TableRow>
	);
};
