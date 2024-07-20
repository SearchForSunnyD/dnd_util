import { Navigate, Route, Routes } from "react-router-dom";

import { UserRoutes } from "./UserRoutes";
import { DetailRoutes } from "./DetailRoutes";
import { SearchResult } from "./SearchResults";
import { Home } from "./Home";



export function RouteList() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				{UserRoutes()}
				{DetailRoutes()}
				<Route path="/*" element={<Navigate to="/" />} />
				<Route path="/search-results" element={<SearchResult />} />
			</Routes>
		</>
	);
}
