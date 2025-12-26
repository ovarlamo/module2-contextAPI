import styles from './todo.module.css';
import { useState } from 'react';
import { NEW_TODO_ID } from '../../constants';
export const Todo = ({ id, name, finished, isEdit, saveTodo, deleteTodo, setIsEdit }) => {
	const [editName, setEditName] = useState(name);

	const isNew = id === NEW_TODO_ID;
	const onChangeName = ({ target }) => {
		setEditName(target.value);
	};
	const onClickSaveButton = () => saveTodo(id, editName, finished);
	const onClickDeleteButton = () => deleteTodo(id);
	const onChangeCheckbox = () => {
		saveTodo(id, editName, !finished);
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
