import { useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import "./SendApplication.scss";

const SendApplication = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [comment, setComment] = useState("");

	return (
		<div className="SendApplication">
			<form>
				<Input required type="name" name="Имя" value={name} onChange={setName} />
				<Input required type="phone" name="Телефон" value={phone} onChange={setPhone} />
				<Input type="email" name="Почта" value={email} onChange={setEmail} />
				<Input
					textarea
					placeholder="Введите текст"
					name="Комментарий"
					value={comment}
					onChange={setComment}
				/>
				<Button
					text="Заказать услугу"
					cb={() => onSubmit({ name, phone, email, comment })}
				/>
			</form>
		</div>
	);
};

export default SendApplication;
