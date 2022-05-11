import React, { Component } from "react";
import Button from "../../../UI/Button";
import "./Confirm.scss";

const Confirm = ({ onSubmit, text, onClose }) => {
	console.log(onSubmit);
	return (
		<div className="Confirm">
			<Button classes="_smaller" text={text} cb={() => onSubmit()} />
			<Button classes="_close _smaller" text="Закрыть" cb={() => onClose()} />
		</div>
	);
};

export default Confirm;
