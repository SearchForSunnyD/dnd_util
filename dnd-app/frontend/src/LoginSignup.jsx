import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { DataContext } from "./DataContextWrapper";

export function LoginSignup() {
	const { login, signUp } = useContext(DataContext);
	const [loginError, setLoginError] = useState("");
	const [signupError, setSignupError] = useState("");
	const navigate = useNavigate();

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
		<div className="row p-2 m-2">
			<Form
				className="col bg-dark text-light rounded m-1 p-2"
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
				className="col bg-dark text-light rounded m-1 p-2"
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
