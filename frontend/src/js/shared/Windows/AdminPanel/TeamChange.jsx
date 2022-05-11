import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../UI/Input";
import Select from "react-select";
import axios from "axios";
import { getURL } from "../../../Utils";
import Button from "../../../UI/Button";

const TeamChange = ({ onSubmit, teamName = "", teamId }) => {
	const [name, setName] = useState(teamName);
	const [order, setOrder] = useState("");
	const [employees, setEmployees] = useState([]);
	const [options, setOptions] = useState([]);

	const URL = getURL();

	useEffect(() => {
		const getData = async () => {
			const data = await axios.get(URL + "/api/getFreeEmployees");
			const dataTeam = await axios.post(URL + "/api/getTeam", { id: teamId });

			const allEmployees = data.data.employees.map((employee) => ({
				label: employee.name + " | " + employee.position,
				value: employee.id,
			}));

			if (dataTeam.data.team.employees) {
				const chosenEmployees = [...dataTeam.data.team.employees];

				setEmployees(chosenEmployees);
				setOptions([...allEmployees, ...chosenEmployees]);
			} else {
				setOptions(allEmployees);
			}
		};

		getData();
	}, []);

	useEffect(() => {}, [employees]);

	return (
		<div className="TeamChange" style={{ width: "450px" }}>
			<form>
				<Input required type="name" name="Имя команды" value={name} onChange={setName} />
				<Input required name="Текущий заказ" value={order} onChange={setOrder} />
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите сотрудника..."
						classNamePrefix="custom-select"
						isMulti
						options={options}
						value={employees}
						onChange={(e) => setEmployees([...e])}
					/>
				</div>
				<Button
					text="Сохранить"
					cb={() =>
						onSubmit({
							id: teamId,
							name,
							employees: employees.map((employee) => employee.value),
							currentOrder: order,
						})
					}
				/>
			</form>
		</div>
	);
};

export default TeamChange;
