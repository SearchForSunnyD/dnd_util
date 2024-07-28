import { Navigate, Route } from "react-router-dom";

import { PrivateRoute } from "../PrivateRoute";
import { LoginSignup } from "./LoginSignup";
import { Logout } from "./Logout";
import { Profile } from "./Profile";

/**
 * Defines the routes available to the user in the application.
 * @returns JSX element containing the routes for login, profile, logout, login/signup, and signup.
 */
export function UserRoutes() {
	return (
		<>
			<Route path="/login/signup" element={<LoginSignup />} />
			<Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
			<Route path="/logout" element={<PrivateRoute element={<Logout />} />} />
			<Route path="/login" element={<Navigate to="/" />} />
			<Route path="/signup" element={<Navigate to="/" />} />
		</>
	);
}
