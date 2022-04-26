import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const CreateTeam = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [position, setPosition] = useState("");

	return (
		<div className="CreateEmployee" style={{ width: "450px" }}>
			<form>
				<Input required type="name" name="Имя сотрудника" value={name} onChange={setName} />
				<Input
					required
					name="Должность сотрудника"
					value={position}
					onChange={setPosition}
				/>

				<Button text="Создать сотрудника" cb={() => onSubmit({ name, position })} />
			</form>
		</div>
	);
};

export default connect(mapStateToProps)(CreateTeam);
