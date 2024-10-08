import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { DataContext } from "../DataContextWrapper";

import "../assets/styles/Details.css";
import "../assets/styles/Profile.css";

/**
 * Functional component for handling login and signup functionality.
 * Uses context to access login and signup functions, and state to manage login and signup errors.
 * Navigates to different routes using the useNavigate hook.
 * @returns JSX element for login and signup form.
 */
export function LoginSignup() {
	const { login, signUp } = useContext(DataContext);
	const [loginError, setLoginError] = useState("");
	const [signupError, setSignupError] = useState("");
	const navigate = useNavigate();

	/**
	 * Handles the login process by preventing the default form submission behavior,
	 * extracting the username and password from the form fields, attempting to log in
	 * with the provided credentials, and navigating to the "/login" page upon successful login.
	 * If login fails, sets an error message and logs the error to the console.
	 * @param {Event} e - The event object triggered by the form submission.
	 * @returns {void}
	 */
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginError("");

		try {
			let username = e.target.username.value;
			let password = e.target.password.value;

			await login(username, password);

			navigate("/login");
		} catch (err) {
			setLoginError(
				"Login failed. Please check your username and password."
			);
			console.error("Login failed", err);
		}
	};

	/**
	 * Handles the signup process by preventing the default form submission behavior,
	 * extracting user input values, calling the signUp function with the extracted values,
	 * and navigating to the "/signup" route upon successful signup. If an error occurs during
	 * the signup process, it sets an error message and logs the error to the console.
	 * @param {Event} e - The event object triggered by the signup form submission.
	 * @returns {Promise<void>} - A promise that resolves once the signup process is completed.
	 */
	const handleSignup = async (e) => {
		e.preventDefault();
		setSignupError("");

		try {
			let email = e.target.email.value;
			let username = e.target.username.value;
			let password = e.target.password.value;
			let firstName = e.target.firstName.value;
			let lastName = e.target.lastName.value;

			await signUp(username, password, firstName, lastName, email);

			navigate("/signup");
		} catch (err) {
			setSignupError(
				"Sign up failed. Please check your details and try again."
			);
			console.error("Sign Up failed", err);
		}
	};

	return (
		<div className="row p-2 m-2 w-75 mx-auto">
			<Form
				className="col bisque rounded m-1 p-2"
				onSubmit={handleLogin}
			>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input
						id="username1"
						name="username"
						placeholder="Username"
						type="text"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						id="password1"
						name="password"
						placeholder="password123!"
						type="password"
					/>
				</FormGroup>
				<Button> Login </Button>
				{loginError && (
					<Alert className="mt-2" color="danger">
						{loginError}
					</Alert>
				)}
			</Form>
			<Form
				className="col bisque rounded m-1 p-2"
				onSubmit={handleSignup}
			>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						placeholder="email@example.com"
						type="email"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input
						id="username2"
						name="username"
						placeholder="Username"
						type="text"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						id="password2"
						name="password"
						placeholder="Password123!"
						type="password"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input
						id="firstName"
						name="firstName"
						placeholder="Albert"
						type="firstName"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input
						id="lastName"
						name="lastName"
						placeholder="O'Connel"
						type="lastName"
					/>
				</FormGroup>
				<Button> Sign Up </Button>
				{signupError && (
					<Alert className="mt-2" color="danger">
						{signupError}
					</Alert>
				)}
			</Form>
		</div>
	);
}
