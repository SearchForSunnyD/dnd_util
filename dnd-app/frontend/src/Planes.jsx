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

export function Planes({data}) {
	return (
		<Container>
			<Row>
				<CardImg src="./icons/planes.png" />
				<Col>
					<Card className="info">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							<CardText>{data.type}</CardText>
							<CardText>{data.desc}</CardText>
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
