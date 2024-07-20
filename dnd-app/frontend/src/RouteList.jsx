import { Navigate, Route, Routes } from "react-router-dom";

import { UserRoutes } from "./UserRoutes";
import { DetailRoutes } from "./DetailRoutes";
import { SearchResult } from "./SearchResults";



export function RouteList() {
	return (
		<>
			<Routes>
				{UserRoutes()}
				{DetailRoutes()}
				<Route path="/*" element={<Navigate to="/" />} />
				<Route path="/search-results" element={<SearchResult />} />
			</Routes>
		</>
	);
}
