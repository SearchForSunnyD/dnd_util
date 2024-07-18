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
import { stripMarkdownFromObject } from "./tools";

import("./assets/styles/Details.css");

export function Races({data}) {
	const clean = stripMarkdownFromObject(data);

	return (
		<Container>
			<Row>
				<Col>
					<CardImg src="./icons/races.png" />
					<Card className="mt-2 antique border-dark p-4">
						<CardTitle tag="h5">Ability Score</CardTitle>
						<CardText>
							<Row>
								{clean.asi.map((item, index) => (
									<Col key={index}>
										<div>
											<CardText>
												{item.attributes}: {item.value}
											</CardText>
										</div>
									</Col>
								))}
							</Row>
						</CardText>
						<hr />
						<CardTitle tag="h5">Size</CardTitle>
						<CardText>{clean.size_raw}</CardText>
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
							<CardTitle tag="h1">{clean.name}</CardTitle>
							<CardText>{clean.desc || ""}</CardText>
							{clean.asi_desc ? (
								<CardText>{clean.asi_desc}</CardText>
							) : (
								""
							)}
							{clean.age ? <CardText>{clean.age}</CardText> : ""}
							{clean.alignment ? (
								<CardText>{clean.alignment}</CardText>
							) : (
								""
							)}
							{clean.size ? (
								<CardText>{clean.size}</CardText>
							) : (
								""
							)}
							{clean.speed_desc ? (
								<CardText>{clean.speed_desc}</CardText>
							) : (
								""
							)}
							<CardText>
								{clean.languages || "Languages: None"}
							</CardText>
							{clean.vision ? (
								<CardText>{clean.vision}</CardText>
							) : (
								""
							)}
							{clean.traits ? (
								<CardText>{clean.traits}</CardText>
							) : (
								""
							)}
							{clean.subraces
								? clean.subraces.map((race) => {
										const sRace =
											stripMarkdownFromObject(race);
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
									<a href={clean.document__url}>
										{clean.document__title}
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
