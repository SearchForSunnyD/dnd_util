import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContextWrapper";

/**
 * Functional component that logs out the user and navigates to the home page.
 * @returns {JSX.Element} A div element.
 */
export function Logout() {
	const { logout } = useContext(DataContext);
	const navigate = useNavigate();

	useEffect(() => {
		logout();
		navigate("/");
	}, [logout, navigate]);

	return <div></div>;
}
