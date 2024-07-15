import { BrowserRouter } from "react-router-dom";
import { DataContextWrapper } from "./DataContextWrapper";
import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";
import {TestFile} from "./TestFile"

import "./assets/styles/App.css";

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
