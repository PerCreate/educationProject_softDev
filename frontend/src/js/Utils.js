export const getURL = () => 'http://localhost:3000';

export const createCookie = (name, value, expiredDays) => {
	const d = new Date();
	d.setTime(d.getTime() + (expiredDays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	console.log(`${name}=${value}; httpOnly; Secure; ${expires};`);

	document.cookie = `${name}=${value}; httpOnly; Secure; ${expires};`;
};