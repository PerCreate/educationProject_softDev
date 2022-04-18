import { Link } from "react-router-dom";
import Button from "../UI/Button";
import "./Nav.scss";

const Nav = () => {
	const getRecommendation = () => {};

	return (
		<nav className={`Nav content`}>
			<Link to="/" className="Nav-logo"></Link>
			<ul className="Nav-list">
				<li className="item">Студия</li>
				<li className="item">Портфолио</li>
				<li className="item">Контакты</li>
			</ul>
			<Button text="Получить рекомендацию" cb={getRecommendation} />
		</nav>
	);
};

export default Nav;
