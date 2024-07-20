import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
	Spinner,
} from "reactstrap";
import DndApi from "./api";

import("./assets/styles/Details.css");

export function Feats() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "feats", slug });
			setData(res);
			setLoading(false);
		}
		getInfo();
	}, [slug]);

	return (
		<Container>
			{loading ? (
				<Container fluid className="mx-auto">
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
				</Container>
			) : (
				<Row>
					<CardImg src="/icons/feats.png" />
					<Col>
						<Card className="info bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								<CardSubtitle>
									<strong>{data.prerequisite}</strong>
								</CardSubtitle>
								<hr />
								<CardText>{data.desc}</CardText>
								<ListGroup
									numbered
									flush
									className="fw-lighter border"
								>
									{data.effects_desc.map((effect, index) => (
										<ListGroupItem key={index}>
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
			)}
		</Container>
	);
}
