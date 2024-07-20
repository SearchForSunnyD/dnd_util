import { Navigate, Route, Routes } from "react-router-dom";

import { DetailRoutes } from "./DetailRoutes";
import { Home } from "./Home";
import { SearchResult } from "./SearchResults";
import { UserRoutes } from "./UserRoutes";

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
