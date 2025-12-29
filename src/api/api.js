import { NEW_TODO_ID } from '../constants';
const fetchServer = (method = 'GET', id, payload, params) => {
	const { isSort, searchStr } = params || { isSort: false, searchStr: '' };
	const url =
		'http://localhost:3005/todos' +
		(id !== NEW_TODO_ID && id !== undefined ? `/${id}` : '') +
		'?_sort=' +
		(isSort ? 'name' : 'id') +
		(searchStr !== '' ? `&name_like=${encodeURIComponent(searchStr)}` : '');
	console.log(url);
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body: payload ? JSON.stringify(payload) : null,
	});
};

export const getTodos = (isSort = false, searchStr = '') => {
	return fetchServer('GET', undefined, null, { isSort, searchStr }).then((response) =>
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
