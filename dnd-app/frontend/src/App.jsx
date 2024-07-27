import { BrowserRouter } from "react-router-dom";
import { DataContextWrapper } from "./DataContextWrapper";
// import { Container } from "reactstrap";

import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";
// import { SideBar } from "./SideBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/styles/App.css";

/**
 * Function that represents the main component of the application.
 * It wraps the components with DataContextWrapper and BrowserRouter,
 * rendering NavBar and RouteList components.
 * @returns The JSX elements representing the main structure of the application.
 */
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
