import { Navigate, Route } from "react-router-dom";

import { LoginSignup } from "./LoginSignup";
import { Logout } from "./Logout";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "./Profile";

export function UserRoutes() {
	return (
		<>
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
		</>
	);
}
