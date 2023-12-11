import { $api } from '@/http/api';
import { TodoType } from '@/types/Todo';
import { AxiosResponse } from 'axios';

export class TodoService {
	public static getTodos(): Promise<AxiosResponse<TodoType[]>> {
		return $api.get<TodoType[]>('/todos');
	}

	public static addTodo({
		title,
		description,
	}: {
		title: string;
		description: string;
	}): Promise<AxiosResponse<TodoType>> {
		return $api.post<TodoType>('/todos', { title, description });
	}
}
