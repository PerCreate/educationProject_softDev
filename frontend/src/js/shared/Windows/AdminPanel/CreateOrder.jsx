import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from "../../../UI/Input";
import Select from "react-select";
import axios from "axios";
import DatePicker from "react-date-picker";

import Button from "../../../UI/Button";
import { getURL } from "../../../Utils";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const CreateOrder = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [docLink, setDocLink] = useState("");
	const [teams, setTeams] = useState([]);
	const [client, setClient] = useState([]);
	const [teamsOptions, setTeamsOptions] = useState([]);
	const [clientOptions, setClientOptions] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [finishDate, setFinishDate] = useState(new Date());

	const URL = getURL();

	useEffect(() => {
		const getData = async () => {
			const dataTeams = await axios.get(URL + "/api/getTeams");
			const dataClients = await axios.get(URL + "/api/getClients");

			const allTeams = dataTeams.data.teams.map((team) => ({
				label: team.name,
				value: team.id,
			}));
			setTeamsOptions(allTeams);

			const allClients = dataClients.data.clients.map((team) => ({
				label: team.name,
				value: team.id,
			}));
			setClientOptions(allClients);
		};

		getData();
	}, []);

	return (
		<div className="CreateOrder" style={{ width: "450px" }}>
			<form>
				<Input required type="name" name="Имя команды" value={name} onChange={setName} />
				<Input
					required
					type="number"
					name="Бюджет проекта"
					value={amount}
					onChange={setAmount}
				/>
				<Input required name="Ссылка на документ" value={docLink} onChange={setDocLink} />
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите команду..."
						classNamePrefix="custom-select"
						options={teamsOptions}
						value={teams}
						onChange={(e) => setTeams(e)}
						isSearchable
					/>
				</div>
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите клиента..."
						classNamePrefix="custom-select"
						options={clientOptions}
						value={client}
						onChange={(e) => setClient(e)}
						isSearchable
					/>
				</div>
				<div
					className="select-container"
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ width: "250px" }}> Дата начала:</div>
					<DatePicker
						className="_zIndex12"
						format="dd-MM-y"
						value={startDate}
						onChange={setStartDate}
					/>
				</div>
				<div
					className="select-container"
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ width: "250px" }}>Дата окончания:</div>
					<DatePicker
						className="_zIndex12"
						format="dd-MM-y"
						value={finishDate}
						onChange={setFinishDate}
					/>
				</div>

				<Button
					text="Создать заказ"
					cb={() => {
						onSubmit({
							name,
							amount,
							teamId: teams.value,
							clientId: client.value,
							startDate: startDate.toUTCString(),
							finishDate: finishDate.toUTCString(),
						});
					}}
				/>
			</form>
		</div>
	);
};

export default connect(mapStateToProps)(CreateOrder);
