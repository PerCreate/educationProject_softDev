import { AUTHENTICATION, SET_CLIENT_INFO } from "./types";

export const login = (data) => {
	return {
		data,
		type: AUTHENTICATION
	};
};

export const onCheckSession = (data) => {
	return {
		data,
		type: SET_CLIENT_INFO
	};
};