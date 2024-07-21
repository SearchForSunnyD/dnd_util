/* eslint-disable no-mixed-spaces-and-tabs */
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
 * Component to display information about a specific race based on the slug parameter.
 * @returns {JSX.Element} A JSX element containing the information about the race.
 */
export function Races() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information about a specific race from an external API.
		 * Sets loading state to true before making the API call and sets it to false after receiving the response.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "races", slug });
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
					<Col>
						<CardImg src="/icons/races.png" />
						<Card className="mt-2 antique border-dark p-4">
							<CardTitle tag="h5">Ability Score</CardTitle>
							<CardText>
								<Row>
									{data.asi.map((item, index) => (
										<Col key={index}>
											<div>
												<CardText>
													{item.attributes}:{" "}
													{item.value}
												</CardText>
											</div>
										</Col>
									))}
								</Row>
							</CardText>
							<hr />
							<CardTitle tag="h5">Size</CardTitle>
							<CardText>{data.size_raw}</CardText>
							<hr />
							<CardTitle tag="h5">Speed</CardTitle>
							<CardText className="text-capitalize">
								{Object.keys(data.speed).map((speed, index) => (
									<p key={index}>
										{speed} {data.speed[speed]} ft.
									</p>
								))}
							</CardText>
						</Card>
					</Col>
					<Col>
						<Card className="info bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								<CardText>{data.desc || ""}</CardText>
								{data.asi_desc ? (
									<CardText>{data.asi_desc}</CardText>
								) : (
									""
								)}
								{data.age ? (
									<CardText>{data.age}</CardText>
								) : (
									""
								)}
								{data.alignment ? (
									<CardText>{data.alignment}</CardText>
								) : (
									""
								)}
								{data.size ? (
									<CardText>{data.size}</CardText>
								) : (
									""
								)}
								{data.speed_desc ? (
									<CardText>{data.speed_desc}</CardText>
								) : (
									""
								)}
								<CardText>
									{data.languages || "Languages: None"}
								</CardText>
								{data.vision ? (
									<CardText>{data.vision}</CardText>
								) : (
									""
								)}
								{data.traits ? (
									<CardText>{data.traits}</CardText>
								) : (
									""
								)}
								{data.subraces
									? data.subraces.map((race) => {
											const sRace = race;
											return (
												<Card
													className="p-2 mt-1 antique"
													key={race.name}
												>
													<CardTitle tag="h3">
														{sRace.name}
													</CardTitle>
													<CardText>
														{sRace.desc}
													</CardText>
													{sRace.asi_desc ? (
														<CardText>
															{sRace.asi_desc}
														</CardText>
													) : (
														""
													)}
													{sRace.age ? (
														<CardText>
															{sRace.age}
														</CardText>
													) : (
														""
													)}
													{sRace.alignment ? (
														<CardText>
															{sRace.age}
														</CardText>
													) : (
														""
													)}
													{sRace.size ? (
														<CardText>
															{sRace.age}
														</CardText>
													) : (
														""
													)}
													{sRace.speed_desc ? (
														<CardText>
															{sRace.speed_desc}
														</CardText>
													) : (
														""
													)}
													{sRace.languages ? (
														<CardText>
															{sRace.languages}
														</CardText>
													) : (
														""
													)}
													{sRace.vision ? (
														<CardText>
															{sRace.vision}
														</CardText>
													) : (
														""
													)}
													{sRace.traits ? (
														<CardText>
															{sRace.traits}
														</CardText>
													) : (
														""
													)}
												</Card>
											);
									  })
									: "B"}
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
