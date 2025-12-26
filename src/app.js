import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';
import { ControlPanel } from './components/control-panel/control-panel';
import { getTodos, updateTodo, createTodo, deleteTodo } from './api/api';
import { SetTodoInTodos, AddTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isSort, setIsSort] = useState(false);
	const [searchStr, setSearchStr] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadDatas = async () => {
			setError(false);
			try {
				const data = await getTodos(isSort, searchStr);

				setTasks(data);
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		loadDatas();
	}, [isSort, searchStr]);

	const addNewTodo = () => setTasks(AddTodoInTodos(tasks));
	const saveTodo = (id, name, finished) => {
		if (id === NEW_TODO_ID) {
			createTodo({ name, finished }).then(({ id }) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === NEW_TODO_ID
							? { ...task, id, isEdit: false, name }
							: task,
					),
				);
			});
		} else {
			updateTodo(id, { name, finished }).then(({ id }) => {
				setTasks(SetTodoInTodos(tasks, { id, name, finished, isEdit: false }));
			});
		}
	};
	const deleteTodoFromDotos = (id) => {
		deleteTodo(id);
		setTasks((prevTasks) => prevTasks.filter((elem) => elem.id !== id));
	};
	const setIsEdit = (id) => {
		setTasks(SetTodoInTodos(tasks, { id, isEdit: true }));
	};

	return (
		<div className={styles.app}>
			{isLoading && <p>Загрузка...</p>}
			{error && <p className={styles.error}>Ошибка: {error}</p>}

			<h3>Список дел</h3>
			<div>
				<ControlPanel
					isSort={isSort}
					setIsSort={() => setIsSort(!isSort)}
					addTodo={addNewTodo}
					onSearch={setSearchStr}
				></ControlPanel>
			</div>
			{!isLoading && !error && (
				<div className={styles['list-container']}>
					{tasks.map(({ id, name, finished, isEdit = false }, index) => (
						<Todo
							name={name}
							key={id}
							id={id}
							finished={finished}
							saveTodo={saveTodo}
							isEdit={isEdit}
							deleteTodo={deleteTodoFromDotos}
							setIsEdit={() => setIsEdit(id)}
						></Todo>
					))}
				</div>
			)}
		</div>
	);
};
