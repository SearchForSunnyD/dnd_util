/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Card, CardBody, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import DndApi from "../api";
import { Loading } from "../Loading";

import("../assets/styles/Details.css");

/**
 * Component to display armor information based on the slug parameter.
 * @returns {JSX.Element} Armor component with armor information.
 */
export function Armor() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information about armor from an external API using the provided slug.
		 * Sets loading state to true before making the API call and sets it to false after receiving the response.
		 * @returns {Promise<void>} A promise that resolves once the API call is complete.
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "armor", slug });
			setData(res);
			setLoading(false);
		}
		getInfo();
	}, [slug]);

	return (
		<Container>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Card className="info bisque">
						<CardBody>
							<CardTitle tag="h1">{data.name}</CardTitle>
							{data.category ? (
								<>
									<CardText>{data.category}</CardText>
									<CardText className="text-capitalize">{data.ac_string}</CardText>
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
