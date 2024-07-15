import { Route, Routes, Navigate } from "react-router-dom";

import { LoginSignup } from "./LoginSignup";
import { Logout } from "./Logout";
import { Profile } from "./Profile";
import { PrivateRoute } from "./PrivateRoute";

export function RouteList() {
	return (
		<main>
			<Routes>
				<Route path="/login/signup" element={<LoginSignup />} />
				<Route
					path="/profile"
					element={<PrivateRoute element={<Profile />} />}
				/>
				<Route
					path="/logout"
					element={<PrivateRoute element={<Logout />} />}
				/>
				<Route path="/login" element={<Navigate to="/" />} />
				<Route path="/signup" element={<Navigate to="/" />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</main>
	);
}
