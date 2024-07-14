import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
} from "reactstrap";
import { SuggestionDropdown } from "./SuggestionDropdown";

import "./assets/styles/NavBar.css";

export function NavBar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	return (
		<Navbar className="navbar fixed-top navbar-light" expand="md">
			<NavLink exact to="/" className="navbar-brand">
				<img src="/logo.png" alt="" />
			</NavLink>
			<SuggestionDropdown />
			<Nav className="mr-auto" fluid navbar>
				<Dropdown
					isOpen={dropdownOpen}
					toggle={toggle}
					direction="down"
				>
					<DropdownToggle color="none">
						<img src="/3-horizontal-lines.svg" alt="settings" />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Account</DropdownItem>
						<DropdownItem>
							<NavLink to="/">Login/Sign-up</NavLink>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
}
