import { AUTHENTICATION } from "./types";

export const login = (data) => {
	return {
		data,
		type: AUTHENTICATION
	};
};
