import { createContext, useContext, useState } from 'react';
const StateManagerContext = createContext({
	state: null,
	//updateState({existedKey:value})-перезаписать value для свойства existedKey
	// updateState([{id:existedId,...data}])-перезаписать в массиве элемент с exisitedKey
	// updateState([{id:newId,...data}]) - добавить в массив элмент с newId
	// updateState([{id:existedId}]) - удалить элемент с existedId
	updateState: () => {},
});
const getUpdatedState = (state, newStateData) => {
	if (Array.isArray(newStateData)) {
		// Копируем массив
		let newArray = [...state];

		newStateData.forEach(({ id, ...itemData }) => {
			const index = newArray.findIndex((el) => el.id === id);

			if (index !== -1) {
				if (Object.keys(itemData).length === 0) {
					// Удаление: передан только { id }
					newArray.splice(index, 1);
				} else {
					// Обновление
					newArray[index] = { ...newArray[index], ...itemData };
				}
			} else {
				// Добавление нового
				if (Object.keys(itemData).length > 0 || id !== undefined) {
					newArray.push({ id, ...itemData });
				}
				// Если передан { id: undefined } или пустой — игнорируем
			}
		});

		return newArray; // ← ОБЯЗАТЕЛЬНО возвращаем!
	}
	const updateObject = (state, newStateData) => {
		return Object.entries(newStateData).reduce(
			(updatedState, [key, value]) => ({
				...updatedState,
				[key]:
					typeof value === 'object' && value !== null
						? updateObject(state[key], value)
						: value,
			}),
			state,
		);
	};
	if (typeof newStateData === 'object' && newStateData !== null) {
		return updateObject(state, newStateData);
	}

	return state;
};
export const StateManager = ({ children, initialState }) => {
	const [state, setState] = useState(initialState);
	const updateState = (data) => {
		setState((prevState) => getUpdatedState(prevState, data));
	};

	return (
		<StateManagerContext.Provider value={{ state, updateState }}>
			{children}
		</StateManagerContext.Provider>
	);
};
export const useStateManager = () => useContext(StateManagerContext);
