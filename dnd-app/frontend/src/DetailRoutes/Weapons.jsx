/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Badge, Card, CardBody, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import DndApi from "../api";
import { Loading } from "../Loading";

import("../assets/styles/Details.css");

/**
 * Functional component that displays information about a weapon.
 * @param {{data}} data - The data object containing information about the weapon.
 * @returns JSX element displaying the weapon information.
 */
export function Weapons() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information about a specific weapon from an external API.
		 * Sets loading state to true before making the API call and sets it to false after receiving the response.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "weapons", slug });
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
							{data.category ? <ReactMarkdown>{data.category}</ReactMarkdown> : ""}
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
										{data.damage_dice} <span className="text-capitalize">{data.damage_type}</span>
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
										<ListGroupItem key={item} className="text-capitalize antique">
											{item}
										</ListGroupItem>
									)) || "None"}
								</ListGroup>
							</CardText>
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
