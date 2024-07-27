import {
	Container,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
  Nav,
} from "reactstrap";

import "./assets/styles/SideBar.css";

export function SideBar() {
	return (
		<aside id="side-bar" className="">
			<Nav>
				<ListGroup className="">
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Classes</ListGroupItemHeading>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Monsters</ListGroupItemHeading>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Spells</ListGroupItemHeading>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Spell Lists</ListGroupItemHeading>
						<ListGroup>
							<ListGroupItem>Bard</ListGroupItem>
							<ListGroupItem>Cleric</ListGroupItem>
							<ListGroupItem>Druid</ListGroupItem>
							<ListGroupItem>Paladin</ListGroupItem>
							<ListGroupItem>Sorcerer</ListGroupItem>
							<ListGroupItem>Warlock</ListGroupItem>
							<ListGroupItem>Wizard</ListGroupItem>
						</ListGroup>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Sections</ListGroupItemHeading>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Feats</ListGroupItemHeading>
					</ListGroupItem>
					<ListGroupItem className="side-bar">
						<ListGroupItemHeading>Equipment</ListGroupItemHeading>
						<ListGroup>
							<ListGroupItem>Weapons</ListGroupItem>
							<ListGroupItem>Armor</ListGroupItem>
							<ListGroupItem>Magic Items</ListGroupItem>
						</ListGroup>
					</ListGroupItem>
				</ListGroup>
			</Nav>
		</aside>
	);
}
