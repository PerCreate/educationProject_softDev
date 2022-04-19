import "./Input.scss";

const Input = ({
	type = "text",
	name = null,
	value,
	onChange,
	placeholder = null,
	textarea = false,
}) => {
	// working доделать названия инпутов
	return (
		<label htmlFor={type + value} type={type}>
			<div className="name">{name}</div>
			{textarea ? (
				<textarea
					placeholder={placeholder}
					id={type + value}
					type={type}
					className="Input"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				></textarea>
			) : (
				<input
					placeholder={placeholder}
					id={type + value}
					type={type}
					className="Input"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				></input>
			)}
		</label>
	);
};

export default Input;
