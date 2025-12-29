import { useState, useRef } from 'react';
import styles from './control-panel.module.css';
import { Debounce } from '../../utils';
import { useStateManager } from '../../state-manager';
export const ControlPanel = ({ addTodo }) => {
	const handleAddClick = () => {
		addTodo();
	};

	const { state, updateState } = useStateManager();
	const { searchStr, isSort } = state;
	const setSearchStr = (data) => updateState({ searchStr: data });
	const setIsSort = () => updateState({ isSort: !isSort });
	const onSearch = (value) => {
		updateState({ searchStr: value });
	};
	const debounceOnSearch = useRef(Debounce(onSearch, 1000)).current;

	const onChangeSearchInput = ({ target }) => {
		setSearchStr(target.value);
		debounceOnSearch(target.value);
	};

	return (
		<div className={styles.controlPanel}>
			<input
				value={searchStr}
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
