import { AUTHENTICATION, LOGOUT, SET_CLIENT_INFO } from "./types";

export const login = (data) => {
	return {
		data,
		type: AUTHENTICATION
	};
};

export const logout = (data) => {
	return {
		data,
		type: LOGOUT
	};
};

export const onCheckSession = (data) => {
	return {
		data,
		type: SET_CLIENT_INFO
	};
};