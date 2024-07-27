import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
} from "reactstrap";
import { DataContext } from "./DataContextWrapper";
import { SuggestionDropdown } from "./SuggestionDropdown";

import "./assets/styles/NavBar.css";

/**
 * Functional component for the navigation bar of the application.
 * It includes a logo, a suggestion dropdown, and an account dropdown menu.
 * @returns JSX element representing the navigation bar.
 */
export function NavBar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { user } = useContext(DataContext);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	return (
		<Navbar expand="md">
			<NavLink exact to="/" className="navbar-brand">
				<img src="/logo.png" alt="" />
			</NavLink>
			<SuggestionDropdown />
			<Nav className="mr-auto" fluid navbar>
				<Dropdown
					isOpen={dropdownOpen}
					toggle={toggle}
					direction="left"
					inNavbar
					nav
				>
					<DropdownToggle color="none">
						<img src="/3-horizontal-lines.svg" alt="settings" />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem className="m-2" header>
							Account
						</DropdownItem>
						{!user.isLoggedIn ? (
							<NavLink to="/login/signup">
								<DropdownItem>Login/Sign-up</DropdownItem>
							</NavLink>
						) : (
							<>
								<NavLink to="/profile">
									<DropdownItem>
										{user.user.username}
									</DropdownItem>
								</NavLink>
								<NavLink to="/logout">
									<DropdownItem>Logout</DropdownItem>
								</NavLink>
							</>
						)}
					</DropdownMenu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
}
