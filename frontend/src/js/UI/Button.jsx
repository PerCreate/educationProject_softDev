import "./Button.scss";

const Button = ({ text, cb, classes }) => {
	const onClick = (e) => {
		e.preventDefault();
		cb();
	};

	return (
		<button className={`Button ${classes}`} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
