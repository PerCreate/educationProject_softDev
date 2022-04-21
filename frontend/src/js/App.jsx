import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import Nav from "./shared/Nav";
import "./Root.scss";
import Home from "./page/Home";
import Footer from "./shared/Footer";
import { getURL } from "./Utils";
import { onCheckSession } from "./redux/actions";

axios.defaults.withCredentials = true;

const mapState = (state) => {
	return state;
};

const mapDispatch = {
	dispatchClientData: onCheckSession,
};

function App({ state, dispatchClientData }) {
	const [loading, setLoading] = useState(true);
	const URL = getURL();

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(URL + "/api/checkSession");
				const client = data.data.client;

				dispatchClientData({ email: client.email, isAdmin: client.isadmin });
				setLoading(false);
			} catch (error) {
				console.log("Error check session: ", error);
			}
		};
		getData();
	}, []);

	if (loading) return <div className=""></div>;

	return (
		!loading && (
			<Router>
				<div className="App container">
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
					<Footer />
				</div>
			</Router>
		)
	);
}

export default connect(mapState, mapDispatch)(App);
