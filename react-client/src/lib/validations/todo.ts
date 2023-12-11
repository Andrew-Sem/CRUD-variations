import z from 'zod';

export const todoFormSchema = z.object({
	title: z.string().min(1).max(50),
	description: z.string().min(1).max(50),
});
