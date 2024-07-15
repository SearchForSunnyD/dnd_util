import {
	Badge,
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";
import { data, getDescription } from "./tools";

import("./assets/styles/Details.css");

export function SpellCard() {
	const badges = [];

	data.components.split(", ").map((c) => badges.push(c));

	return (
		<Container>
			<Row>
				<CardImg src="./icons/spells.png" />
				<Col>
					<Card className="info">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							<CardSubtitle>
								<small className="text-capitalize fst-italic">
									{data.school} {data.level}
								</small>
								{data.requires_verbal_components ? (
									<Badge pill className="m-1">
										Verbal
									</Badge>
								) : (
									<></>
								)}
								{data.requires_somatic_components ? (
									<Badge pill className="m-1">
										Somatic
									</Badge>
								) : (
									<></>
								)}
								{data.requires_material_components ? (
									<Badge pill className="m-1">
										Material
									</Badge>
								) : (
									<></>
								)}
								{data.can_be_cast_as_ritual ? (
									<>
										<Badge
											pill
											className="m-1"
											color="success"
										>
											Ritual
										</Badge>
									</>
								) : (
									<></>
								)}
								{data.requires_concentration ? (
									<Badge pill className="m-1" color="primary">
										Concentration
									</Badge>
								) : (
									<></>
								)}
							</CardSubtitle>
							<CardSubtitle>
								{data.spell_lists.map((b) => {
									return (
										<Badge
											className="text-capitalize"
											color="info"
											pill
											key={b}
										>
											{b}
										</Badge>
									);
								})}
							</CardSubtitle>
							<CardText>{getDescription(data)}</CardText>
							<Row className="fw-light">
								<Col>
									<strong>Range:</strong> {data.range}
								</Col>
								<Col>
									<strong>Duration:</strong> {data.duration}
								</Col>
								<Col>
									<strong>Casting Time:</strong>{" "}
									{data.casting_time}
								</Col>
							</Row>
							{data.higher_level !== "" ? (
								<>
									<hr />
									<CardText>
										<strong>Higher Level:</strong>{" "}
										{data.higher_level}
									</CardText>
								</>
							) : (
								<></>
							)}
							<hr />
							<ListGroup>
								<h5>Additional Info</h5>
								<ListGroupItem>
									<strong>Material Components:</strong>{" "}
									{(data.requires_material_components &&
										`${data.material}`) ||
										`None`}
								</ListGroupItem>
								<ListGroupItem>
									<strong>Source:</strong>{" "}
									<Badge pill color="warning">
										<a href={data.document__url}>
											{data.document__title}
										</a>
									</Badge>
								</ListGroupItem>
								<ListGroupItem>
									<strong>Classes:</strong> {data.dnd_class}
								</ListGroupItem>
								<ListGroupItem>
									<strong>Cast as ritual: </strong>
									{data.can_be_cast_as_ritual
										? "True"
										: "False"}
								</ListGroupItem>
							</ListGroup>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
