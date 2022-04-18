import Input from "../../UI/Input";
import "./SendApplication.scss";

const SendApplication = ({ header }) => {
	return (
		<div className="SendApplication">
			<div className="SendApplication-header">{header}</div>
			<form action="">
				<Input type="name" name="Имя" />
				<Input type="phone" name="Телефон" />
				<Input type="email" name="Почта" />
				<Input textarea name="textarea" />
			</form>
		</div>
	);
};

export default SendApplication;
