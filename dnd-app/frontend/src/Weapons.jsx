/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Badge,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";

import("./assets/styles/Details.css");

export function TestFile({ data }) {
	return (
		<Container>
			<Row>
				<CardImg src="./icons/weapons.png" />
				<Col>
					<Card className="info bisque">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							{data.category ? (
								<CardText>{data.category}</CardText>
							) : (
								""
							)}
							<Row>
								{data.cost ? (
									<Col>
										<strong>Price: </strong>
										{data.cost}
									</Col>
								) : (
									""
								)}
								{data.damage_dice ? (
									<Col>
										<strong>Damage: </strong>
										{data.damage_dice}{" "}
										<span className="text-capitalize">
											{data.damage_type}
										</span>
									</Col>
								) : (
									""
								)}
								{data.damage_type ? (
									<Col>
										<strong>Damage Type: </strong>
										{data.damage_type}
									</Col>
								) : (
									""
								)}
								{data.weight ? (
									<Col>
										<strong>Weight: </strong>
										{data.weight}
									</Col>
								) : (
									""
								)}
							</Row>
							<CardText className="border-dark">
								<strong>Properties: </strong>
								<ListGroup>
									{data.properties.map((item) => (
										<ListGroupItem
											key={item}
											className="text-capitalize antique"
										>
											{item}
										</ListGroupItem>
									)) || "None"}
								</ListGroup>
							</CardText>
							<CardText className="mt-3">
								<strong>Source:</strong>{" "}
								<Badge pill color="warning">
									<a href={data.document__url}>
										{data.document__title}
									</a>
								</Badge>
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
