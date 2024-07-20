import { BrowserRouter } from "react-router-dom";
import { DataContextWrapper } from "./DataContextWrapper";
import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/styles/App.css";

function App() {
	return (
		<DataContextWrapper>
			<BrowserRouter>
				<NavBar />
				<RouteList />
			</BrowserRouter>
		</DataContextWrapper>
	);
}

export default App;
