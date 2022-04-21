import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import App from './js/App';
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, authReducer } from "./js/redux/rootReducer";

const reducer = combineReducers({
	authReducer,
	rootReducer,
	middleware: [composeWithDevTools]
});

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
