import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContextWrapper";

export function Logout() {
	const { logout } = useContext(DataContext);
	const navigate = useNavigate();

	useEffect(() => {
		logout();
		navigate("/");
	}, [logout, navigate]);

	return <div></div>;
}
