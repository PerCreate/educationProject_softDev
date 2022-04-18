import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Nav from "./shared/Nav";
import "./Root.scss";
import Home from "./page/Home";
import Footer from "./shared/Footer";

function App() {
	return (
		<Router>
			<div className="App container">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
