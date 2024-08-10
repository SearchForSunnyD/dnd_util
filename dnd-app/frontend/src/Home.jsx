import {
	Badge,
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardTitle,
	Container,
	ListGroup,
	ListGroupItem,
} from "reactstrap";

import("./assets/styles/Details.css");

/**
 * Functional component for the Home page of a Dungeons and Dragons Companion app.
 * Displays a welcome message and some introductory text.
 * @returns JSX element containing the Home page content.
 */
export function Home() {
	return (
		<Container>
			<Card>
				<CardBody className="bisque">
					<CardTitle tag="h2" className="text-center">
						Welcome to Arcane Atlas
					</CardTitle>
					<br />
					<CardSubtitle>
						Adventurers, gather &apos;round and make yourselves at
						home! Whether you&apos;re a seasoned dungeon crawler or
						a fresh-faced hero, our site is here to enhance your
						Dungeons & Dragons experience. Utilizing the robust
						Open5e compendium API, we provide you with a wealth of
						knowledge at your fingertips.
					</CardSubtitle>
					<hr />
					<ListGroup>
						<CardText>
							<strong>Current Features:</strong>
						</CardText>
						<ListGroupItem>
							Access to a comprehensive compendium with
							information on spells, monsters, items, and more via{" "}
							<Badge pill color="warning">
								<a href="https://open5e.com/">Open5e</a>
							</Badge>{" "}
							API
						</ListGroupItem>
						<ListGroupItem>
							Autofill highlight suggestion bar to quickly find
							what you need.
						</ListGroupItem>
					</ListGroup>
					<ListGroup>
						<CardText>
							<strong>Upcoming Features:</strong>
						</CardText>
						<ListGroupItem>
							A user-friendly character sheet manager to keep
							track of your heroes&apos; stats, inventory, and
							progress.
						</ListGroupItem>
						<ListGroupItem>
							Filterable list pages for weapons, armor, magic
							items, and spells.
						</ListGroupItem>
						<ListGroupItem>
							Comprehensive list pages for races, monsters, feats,
							and backgrounds.
						</ListGroupItem>
						<ListGroupItem>
							Bookmark your favorite pages for easy access.
						</ListGroupItem>
					</ListGroup>
					<hr />
					<CardText>
						As our site is a work in progress, we appreciate your
						patience and feedback. Stay tuned for exciting updates
						and enhancements. Your adventure starts here!
					</CardText>
					<CardText className="text-center">
						May your rolls be ever in your favor!
					</CardText>
				</CardBody>
			</Card>
		</Container>
	);
}
