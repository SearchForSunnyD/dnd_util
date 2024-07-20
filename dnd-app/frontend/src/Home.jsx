import {
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardTitle,
	Container,
	ListGroup,
	ListGroupItem,
	Badge,
} from "reactstrap";

import("./assets/styles/Details.css");

export function Home() {
	return (
		<Container>
			<Card>
				<CardBody className="bisque">
					<CardTitle tag='h2'>Welcome to a Dungeons and Dragons Companion</CardTitle>
					<CardSubtitle>
						Adventurers, gather `round and make yourselves at home!
						Whether you`re a seasoned dungeon crawler or a
						fresh-faced hero, our site is here to enhance your
						Dungeons & Dragons experience. Utilizing the robust
						Open5e compendium API, we provide you with a wealth of
						knowledge at your fingertips.
					</CardSubtitle>
					<ListGroup>
						<CardText>
							<strong>Current Features</strong>
						</CardText>
						<ListGroupItem>
							Access to a comprehensive compendium with
							information on spells, monsters, items, and more via{" "}
							<Badge pill color="warning">
								<a href="https://open5e.com/">Open5e</a>
							</Badge>
						</ListGroupItem>
					</ListGroup>
					<ListGroup>
						<CardText>
							<strong>Upcoming Features</strong>
						</CardText>
						<ListGroupItem>
							A user-friendly character sheet manager to keep
							track of your heroes` stats, inventory, and
							progress.
						</ListGroupItem>
					</ListGroup>
					<CardText>
						As our site is a work in progress, we appreciate your
						patience and feedback. Stay tuned for exciting updates
						and enhancements. Your adventure starts here!
					</CardText>
					<CardText>May your rolls be ever in your favor!</CardText>
				</CardBody>
			</Card>
		</Container>
	);
}
