import { Route, Routes } from "react-router-dom";

import { NotFound } from "./404";
import { DetailRoutes } from "./DetailRoutes/DetailRoutes";
import { Home } from "./Home";
import { SearchResult } from "./SearchResults";
import { Test } from "./Test";
import { UserRoutes } from "./UserRoutes/UserRoutes";

/**
 * Component that defines the routes for the application.
 * @returns {JSX.Element} The JSX element representing the route list.
 */
export function RouteList() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Home />} />
				{UserRoutes()}
				{DetailRoutes()}
				<Route path="/search-results" element={<SearchResult />} />
				<Route path="/test" element={<Test />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</main>
	);
}
