export const initialState = {
	todos: [],
	editingTodo: {
		id: null,
		title: '',
	},
	options: {
		searchInput: '',
		searchPhrase: '',
		isAlphabetSorting: false,
		isLoading: true,
	},
};
