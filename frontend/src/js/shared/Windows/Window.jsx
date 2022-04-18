import { useEffect, useState } from "react";
import "./Window.scss";

const Window = ({ children, onClose }) => {
	const [body, setBody] = useState(null);

	useEffect(() => {
		const body = document.querySelector("body");
		body?.classList.add("open-modal");
		setBody(body);
	}, []);

	const onCloseWindow = () => {
		body.classList.remove("open-modal");
		onClose();
	};

	return (
		<div className="Window">
			<div className="Window-overlay" onClick={onCloseWindow}></div>
			<div className="Window-content">{children}</div>
		</div>
	);
};

export default Window;
