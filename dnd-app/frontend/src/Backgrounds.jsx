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

export function Backgrounds({data}) {
	return (
		<Container>
			<Row>
				<CardImg src="./icons/magicitems.png" />
				<Col>
					<Card className="info">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							<CardText>{data.type}</CardText>
							<CardText>{data.desc}</CardText>
							<hr />
							<CardText>
								<strong>Equipment:</strong>{" "}
								{data.equipment || "None"}
							</CardText>
							<Row>
								<Col>
									<CardText>
										<strong>Skill Proficiencies:</strong>{" "}
										{data.skill_proficiencies || "None"}
									</CardText>
								</Col>
								<Col>
									<CardText>
										<strong>Tool Proficiencies:</strong>{" "}
										{data.tool_proficiencies || "None"}
									</CardText>
								</Col>
								<Col>
									<CardText>
										<strong>Languages:</strong>{" "}
										{data.languages || "None"}
									</CardText>
								</Col>
							</Row>
							<hr />

							<CardText>
								<strong>{data.feature}:</strong>{" "}
								{data.feature_desc}
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
