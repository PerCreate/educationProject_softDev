import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { getURL } from "../Utils";
import "./Nav.scss";
import LogIn from "./Windows/LogIn/LogIn";
import SignUp from "./Windows/SignUp/SignUp";
import Window from "./Windows/Window";

const Nav = () => {
	const [isSignUpWindowOpen, setSignUpWindowState] = useState(false);
	const [errorSignUpMessage, setErrorSignUpMessage] = useState("");

	const [isLogInWindowOpen, setLogInWindowState] = useState(false);
	const [errorLogInMessage, setErrorLogInMessage] = useState("");

	const getRecommendation = () => {};

	const URL = getURL();

	const onSignUp = async (userData) => {
		try {
			const data = await axios.post(URL + "/api/createClient", userData);
			console.log("newClientData: ", data);
			setSignUpWindowState(false);
		} catch (e) {
			setErrorSignUpMessage(e.response.data.error || "Something went wrong.");
			console.log("Error: ", e.response.data.error);
		}
	};

	const onLogIn = async (userData) => {
		try {
			const data = await axios.post(URL + "/api/loginClient", userData);
			console.log("clientLogin: ", data);
			setLogInWindowState(false);
		} catch (e) {
			setErrorLogInMessage(e.response.data.error || "Something went wrong.");
			console.log("Error: ", e.response.data.error);
		}
	};

	return (
		<nav className={`Nav content`}>
			{isSignUpWindowOpen && (
				<Window
					header="Введите свои данные"
					onClose={() => setSignUpWindowState(false)}
					errorMessage={errorSignUpMessage}
					onCloseError={() => setErrorSignUpMessage("")}
				>
					<SignUp onSubmit={onSignUp} />
				</Window>
			)}
			{isLogInWindowOpen && (
				<Window
					header="Войти"
					onClose={() => setLogInWindowState(false)}
					errorMessage={errorLogInMessage}
					onCloseError={() => setErrorLogInMessage("")}
				>
					<LogIn onSubmit={onLogIn} />
				</Window>
			)}
			<Link to="/" className="Nav-logo"></Link>
			<ul className="Nav-list">
				<li className="item">Студия</li>
				<li className="item">Портфолио</li>
				<li className="item">Контакты</li>
				<li className="item" onClick={() => setSignUpWindowState(true)}>
					Зарегистрироваться
				</li>
				<li className="item" onClick={() => setLogInWindowState(true)}>
					Войти
				</li>
			</ul>
			<Button text="Получить рекомендацию" cb={getRecommendation} />
		</nav>
	);
};

export default Nav;
