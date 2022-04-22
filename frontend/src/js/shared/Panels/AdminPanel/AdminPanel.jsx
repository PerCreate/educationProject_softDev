import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getURL } from "../../../Utils";

import "./AdminPanel.scss";

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const tabs = {
	applications: "Заявки",
	clients: "Клиенты",
	teams: "Команды",
	orders: "Заказы",
};

const AdminPanel = () => {
	const [activeTab, setActiveTab] = useState(tabs["applications"]);
	const [panelData, setPanelData] = useState(null);
	const [loading, setLoading] = useState(true);

	const URL = getURL();

	const onApplications = async () => {
		if (activeTab === "applications") return;

		setLoading(true);
		setActiveTab("applications");

		try {
			const data = await axios.get(URL + "/api/getApplications");
			setPanelData(data.data.applications);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const onClients = async () => {
		if (activeTab === "clients") return;

		setLoading(true);
		setActiveTab("clients");

		try {
			const data = await axios.get(URL + "/api/getClients");
			setPanelData(data.data.clients);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const onTeams = async () => {
		if (activeTab === "teams") return;

		setLoading(true);
		setActiveTab("teams");

		try {
			const data = await axios.get(URL + "/api/getTeams");
			setPanelData(data.data.teams);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const onOrders = async () => {
		if (activeTab === "orders") return;

		setLoading(true);
		setActiveTab("orders");

		try {
			const data = await axios.get(URL + "/api/getOrders");
			setPanelData(data.data.orders);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	useEffect(() => {
		onApplications();
	}, []);

	return (
		<div className="AdminPanel">
			<div className="AdminPanel-tabs">
				<div
					className={`tab ${activeTab === "applications" ? "active" : ""}`}
					onClick={() => onApplications()}
				>
					{tabs["applications"]}
				</div>
				<div
					className={`tab ${activeTab === "clients" ? "active" : ""}`}
					onClick={() => onClients()}
				>
					{tabs["clients"]}
				</div>
				<div
					className={`tab ${activeTab === "teams" ? "active" : ""}`}
					onClick={() => onTeams()}
				>
					{tabs["teams"]}
				</div>
				<div
					className={`tab ${activeTab === "orders" ? "active" : ""}`}
					onClick={() => onOrders()}
				>
					{tabs["orders"]}
				</div>
			</div>

			{!loading && (
				<div className="AdminPanel-content">
					{activeTab === "applications" &&
						panelData.map((item, index) => {
							return (
								<div key={item + index} className="item">
									<div className="name">{item.name}</div>
									<div className="phone">{item.phone}</div>
									<div className="email">{item.email}</div>
									<div className="comment">{item.comment}</div>
									<div className="service">{item.service}</div>
								</div>
							);
						})}
					{}
				</div>
			)}
		</div>
	);
};

export default connect(mapStateToProps)(AdminPanel);
