import React, { useEffect, useState } from "react";
import DndApi from "./api";
import { useLocalStorage, useUser } from "./hooks";

export const DataContext = React.createContext();

export function DataContextWrapper({ children }) {
	const [searchSlugs, updateSearchSlugs] = useState([]);

	const [user, login, logout, signUp, autoLogin, updateUser] = useUser();
	const [userData] = useLocalStorage("userData");

	useEffect(() => {
		if (userData && userData.username && userData.token) {
			autoLogin(userData.username, userData.token);
		}
	}, []);

	useEffect(() => {
		async function getSearch() {
			const res = await DndApi.getSearchSlugs();

			updateSearchSlugs(res.results);
		}
		getSearch();
	}, []);

	return (
		<DataContext.Provider
			value={{
				user,
				login,
				logout,
				signUp,
				updateUser,
				searchSlugs,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
