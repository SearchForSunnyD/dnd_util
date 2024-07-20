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
	Row,
} from "reactstrap";

import("./assets/styles/Details.css");

export function TestFile({ data }) {
	return (
		<Container>
			<Row>
				<CardImg src="./icons/armor.png" />
				<Col>
					<Card className="info bisque">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							{data.category ? (
								<>
									<CardText>{data.category}</CardText>
									<CardText className="text-capitalize">
										{data.ac_string}
									</CardText>
								</>
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
								<Col>
									<strong>Strength Requirement: </strong>
									{data.strength_requirement || "None"}
								</Col>
								<Col>
									<strong>Stealth Disadvantage: </strong>
									{data.stealth_disadvantage ? "Yes" : "No"}
								</Col>
								{data.base_ac ? (
									<Col>
										<strong>Armor Class: </strong>
										{data.base_ac}
									</Col>
								) : (
									""
								)}
								{data.plus_max ? (
									<Col>
										<strong>Max Dex: </strong>
										{"+"}
										{data.plus_max}
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
