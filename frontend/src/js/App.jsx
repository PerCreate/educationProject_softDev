import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Nav from "./shared/Nav";
import "./Root.scss";
import Home from "./page/Home";
import Footer from "./shared/Footer";
import { rootReducer } from "./redux/rootReducer";

const store = configureStore(rootReducer, composeWithDevTools());

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App container">
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
