import { useState } from "react";
import axios from "axios";

import List from "../components/List";
import Example from "../components/ListItem/Example";
import Skill from "../components/ListItem/Skill";
import SendApplication from "../shared/Windows/SendApplication/SendApplication";
import Window from "../shared/Windows/Window";
import Button from "../UI/Button";
import "./Home.scss";
import { getURL } from "../Utils";

const skillItems = [
	{
		header: "ВНИМАНИЕ К ДЕТАЛЯМ",
		count: 1,
		text: "Идейные соображения, а также начало повседневной работы по формированию позиции.",
	},
	{
		header: "Пунктуальность",
		count: 2,
		text: "Задача организации, в особенности же рамки и место обучения кадров влечет за собой.",
	},
	{
		header: "Планирование",
		count: 3,
		text: "Равным образом консультация с широким активом в значительной степени обуславливает.",
	},
	{
		header: "Современные технологии",
		count: 4,
		text: "Значимость этих проблем настолько очевидна, что реализация плановых заданий.",
	},
];

const exampleItems = [
	{ count: 1, header: "десктопные приложения" },
	{ count: 2, header: "Мобильные приложения" },
	{ count: 3, header: "Дизайнерские решения" },
];

const Home = ({ children }) => {
	const [isSendWindowOpen, setWindowState] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const URL = getURL();

	const getService = () => {
		setWindowState(true);
	};

	const sendNewApplication = async (userData) => {
		try {
			const data = await axios.post(URL + "/api/createApplication", userData);
			console.log(data);
			setWindowState(false);
		} catch (e) {
			setErrorMessage(e.response.data.error);
			console.log("Error: ", e.response.data.error);
		}
	};

	return (
		<main className="Home">
			{isSendWindowOpen && (
				<Window
					header="Оставьте свои данные, мы вам перезвоним"
					onClose={() => setWindowState(false)}
					errorMessage={errorMessage}
					onCloseError={() => setErrorMessage("")}
				>
					<SendApplication onSubmit={sendNewApplication} />
				</Window>
			)}

			<div className="Home-overlay">
				<h1>Эффективные решения!</h1>
				<Button text="Заказать услугу" cb={getService} />
			</div>
			<List
				items={skillItems.map(({ header, count, text }) => (
					<Skill key={text + count + header} header={header} count={count} text={text} />
				))}
			/>
			<List
				header="Чем мы занимаемся"
				items={exampleItems.map(({ header, count }) => (
					<Example key={count + header} header={header} count={count} />
				))}
			/>
		</main>
	);
};

export default Home;
