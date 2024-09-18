import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Badge, Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import DndApi from "../api";
import { Loading } from "../Loading";

import("../assets/styles/Details.css");

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
				<Loading />
			) : (
				<Container>
					<Card className="info">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							<CardText>{data.type}</CardText>
							<ReactMarkdown>{data.desc}</ReactMarkdown>
							<CardText className="mt-3">
								<strong>Source:</strong>{" "}
								<Badge pill color="warning">
									<a href={data.document__url}>{data.document__title}</a>
								</Badge>
							</CardText>
						</CardBody>
					</Card>
				</Container>
			)}
		</Container>
	);
}
