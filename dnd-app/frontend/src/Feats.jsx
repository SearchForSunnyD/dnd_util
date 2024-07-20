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

import("./assets/styles/Details.css");

export function Feats({data}) {
	return (
		<Container>
			<Row>
				<CardImg src="./icons/feats.png" />
				<Col>
					<Card className="info bisque">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							<CardSubtitle>
								<strong>{data.prerequisite}</strong>
							</CardSubtitle>
							<hr />
							<CardText>{data.desc}</CardText>
							<ListGroup numbered flush className="fw-lighter">
								{data.effects_desc.map((effect, index) => (
									<ListGroupItem
										className="small"
										key={index}
									>
										{effect}
									</ListGroupItem>
								))}
							</ListGroup>
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
