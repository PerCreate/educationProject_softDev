const Button = ({ text, cb }) => {
	return (
		<button className="Button" onClick={() => cb()}>
			{text}
		</button>
	);
};

export default Button;
