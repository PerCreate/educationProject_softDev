import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const LogIn = ({ onSubmit }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="LogIn" style={{ width: "450px" }}>
			<form>
				<Input
					placeholder="Введите почту"
					type="email"
					name="Почта"
					value={email}
					onChange={setEmail}
				/>
				<Input
					required
					placeholder="Введите пароль"
					type="password"
					name="Пароль"
					value={password}
					onChange={setPassword}
				/>
				<Button text="Войти" cb={() => onSubmit({ email, password })} />
			</form>
		</div>
	);
};

export default connect(mapStateToProps)(LogIn);
