export const getURL = () => process.env.NODE_ENV === "production" ? "" : 'http://localhost:3000';

export function copyText(text) {
	const input = document.createElement('input');
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	input.remove();
}