import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

/* Actions */

export function setUser(name, role, id) {
	localStorage.setItem("user", JSON.stringify({name, role, id}));
	
	return {
		type: "SET_USER",
		name, role, id
	}
}

/* Reducers */

function user(state = JSON.parse(localStorage.getItem("user")) || {}, action) {
	switch (action.type) {
		case "SET_USER":
			const { name, role, id } = action;
			
			return {
				name, role, id
			};
	
		default:
			return state;
	}
}

function teacherAssignments(state = [], action) {
	return state;
}

function studentAssignments(state = [], action) {
	return state;
}

const combinedReducers = combineReducers({
	user,
	routing: routerReducer
});

/* Store */

const myLogger = logger({
	predicate: (getState, action) => action.type.indexOf("@@router") == -1
});

export const store = createStore(combinedReducers, applyMiddleware(routerMiddleware(browserHistory), myLogger));

/* Router/history */

export const history = syncHistoryWithStore(browserHistory, store);