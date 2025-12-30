import { useState, useRef } from 'react';
import styles from './control-panel.module.css';
import { Debounce } from '../../utils';
import { useStateManager } from '../../state-manager';
export const ControlPanel = ({ addTodo }) => {
	const handleAddClick = () => {
		addTodo();
	};

	const {
		state: { isSort },
		updateState,
	} = useStateManager();

	const [searchInput, setSearchInput] = useState('');

	const setIsSort = () => updateState({ isSort: !isSort });
	const onSearch = (value, isSort) => {
		updateState({ searchStr: value, isSort });
	};
	const debounceOnSearch = useRef(Debounce(onSearch, 1000)).current;

	const onChangeSearchInput = ({ target }) => {
		setSearchInput(target.value);
		debounceOnSearch(target.value, isSort);
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
