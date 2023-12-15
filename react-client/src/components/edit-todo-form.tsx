import { todoFormSchema } from '@/lib/validations/todo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoType } from '@/types/Todo';
import { TodoService } from '@/services/todo-service';

export const EditTodoForm = ({
	closeDialog,
	todo,
}: {
	closeDialog: () => void;
	todo: TodoType;
}) => {
	const queryClient = useQueryClient();
	const { mutate: updateTodo } = useMutation({
		mutationKey: ['update', 'todos', todo.id],
		mutationFn: TodoService.updateTodo,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['get', 'todos'] });
		},
	});
	const form = useForm<z.infer<typeof todoFormSchema>>({
		resolver: zodResolver(todoFormSchema),
		defaultValues: {
			title: todo.title,
			description: todo.description,
		},
	});
	const onSubmit = (values: z.infer<typeof todoFormSchema>) => {
		updateTodo({ id: todo.id, ...values });
		closeDialog();
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='I want to do...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Type description here'
									{...field}
									className='max-h-56'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex space-x-4 justify-end'>
					<Button type='reset' variant={'secondary'} onClick={closeDialog}>
						Cancel
					</Button>
					<Button type='submit'>Save changes</Button>
				</div>
			</form>
		</Form>
	);
};
