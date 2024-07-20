import { Navigate, Route, Routes } from "react-router-dom";

import { UserRoutes } from "./UserRoutes";
import { SearchResult } from "./SearchResults";


export function RouteList() {
	return (
		<main>
			<Routes>
				{UserRoutes()}
				<Route path="/*" element={<Navigate to="/" />} />
				<Route path="/search-results" element={<SearchResult />} />
			</Routes>
		</main>
	);
}
