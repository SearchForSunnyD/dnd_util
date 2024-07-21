import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
	Spinner,
} from "reactstrap";
import DndApi from "./api";

import("./assets/styles/Details.css");

/**
 * Functional component for rendering a basic card based on the provided type.
 * @param {{string}} type - The type of card to render.
 * @returns JSX element representing the basic card.
 */
export function BasicCard({ type }) {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information from an external API using the provided type and slug,
		 * then sets the data state with the response and updates the loading state accordingly.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type, slug });
			setData(res);
			setLoading(false);
		}
		getInfo();
	}, [slug, type]);

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
					<CardImg src={`/icons/${type}.png`} />
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
			)}
		</Container>
	);
}
