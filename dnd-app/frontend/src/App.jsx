import { BrowserRouter } from "react-router-dom";
import { DataContextWrapper } from "./DataContextWrapper";
import { NavBar } from "./NavBar";
import {TestFile} from "./TestFile"

import "./assets/styles/App.css";

function App() {
	return (
		<DataContextWrapper>
			<BrowserRouter>
        <NavBar />
        <TestFile />
			</BrowserRouter>
		</DataContextWrapper>
	);
}

export default App;
