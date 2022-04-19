import { useEffect, useState } from "react";
import "./Window.scss";

const Window = ({ children, onClose, header, errorMessage = null, onCloseError }) => {
	useEffect(() => {
		const body = document.querySelector("body");
		body?.classList.add("open-modal");

		return () => {
			const body = document.querySelector("body");
			body.classList.remove("open-modal");
			onCloseError();
		};
	}, []);

	return (
		<div className="Window">
			<div className="Window-overlay" onClick={() => onClose()}></div>
			<div className="Window-content">
				<div className="Window-header">{header}</div>
				<div className="Window-close" onClick={() => onClose()}>
					<div className="close-tag"></div>
					<div className="close-tag"></div>
				</div>
				{children}
				{errorMessage && (
					<div className="Window-error">
						<div className="Window-close" onClick={() => onCloseError()}>
							<div className="close-tag"></div>
							<div className="close-tag"></div>
						</div>
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
};

export default Window;
