import { NEW_TODO_ID } from '../constants';
export const AddTodoInTodos = (todos, todo) => {
	const newTodo = todo || { id: NEW_TODO_ID, name: '', isEdit: true, finished: false };
	return [...todos, newTodo];
};
