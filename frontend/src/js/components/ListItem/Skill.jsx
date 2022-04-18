import "./Skill.scss";

const Skill = ({ count, header, text }) => {
	return (
		<div className={`Skill`}>
			<div className="img" count={count}></div>
			<div className="header">{header}</div>
			<div className="text">{text}</div>
		</div>
	);
};

export default Skill;
