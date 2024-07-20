import { Navigate, Route, Routes } from "react-router-dom";

import { UserRoutes } from "./UserRoutes";


export function RouteList() {
	return (
		<main>
			<Routes>
				{UserRoutes()}
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</main>
	);
}
