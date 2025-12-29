import styles from './todo.module.css';
import { getTodos, updateTodo, createTodo, deleteTodo } from '../../api';
import { NEW_TODO_ID } from '../../constants';
import { useStateManager } from '../../state-manager';
export const Todo = ({ id, name, finished, deleteTodo }) => {
	const { state, updateState } = useStateManager();

	const isEdit = state.editTodo.id === id && state.editTodo.isEdit;
	const editName = state.editTodo.id === id ? state.editTodo.editName : name;
	const setEditName = (name) => updateState({ editTodo: { id: id, editName: name } });
	const setIsEdit = () =>
		updateState({ editTodo: { id: id, isEdit: true, editName: name } });

	const isNew = id === NEW_TODO_ID;
	const onChangeName = ({ target }) => {
		setEditName(target.value);
	};

	const onClickSaveButton = () => saveTodo(id, editName, finished);
	const onClickDeleteButton = () => deleteTodo(id);
	const onChangeCheckbox = () => {
		saveTodo(id, name, !finished);
	};
	const saveTodo = (id, name, finished) => {
		console.log('saveTodo', id, name, finished);
		if (id === NEW_TODO_ID) {
			createTodo({ name, finished }).then(({ id }) => {
				updateState({ tasks: [{ id: NEW_TODO_ID }] });
				updateState({ tasks: [{ id: id, name: name, finished: finished }] });
			});
		} else {
			updateTodo(id, { name, finished }).then(({ id }) => {
				updateState({
					editTodo: { isEdit: false },
					tasks: [{ id: id, name: name, finished: finished }],
				});
			});
		}
	};

	return (
		<div className={styles['todo']}>
			<input
				type="checkbox"
				className={styles['checkbox']}
				checked={finished}
				onChange={onChangeCheckbox}
				disabled={isNew}
			/>
			<div className={styles.todoName}>
				{isEdit ? (
					<input
						type="text"
						className={styles.inputText}
						placeholder="Enter task name"
						value={editName}
						onChange={onChangeName}
					/>
				) : (
					<span onClick={setIsEdit}>{name}</span>
				)}
			</div>
			<div className={styles.blockButtons}>
				{isEdit ? (
					<button className={styles.button} onClick={onClickSaveButton}>
						✎
					</button>
				) : (
					<button className={styles.button} onClick={onClickDeleteButton}>
						✖
					</button>
				)}
			</div>
		</div>
	);
};
