import "./List.scss";

const List = ({ header, items }) => {
	return (
		<div className="List">
			<div className="List-header">{header}</div>
			<div className="List-items">{items}</div>
		</div>
	);
};

export default List;
