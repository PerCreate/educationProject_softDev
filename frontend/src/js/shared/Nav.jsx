import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { getURL } from "../Utils";
import "./Nav.scss";
import AdminPanel from "./Panels/AdminPanel/AdminPanel";
import SidePanel from "./Panels/SidePanel";
import LogIn from "./Windows/LogIn/LogIn";
import SignUp from "./Windows/SignUp/SignUp";
import Window from "./Windows/Window";

const mapState = (state) => {
	return state;
};

const mapDispatch = {
	dispatchClientData: () => {},
};

const Nav = ({ authReducer }) => {
	const [isSignUpWindowOpen, setSignUpWindowState] = useState(false);
	const [errorSignUpMessage, setErrorSignUpMessage] = useState("");

	const [isLogInWindowOpen, setLogInWindowState] = useState(false);
	const [errorLogInMessage, setErrorLogInMessage] = useState("");

	const [isAdminPanelOpen, setAdminPanelState] = useState(false);
	const [userData] = useState({ email: authReducer.email, isAdmin: authReducer.isAdmin });

	const getRecommendation = () => {};

	const URL = getURL();

	const onSignUp = async (userData) => {
		try {
			await axios.post(URL + "/api/createClient", userData);
			setSignUpWindowState(false);
		} catch (e) {
			setErrorSignUpMessage(e.response.data.error || "Something went wrong.");
			console.log("Error: ", e.response.data.error);
		}
	};

	const onLogIn = async (userData) => {
		try {
			await axios.post(URL + "/api/loginClient", userData);
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

				{userData.email ? (
					<li className="item" onClick={() => setSignUpWindowState(true)}>
						Выйти
					</li>
				) : (
					<>
						<li className="item" onClick={() => setSignUpWindowState(true)}>
							Зарегистрироваться
						</li>
						<li className="item" onClick={() => setLogInWindowState(true)}>
							Войти
						</li>
					</>
				)}

				{userData.isAdmin && (
					<li className="item burger-menu" onClick={() => {}}>
						<input
							id="menu-toggle"
							type="checkbox"
							value={isAdminPanelOpen}
							checked={isAdminPanelOpen}
							onChange={() => setAdminPanelState(!isAdminPanelOpen)}
						/>
						<label className="menu-button-container" htmlFor="menu-toggle">
							<div className="menu-button"></div>
						</label>
					</li>
				)}

				{isAdminPanelOpen && (
					<SidePanel
						header="Панель администратора"
						onClose={() => setAdminPanelState(false)}
					>
						<AdminPanel />
					</SidePanel>
				)}
			</ul>
			<Button text="Получить рекомендацию" cb={getRecommendation} />
		</nav>
	);
};

export default connect(mapState, mapDispatch)(Nav);
