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

export const TodoForm = () => {
	const form = useForm<z.infer<typeof todoFormSchema>>({
		resolver: zodResolver(todoFormSchema),
	});
	const onSubmit = (values: z.infer<typeof todoFormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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
				<div className='flex space-x-4 justify-end mt-4'>
					<Button type='submit'>Add todo</Button>
				</div>
			</form>
		</Form>
	);
};
