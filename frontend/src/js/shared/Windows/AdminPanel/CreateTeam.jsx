import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import Select from "react-select";
import axios from "axios";
import { getURL } from "../../../Utils";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const CreateTeam = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [employees, setEmployees] = useState([]);
	const [options, setOptions] = useState([]);

	const URL = getURL();

	useEffect(() => {
		const getData = async () => {
			const data = await axios.get(URL + "/api/getFreeEmployees");
			const allEmployees = data.data.employees.map((employee) => ({
				label: employee.name + " | " + employee.position,
				value: employee.id,
			}));
			setOptions(allEmployees);
		};

		getData();
	}, []);

	return (
		<div className="CreateTeam" style={{ width: "450px" }}>
			<form>
				<Input required type="name" name="Имя команды" value={name} onChange={setName} />
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите сотрудника..."
						classNamePrefix="custom-select"
						isMulti
						options={options}
						value={employees}
						onChange={(e) => setEmployees([...e])}
						noOptionsMessage={() => "Нет свободных сотрудников"}
					/>
				</div>
				<Button
					text="Создать команду"
					cb={() =>
						onSubmit({ name, employees: employees.map((employee) => employee.value) })
					}
				/>
			</form>
		</div>
	);
};

export default connect(mapStateToProps)(CreateTeam);
