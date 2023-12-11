import { todoFormSchema } from '@/lib/validations/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { TodoService } from '@/services/todo-service';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

export const TodoForm = () => {
	const queryClient = useQueryClient();

	const { mutate: addTodo } = useMutation({
		mutationKey: ['todos'],
		mutationFn: TodoService.addTodo,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['get', 'todos'] });
		},
	});
	const form = useForm<z.infer<typeof todoFormSchema>>({
		resolver: zodResolver(todoFormSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});
	const onTodoSubmit = (values: z.infer<typeof todoFormSchema>) => {
		addTodo(values);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onTodoSubmit)} className='space-y-8'>
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
									className='max-h-56'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end mt-4'>
					<Button type='submit'>Add todo</Button>
				</div>
			</form>
		</Form>
	);
};
