import "./Button.scss";

const Button = ({ text, cb }) => {
	const onClick = (e) => {
		e.preventDefault();
		cb();
	};

	return (
		<button className="Button" onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
