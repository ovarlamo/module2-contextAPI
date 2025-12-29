import { useEffect } from 'react';
import { ControlPanel, Todo } from '../components';
import { readTodos } from '../api';
import { useStateManager } from '../state-manager';
import styles from './app.module.css';

export const App = () => {
	const { state, setState } = useStateManager();
	const {
		todos,
		options: { searchPhrase, isAlphabetSorting },
	} = state;

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) => {
			setState({
				...state,
				todos: loadedTodos,
				options: {
					...state.options,
					isLoading: false,
				},
			});
		});
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	);
};
