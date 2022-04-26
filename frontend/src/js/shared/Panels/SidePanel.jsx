import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./SidePanel.scss";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const Panel = ({ header, children, onClose }) => {
	useEffect(() => {
		const body = document.querySelector("body");
		body?.classList.add("open-panel");

		return () => {
			const body = document.querySelector("body");
			body.classList.remove("open-panel");
			// onCloseError();
		};
	}, []);

	const onClosePanel = () => {
		onClose();
	};

	return (
		<div className="SidePanel">
			<div className="SidePanel-overlay" onClick={() => onClosePanel()}></div>
			<div className="SidePanel-content">
				<div className="SidePanel-control">
					<div className="SidePanel-control-close" onClick={() => onClosePanel()}>
						<input id="menu-toggle" type="checkbox" />
						<label className="menu-button-container" htmlFor="menu-toggle">
							<div className="menu-button"></div>
						</label>
					</div>
				</div>
				<div className="SidePanel-header">{header}</div>
				<div className="SidePanel-body">{children}</div>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(Panel);
