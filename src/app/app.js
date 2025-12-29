import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from '../components';
import { ControlPanel } from '../components/control-panel/control-panel';
import { getTodos, updateTodo, createTodo, deleteTodo } from '../api/api';
import { SetTodoInTodos, AddTodoInTodos } from '../utils';
import { NEW_TODO_ID } from '../constants';
import { useStateManager } from '../state-manager';

export const App = () => {
	const { state, updateState, setState } = useStateManager();

	const { tasks, isSort, searchStr } = state;
	const setTasks = (data) => updateState({ tasks: data });

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadDatas = async () => {
			setError(false);
			setIsLoading(true);
			try {
				const loadedTasks = await getTodos(isSort, searchStr);
				console.log('loadDatas', loadedTasks);
				setState({ ...state, tasks: loadedTasks });
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		loadDatas();
	}, [isSort, searchStr]);

	const addNewTodo = () =>
		updateState({
			tasks: [{ id: NEW_TODO_ID, name: '', finished: false }],
			editTodo: { id: NEW_TODO_ID, editName: '', isEdit: true },
		});

	const deleteTodoFromDotos = (id) => {
		deleteTodo(id);
		updateState({ tasks: [{ id: id }] });
	};

	return (
		<div className={styles.app}>
			{isLoading && <p>Загрузка...</p>}
			{error && <p className={styles.error}>Ошибка: {error}</p>}

			<h3>Список дел</h3>
			<div>
				<ControlPanel addTodo={addNewTodo}></ControlPanel>
			</div>
			{!isLoading && !error && (
				<div className={styles['list-container']}>
					{tasks.map(({ id, name, finished, isEdit = false }, index) => (
						<Todo
							name={name}
							key={id}
							id={id}
							finished={finished}
							isEdit={isEdit}
							deleteTodo={deleteTodoFromDotos}
						></Todo>
					))}
				</div>
			)}
		</div>
	);
};
