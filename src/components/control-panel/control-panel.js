import { useState, useRef } from 'react';
import styles from './control-panel.module.css';
import { Debounce } from '../../utils';
export const ControlPanel = ({ addTodo, setIsSort, isSort, onSearch }) => {
	const handleAddClick = () => {
		addTodo();
	};

	const [searchInput, setSearchInput] = useState('');
	const debounceOnSearch = useRef(Debounce(onSearch, 1000)).current;

	const onChangeSearchInput = ({ target }) => {
		setSearchInput(target.value);
		debounceOnSearch(target.value);
	};

	return (
		<div className={styles.controlPanel}>
			<input
				value={searchInput}
				onChange={onChangeSearchInput}
				type="text"
				placeholder="Search..."
				className={styles.searchInput}
			/>
			<input
				className={styles.sortCheckbox}
				type="checkbox"
				checked={isSort}
				onChange={setIsSort}
			></input>
			<button className={styles.addButton} onClick={handleAddClick}>
				+
			</button>
		</div>
	);
};
