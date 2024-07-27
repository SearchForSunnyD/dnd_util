import { useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	Nav,
	Navbar,
	NavLink,
	AccordionBody,
} from "reactstrap";

import "./assets/styles/SideBar.css";

export function SideBar() {
	const [open, setOpen] = useState("");
	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

	return (
		<Navbar id="side-bar">
			<Nav vertical>
				<Accordion flush open={open} toggle={toggle}>
					<AccordionItem>
						<AccordionHeader targetId="1">Classes</AccordionHeader>
						<AccordionBody accordionId="1">
							<NavLink>Barbarian</NavLink>
							<NavLink>Bard</NavLink>
							<NavLink>Cleric</NavLink>
							<NavLink>Druid</NavLink>
							<NavLink>Fighter</NavLink>
							<NavLink>Monk</NavLink>
							<NavLink>Paladin</NavLink>
							<NavLink>Ranger</NavLink>
							<NavLink>Rogue</NavLink>
							<NavLink>Sorcerer</NavLink>
							<NavLink>Warlock</NavLink>
							<NavLink>Wizard</NavLink>
						</AccordionBody>
					</AccordionItem>
					<AccordionItem>
						<NavLink>Monsters</NavLink>
					</AccordionItem>
					<AccordionItem>
						<NavLink>Spells</NavLink>
					</AccordionItem>
					<AccordionItem>
						<AccordionHeader targetId="4">
							Spell Lists
						</AccordionHeader>
						<AccordionBody accordionId="4">
							<NavLink>Bard</NavLink>
							<NavLink>Cleric</NavLink>
							<NavLink>Druid</NavLink>
							<NavLink>Paladin</NavLink>
							<NavLink>Sorcerer</NavLink>
							<NavLink>Warlock</NavLink>
							<NavLink>Wizard</NavLink>
						</AccordionBody>
					</AccordionItem>
					<AccordionItem>
						<AccordionHeader>Sections</AccordionHeader>
					</AccordionItem>
					<AccordionItem>
						<AccordionHeader>Feats</AccordionHeader>
					</AccordionItem>
					<AccordionItem>
						<AccordionHeader targetId="7">
							Equipment
						</AccordionHeader>
						<AccordionBody accordionId="7">
							<NavLink>Weapons</NavLink>
							<NavLink>Armor</NavLink>
							<NavLink>Magic Items</NavLink>
						</AccordionBody>
					</AccordionItem>
				</Accordion>
			</Nav>
		</Navbar>
	);
}
