import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import { copyText, getURL } from "../../../Utils";
import CreateEmployee from "../../Windows/AdminPanel/CreateEmployee";
import CreateOrder from "../../Windows/AdminPanel/CreateOrder";
import CreateTeam from "../../Windows/AdminPanel/CreateTeam";
import Window from "../../Windows/Window";

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
	employees: "Сотрудники",
};

const AdminPanel = () => {
	const [activeTab, setActiveTab] = useState(tabs["applications"]);
	const [panelData, setPanelData] = useState(null);

	const [isCreateTeamWindowOpen, setIsCreateTeamWindowOpen] = useState(false);
	const [isCreateEmployeeWindowOpen, setIsCreateEmployeeWindowOpen] = useState(false);
	const [isCreateOrderWindowOpen, setIsCreateOrderWindowOpen] = useState(false);

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
			const ewq = [];
			for (let index = 0; index < 100; index++) {
				ewq.push(data.data.teams);
			}
			setPanelData(ewq);
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

	const onEmployees = async () => {
		if (activeTab === "employees") return;

		setLoading(true);
		setActiveTab("employees");

		try {
			const data = await axios.get(URL + "/api/getEmployees");
			setPanelData(data.data.employees);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	useEffect(() => {
		onApplications();
	}, []);

	const createEmployeeHandler = async (data) => {
		setLoading(true);

		try {
			await axios.post(URL + "/api/createEmployee", data);
			setIsCreateEmployeeWindowOpen(false);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const createTeamHandler = async (data) => {
		setLoading(true);

		try {
			await axios.post(URL + "/api/createTeam", data);
			setIsCreateTeamWindowOpen(false);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const createOrderHandler = async (data) => {
		setLoading(true);

		try {
			await axios.post(URL + "/api/createOrder", data);
			setIsCreateOrderWindowOpen(false);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

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
				<div
					className={`tab ${activeTab === "employees" ? "active" : ""}`}
					onClick={() => onEmployees()}
				>
					{tabs["employees"]}
				</div>
			</div>

			{!loading && (
				<div className="AdminPanel-content">
					<div className="AdminPanel-content-body">
						{activeTab === "applications" && (
							<>
								<div className="person">
									<div className="item name">№</div>
									<div className="item name">Имя</div>
									<div className="item phone">Номер</div>
									<div className="item email">Почта</div>
									<div className="item comment">Комментарий</div>
									<div className="item service">Услуга</div>
								</div>
								{panelData.map((item, index) => {
									return (
										<div key={item + index} className="person">
											<div className="item number">{index + 1}</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.name)}
											>
												{item.name}
											</div>
											<div
												className="item phone"
												title="Скопировать"
												onClick={() => copyText(item.phone)}
											>
												{item.phone}
											</div>
											<div
												className="item email"
												title="Скопировать"
												onClick={() => copyText(item.email)}
											>
												{item.email}
											</div>
											<div className="item comment">
												{item.comment || "Комметариев нет"}
											</div>
											<div className="item service">
												{item.service || "Услуга не указана"}
											</div>
										</div>
									);
								})}
							</>
						)}
						{activeTab === "clients" && (
							<>
								<div className="person">
									<div className="item name">№</div>
									<div className="item name">Имя</div>
									<div className="item phone">Номер</div>
									<div className="item email">Почта</div>
									<div className="item status">Статус</div>
									<div className="item isadmin">Является админом</div>
								</div>
								{panelData.map((item, index) => {
									return (
										<div key={item + index} className="person">
											<div className="item number">{index + 1}</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.name)}
											>
												{item.name}
											</div>
											<div
												className="item phone"
												title="Скопировать"
												onClick={() => copyText(item.phone)}
											>
												{item.phone}
											</div>
											<div
												className="item email"
												title="Скопировать"
												onClick={() => copyText(item.email)}
											>
												{item.email}
											</div>
											<div className="item status">
												{item.status || "Статуса нет"}
											</div>
											<div className="item isadmin">
												{item.isadmin ? "Да" : "Нет"}
											</div>
										</div>
									);
								})}
							</>
						)}
						{activeTab === "teams" && (
							<>
								<div className="AdminPanel-content-header">
									<Button
										text="Создать команду"
										classes="_adminPanel"
										cb={() => setIsCreateTeamWindowOpen(true)}
									/>
									<div className="person">
										<div className="item name">№</div>
										<div className="item name">Имя команды</div>
										<div className="item name">Сотрудники</div>
										<div className="item orders">Текущий заказ</div>
										<div className="item orders">Выполненные заказы</div>
									</div>
								</div>
								{panelData.map((item, index) => {
									return (
										<div key={item + index} className="person">
											<div className="item number">{index + 1}</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.name)}
											>
												{item.name}
											</div>
											<div
												className="item phone"
												title="Скопировать"
												onClick={() => copyText(item.phone)}
											>
												{item.phone}
											</div>
											<div
												className="item email"
												title="Скопировать"
												onClick={() => copyText(item.email)}
											>
												{item.email}
											</div>
											<div className="item status">
												{item.status || "Статуса нет"}
											</div>
											<div className="item isadmin">
												{item.isadmin ? "Да" : "Нет"}
											</div>
										</div>
									);
								})}
								{isCreateTeamWindowOpen && (
									<Window
										header="Создать команду"
										onClose={() => setIsCreateTeamWindowOpen(false)}
									>
										<CreateTeam onSubmit={createTeamHandler} />
									</Window>
								)}
							</>
						)}
						{activeTab === "orders" && (
							<>
								<div className="AdminPanel-content-header">
									<Button
										text="Создать заказ"
										classes="_adminPanel"
										cb={() => setIsCreateOrderWindowOpen(true)}
									/>
									<div className="person">
										<div className="item name">№</div>
										<div className="item name">Имя клиента</div>
										<div className="item name">Команда</div>
										<div className="item orders">Срок начала</div>
										<div className="item orders">Срок окончания</div>
									</div>
								</div>
								{panelData.map((item, index) => {
									return (
										<div key={item + index} className="person">
											<div className="item number">{index + 1}</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.clientName)}
											>
												{item.clientName}
											</div>
											<div
												className="item phone"
												title="Скопировать"
												onClick={() => copyText(item.teamName)}
											>
												{item.teamName}
											</div>
											<div
												className="item email"
												title="Скопировать"
												onClick={() => copyText(item.startDate)}
											>
												{item.startDate}
											</div>
											<div
												className="item email"
												title="Скопировать"
												onClick={() => copyText(item.finishDate)}
											>
												{item.finishDate}
											</div>
										</div>
									);
								})}
								{isCreateOrderWindowOpen && (
									<Window
										header="Создать заказ"
										onClose={() => setIsCreateOrderWindowOpen(false)}
									>
										<CreateOrder onSubmit={createOrderHandler} />
									</Window>
								)}
							</>
						)}
						{activeTab === "employees" && (
							<>
								<div className="AdminPanel-content-header">
									<Button
										text="Создать сотрудника"
										classes="_adminPanel"
										cb={() => setIsCreateEmployeeWindowOpen(true)}
									/>
									<div className="person">
										<div className="item name">№</div>
										<div className="item name">Имя сотрудника</div>
										<div className="item number">Позиция</div>
									</div>
								</div>
								{panelData.map((item, index) => {
									return (
										<div key={item + index} className="person">
											<div className="item name">{index + 1}</div>
											<div className="item name">{item.name}</div>
											<div className="item number">{item.position}</div>
										</div>
									);
								})}
								{isCreateEmployeeWindowOpen && (
									<Window
										header="Создать сотрудника"
										onClose={() => setIsCreateEmployeeWindowOpen(false)}
									>
										<CreateEmployee onSubmit={createEmployeeHandler} />
									</Window>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default connect(mapStateToProps)(AdminPanel);
