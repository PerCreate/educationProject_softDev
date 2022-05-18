import axios from "axios";
import React, { Component, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button";
import { copyText, getURL } from "../../../Utils";
import CreateEmployee from "../../Windows/AdminPanel/CreateEmployee";
import CreateOrder from "../../Windows/AdminPanel/CreateOrder";
import CreateTeam from "../../Windows/AdminPanel/CreateTeam";
import TeamChange from "../../Windows/AdminPanel/TeamChange";
import Confirm from "../../Windows/Confirm/Confirm";
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
	const [isEditTeamWindowOpen, setIsEditTeamWindowOpen] = useState(false);
	const [isCreateEmployeeWindowOpen, setIsCreateEmployeeWindowOpen] = useState(false);
	const [isCreateOrderWindowOpen, setIsCreateOrderWindowOpen] = useState(false);
	const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);

	const [confirmFunction, setConfirmAction] = useState(null);
	const [editData, setEditData] = useState(null);

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
			const data1 = await axios.get(URL + "/api/getEmployees");
			setPanelData(data1.data.employees);
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
			const data1 = await axios.get(URL + "/api/getTeams");
			setPanelData(data1.data.teams);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const editTeamHandler = async (data) => {
		setLoading(true);

		try {
			await axios.post(URL + "/api/editTeam", data);
			setIsEditTeamWindowOpen(false);
			const data1 = await axios.get(URL + "/api/getTeams");
			setPanelData(data1.data.teams);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	// const deleteTeamHandler = async (id) => {
	// 	setIsConfirmWindowOpen(true);

	// 	const deleteCallback = async () => {
	// 		setLoading(true);

	// 		try {
	// 			await axios.post(URL + "/api/deleteTeam", { id });
	// 			setPanelData((prev) => prev.filter((team) => team.id !== id));
	// 			setIsConfirmWindowOpen(false);
	// 			const data = await axios.get(URL + "/api/getTeams");
	// 			setPanelData(data.data.teams);
	// 			setLoading(false);
	// 		} catch (e) {
	// 			console.log("Error: ", e.response.data.error);
	// 		}
	// 	};

	// 	setConfirmAction(() => deleteCallback);
	// };

	const createOrderHandler = async (data) => {
		setLoading(true);

		try {
			await axios.post(URL + "/api/createOrder", data);
			setIsCreateOrderWindowOpen(false);
			const data1 = await axios.get(URL + "/api/getOrders");
			setPanelData(data1.data.orders);
			setLoading(false);
		} catch (e) {
			console.log("Error: ", e.response.data.error);
		}
	};

	const deleteClientHandler = (id) => {
		setIsConfirmWindowOpen(true);

		const deleteCallback = async () => {
			setLoading(true);

			try {
				await axios.post(URL + "/api/deleteClient", { id });
				setPanelData((prev) => prev.filter((client) => client.id !== id));
				setIsConfirmWindowOpen(false);
				const data = await axios.get(URL + "/api/getClients");
				setPanelData(data.data.clients);
				setLoading(false);
			} catch (e) {
				console.log("Error: ", e.response.data.error);
			}
		};

		setConfirmAction(() => deleteCallback);
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
					{activeTab === "applications" && (
						<>
							<div className="AdminPanel-content-header">
								<div className="person header">
									<div className="item name">№</div>
									<div className="item name">Имя</div>
									<div className="item phone">Номер</div>
									<div className="item email">Почта</div>
									<div className="item comment">Комментарий</div>
									<div className="item service">Услуга</div>
								</div>
							</div>
							<div className="AdminPanel-content-body">
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
							</div>
						</>
					)}
					{activeTab === "clients" && (
						<>
							<div className="AdminPanel-content-header">
								<div className="person header">
									<div className="item name">№</div>
									<div className="item name">Имя</div>
									<div className="item phone">Номер</div>
									<div className="item email">Почта</div>
									<div className="item status">Статус</div>
									<div className="item isadmin">Является админом</div>
									{/* <div className="item _delete _empty"></div> */}
								</div>
							</div>
							<div className="AdminPanel-content-body">
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
											{/* {item.isadmin ? (
												<div
													className="item _delete _empty"
													title="Удалить"
												></div>
											) : (
												<div
													className="item _delete"
													title="Удалить"
													onClick={() => deleteClientHandler(item.id)}
												></div>
											)} */}
										</div>
									);
								})}
							</div>
							{isConfirmWindowOpen && (
								<Window
									header="Уверены, что хотите удалить клиента?"
									onClose={() => setIsConfirmWindowOpen(false)}
								>
									<Confirm
										text="Удалить"
										onSubmit={confirmFunction}
										onClose={() => setIsConfirmWindowOpen(false)}
									/>
								</Window>
							)}
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
								<div className="person header">
									<div className="item name">№</div>
									<div className="item name _default">Имя команды</div>
									<div className="item employees">Сотрудники</div>
									<div className="item orders">Текущий заказ</div>
									<div className="item orders">Выполненные заказы</div>
									<div className="item _edit _empty"></div>
								</div>
							</div>
							<div className="AdminPanel-content-body">
								{panelData.map((item, index) => {
									return (
										<div key={item + index + item.name} className="person">
											<div className="item number">{index + 1}</div>
											<div className="item name _default">{item.name}</div>
											<div
												className="item employees"
												title="Перейти"
												onClick={() => copyText(item.employees)}
											>
												{item.employees.map(({ label }) => (
													<div
														key={"employee" + label}
														className="employee"
													>
														{label}
													</div>
												))}
											</div>
											<div className="item orders">
												{item.currentOrder.linkdescription}
											</div>
											<div className="item orders">
												{/* {item.finishedOrder.linkdescription} */}
											</div>
											<div
												className="item _edit"
												title="Изменить"
												onClick={() => {
													setEditData({ id: item.id, name: item.name });
													setIsEditTeamWindowOpen(true);
												}}
											></div>
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
								{isEditTeamWindowOpen && (
									<Window
										header="Создать команду"
										onClose={() => setIsEditTeamWindowOpen(false)}
									>
										<TeamChange
											teamId={editData.id}
											teamName={editData.name}
											onSubmit={editTeamHandler}
										/>
									</Window>
								)}
								{isConfirmWindowOpen && (
									<Window
										header="Уверены, что хотите удалить команду?"
										onClose={() => setIsConfirmWindowOpen(false)}
									>
										<Confirm
											text="Удалить"
											onSubmit={confirmFunction}
											onClose={() => setIsConfirmWindowOpen(false)}
										/>
									</Window>
								)}
							</div>
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
								<div className="person header">
									<div className="item name">№</div>
									<div className="item name">Название проекта</div>
									<div className="item name">Стоимость</div>
									<div className="item name">Описание</div>
									<div className="item name">Команда</div>
									<div className="item name">Срок начала</div>
									<div className="item name">Срок окончания</div>
								</div>
							</div>
							<div className="AdminPanel-content-body">
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
											<div className="item name">{item.amount}</div>
											<a
												className="item name"
												title="Скопировать"
												href={item.linkdescription}
												target="_blank"
												rel="noreferrer"
											>
												{item.linkdescription}
											</a>
											<div className="item name">{item.teamName}</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.date_start)}
											>
												{item.date_start}
											</div>
											<div
												className="item name"
												title="Скопировать"
												onClick={() => copyText(item.date_finish)}
											>
												{item.date_finish}
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
							</div>
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
								<div className="person header">
									<div className="item name">№</div>
									<div className="item name">Имя сотрудника</div>
									<div className="item number">Позиция</div>
								</div>
							</div>
							<div className="AdminPanel-content-body">
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
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default connect(mapStateToProps)(AdminPanel);
