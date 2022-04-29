import { AUTHENTICATION, LOGOUT, SET_CLIENT_INFO } from "./types";

const initialState = {

};


export const rootReducer = (state = initialState, action) => {

	switch (action.type) {
		default:
			return state;
	}
};

const initialStateAuth = {
	email: null,
	isAdmin: false
};

export const authReducer = (state = initialStateAuth, action) => {

	switch (action.type) {
		case SET_CLIENT_INFO:
			const data = action.data;

			return {
				...state,
				email: data.email,
				isAdmin: data.isAdmin
			};

		case LOGOUT:
			return {
				...state,
				email: null,
				isAdmin: null
			};

		case AUTHENTICATION:
			const data1 = action.data;

			return {
				...state,
				email: data1.email,
				isAdmin: data1.isAdmin
			};
		default:
			return state;
	}
};

