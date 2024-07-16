import { BrowserRouter } from "react-router-dom";
import { DataContextWrapper } from "./DataContextWrapper";
import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";
import { TestFile } from "./TestFile"

import "./assets/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
	return (
		<DataContextWrapper>
			<BrowserRouter>
				<NavBar />
				<RouteList />
				<TestFile />
			</BrowserRouter>
		</DataContextWrapper>
	);
}

export default App;
