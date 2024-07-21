import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "./DataContextWrapper";

/**
 * A private route component that checks if the user is logged in.
 * If the user is logged in, it renders the element passed as a prop,
 * otherwise it redirects to the home page.
 * @param {{element}} element - The element to render if the user is logged in.
 * @returns The element if the user is logged in, otherwise a redirect to the home page.
 */
export function PrivateRoute({ element }) {
	const { user } = useContext(DataContext);

	return user.isLoggedIn ? element : <Navigate to="/" />;
}
