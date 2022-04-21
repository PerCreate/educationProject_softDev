import { SET_CLIENT_INFO } from "./types";

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
		default:
			return state;
	}
};

