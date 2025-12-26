export const SetTodoInTodos = (todos, newTodo) => {
	console.log('SetTodoInTodos', todos, newTodo);
	return todos.map((task) => (task.id === newTodo.id ? { ...task, ...newTodo } : task));
};
