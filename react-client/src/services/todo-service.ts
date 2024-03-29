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

	public static deleteTodo({ id }: { id: string }): Promise<AxiosResponse<TodoType>> {
		return $api.delete<TodoType>('/todos/' + id);
	}

	public static updateTodo(todo: TodoType): Promise<AxiosResponse<TodoType>> {
		return $api.put<TodoType>('/todos/' + todo.id, todo);
	}
}
