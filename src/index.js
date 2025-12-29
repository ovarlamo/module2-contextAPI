import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, InitialState } from './app';
import { StateManager } from './state-manager';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<StateManager initialState={InitialState}>
		<App />
	</StateManager>,
);
