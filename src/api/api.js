import { NEW_TODO_ID } from '../constants';
const fetchServer = (method = 'GET', id, payload, params) => {
	const { isSort, searchInput } = params || { isSort: false, searchInput: '' };
	const url =
		'http://localhost:3005/todos' +
		(id !== NEW_TODO_ID && id !== undefined ? `/${id}` : '') +
		'?_sort=' +
		(isSort ? 'name' : 'id') +
		(searchInput !== '' ? `&name_like=${encodeURIComponent(searchInput)}` : '');

	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body: payload ? JSON.stringify(payload) : null,
	});
};

export const getTodos = (isSort = false, searchInput = '') => {
	return fetchServer('GET', undefined, null, { isSort, searchInput }).then((response) =>
		response.json(),
	);
};
export const updateTodo = (id, data) => {
	return fetchServer('PUT', id, data).then((response) => response.json());
};

export const createTodo = (data) => {
	return fetchServer('POST', NEW_TODO_ID, data).then((response) => response.json());
};
export const deleteTodo = (id) => {
	return fetchServer('DELETE', id).then((response) => response.json());
};
