
const initialState = {
};


export const rootReducer = (state = initialState, action) => {

	switch (action.type) {
		default:
			return state;
	}
};

const getToken = () => localStorage.getItem('token');

const initialStateAuth = {
	token: getToken() || null,
	isAdmin: false
};

export const authReducer = (state = initialStateAuth, action) => {

	switch (action.type) {
		default:
			return state;
	}
};

