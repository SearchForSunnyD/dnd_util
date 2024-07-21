import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { DataContext } from "../DataContextWrapper";

import DndApi from "../api";

/**
 * Functional component for the user profile page.
 * @returns JSX element for the user profile page with user information and options to edit or delete account.
 */
export function Profile() {
	const { user, updateUser } = useContext(DataContext);
	const currUser = user.user;

	const navigate = useNavigate();

	/**
	 * Handles the editing of user information based on the form input fields.
	 * @param {Event} e - The event object triggered by the form submission.
	 * @returns {Promise<void>} - A promise that resolves once the user information is updated.
	 */
	const handleEdit = async (e) => {
		e.preventDefault();

		try {
			const updatedFields = {
				email: e.target.email.value,
				firstName: e.target.firstName.value,
				lastName: e.target.lastName.value,
			};

			if (e.target.password.value !== "") {
				updatedFields.password = e.target.password.value;
			}

			await DndApi.patchUser(currUser.username, updatedFields);

			await updateUser();

			navigate("/");
		} catch (error) {
			console.error("Edit Failed", error);
		}
	};

	/**
	 * Asynchronously handles the deletion of a user account.
	 * Prompts the user for confirmation before deleting the account.
	 * If confirmed, makes a DELETE request to the DndApi to delete the user.
	 * Navigates to the "/logout" route after successful deletion.
	 * Logs any errors that occur during the deletion process.
	 * @returns None
	 */
	const handleDelete = async () => {
		try {
			if (
				window.confirm(
					"Are you sure you want to delete your account? This action cannot be undone."
				)
			) {
				await DndApi.deleteUser(currUser.username);
				navigate("/logout");
			}
		} catch (error) {
			console.error("Delete Failed", error);
		}
	};

	return (
		<Form
			className="col bg-dark text-light rounded m-1 p-2"
			onSubmit={handleEdit}
		>
			<FormGroup>
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					defaultValue={currUser.email}
					type="email"
				/>
			</FormGroup>
			<FormGroup>
				<Label for="password">Password</Label>
				<Input
					id="password"
					name="password"
					placeholder="Leave blank to keep current"
					type="password"
				/>
			</FormGroup>
			<FormGroup>
				<Label for="firstName">First Name</Label>
				<Input
					id="firstName"
					name="firstName"
					defaultValue={currUser.firstName}
					type="text"
				/>
			</FormGroup>
			<FormGroup>
				<Label for="lastName">Last Name</Label>
				<Input
					id="lastName"
					name="lastName"
					defaultValue={currUser.lastName}
					type="text"
				/>
			</FormGroup>
			<Button color="primary" className="m-2">
				Save Changes
			</Button>
			<Button color="danger" className="m-2" onClick={handleDelete}>
				Delete Account
			</Button>
		</Form>
	);
}
