import "./Input.scss";

const Input = ({ type = "text", name = null, value, textarea = false }) => {
	// working доделать названия инпутов
	return (
		<label htmlFor={type + value} type={type}>
			{textarea ? (
				<textarea id={type + value} type={type} className="Input" value={value}></textarea>
			) : (
				<input id={type + value} type={type} className="Input" value={value}></input>
			)}
		</label>
	);
};

export default Input;
