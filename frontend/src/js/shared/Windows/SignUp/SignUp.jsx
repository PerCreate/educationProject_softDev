import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const SignUp = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	return (
		<div className="SignUp" style={{ width: "450px" }}>
			<form>
				<Input
					placeholder="Введите имя"
					required
					type="name"
					name="Имя"
					value={name}
					onChange={setName}
				/>
				<Input
					placeholder="Введите телефон"
					required
					type="phone"
					name="Телефон"
					value={phone}
					onChange={setPhone}
				/>
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
				<Input
					required
					placeholder="Введите пароль еще раз"
					type="password"
					name="Пароль"
					value={passwordConfirm}
					onChange={setPasswordConfirm}
				/>
				<Button
					text="Зарегистрироваться"
					cb={() => onSubmit({ name, phone, email, password, passwordConfirm })}
				/>
			</form>
		</div>
	);
};

export default connect(mapStateToProps)(SignUp);
