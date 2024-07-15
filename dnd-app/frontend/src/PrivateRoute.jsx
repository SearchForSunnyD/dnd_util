import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "./DataContextWrapper";

export function PrivateRoute({ element }) {
	const { user } = useContext(DataContext);

	return user.isLoggedIn ? element : <Navigate to="/" />;
}
