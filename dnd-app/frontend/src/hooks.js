import { useState } from "react";
import DndApi from "./api";

const useToggleState = (initialState = true) => {
	const [state, setState] = useState(initialState);
	const toggleState = () => {
		setState((state) => !state);
	};
	return [state, toggleState];
};

const useLocalStorage = (key, initialValue = null) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = JSON.parse(localStorage.getItem(key));
			return item ? item : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	};

	const removeItem = () => {
		try {
			localStorage.removeItem(key);
			setStoredValue(null);
		} catch (error) {
			console.error(`Error removing localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue, removeItem];
};

const useUser = () => {
	const [currUser, setCurrUser] = useState({ isLoggedIn: false });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userData, setUserData, removeUserData] = useLocalStorage("userData");

	const login = async (username, password) => {
		setLoading(true);
		setError(null);
		try {
			let token = await DndApi.authenticateUser(username, password);

			DndApi.token = token;

			let user = await DndApi.getUser(username);

			setCurrUser({
				token,
				isLoggedIn: true,
				...user,
			});

			setUserData({ username, token });
		} catch (err) {
			setError("Login failed. Please check your credentials.");
			console.error("Login error", err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const autoLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			const { username, token } = userData;

			DndApi.token = token;

			let user = await DndApi.getUser(username);

			setCurrUser({
				token,
				isLoggedIn: true,
				...user,
			});
			null;
		} catch (err) {
			setError("Login failed. Please check your credentials.");
			console.error("Login error", err);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setCurrUser({ isLoggedIn: false });

		removeUserData();
	};

	const signUp = async (username, password, firstName, lastName, email) => {
		setLoading(true);
		setError(null);
		try {
			let token = await DndApi.registerUser({
				username,
				password,
				firstName,
				lastName,
				email,
			});

			DndApi.token = token;

			let user = await DndApi.getUser(username);

			setCurrUser({
				token,
				isLoggedIn: true,
				...user,
			});
		} catch (err) {
			setError("Sign up failed. Please try again.");
			console.error("Sign Up error", err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async () => {
		const username = currUser.user.username;
		const user = await DndApi.getUser(username);

		setCurrUser({
			token: currUser.token,
			isLoggedIn: true,
			...user,
		});
	};

	return [
		currUser,
		login,
		logout,
		signUp,
		autoLogin,
		updateUser,
		loading,
		error,
	];
};

export { useLocalStorage, useToggleState, useUser };
