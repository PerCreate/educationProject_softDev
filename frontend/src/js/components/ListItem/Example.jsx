import "./Example.scss";

const Example = ({ count, header }) => {
	return (
		<div className={`Example`}>
			<div className="img" count={count}></div>
			<div className="header">{header}</div>
		</div>
	);
};

export default Example;
