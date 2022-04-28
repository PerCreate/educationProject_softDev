export const getURL = () => '';

export function copyText(text) {
	const input = document.createElement('input');
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	input.remove();
}