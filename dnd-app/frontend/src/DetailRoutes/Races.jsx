/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
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
import DndApi from "../api";

import("../assets/styles/Details.css");

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

	const [open, setOpen] = useState("");
	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

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
					<Col className="col-2">
						<CardImg src="/icons/races.png" />
						<Card className="mt-2 info bisque p-4">
							<CardTitle tag="h5">Ability Score</CardTitle>
							<div>
								<Row>
									{data.asi.map((item, index) => (
										<Row key={index}>
											<div>
												<CardText>
													<strong>{item.attributes} </strong>
													{item.value}
												</CardText>
											</div>
										</Row>
									))}
								</Row>
							</div>
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
								<ReactMarkdown>{data.desc || ""}</ReactMarkdown>
								{data.asi_desc ? <ReactMarkdown>{data.asi_desc}</ReactMarkdown> : ""}
								{data.age ? <ReactMarkdown>{data.age}</ReactMarkdown> : ""}
								{data.alignment ? <ReactMarkdown>{data.alignment}</ReactMarkdown> : ""}
								{data.size ? <ReactMarkdown>{data.size}</ReactMarkdown> : ""}
								{data.speed_desc ? <ReactMarkdown>{data.speed_desc}</ReactMarkdown> : ""}
								<ReactMarkdown>{data.languages || "Languages: None"}</ReactMarkdown>
								{data.vision ? <ReactMarkdown>{data.vision}</ReactMarkdown> : ""}
								{data.traits ? <ReactMarkdown>{data.traits}</ReactMarkdown> : ""}
								<Accordion open={open} toggle={toggle}>
									{data.subraces
										? data.subraces.map((race) => {
												return (
													<AccordionItem key={race.name}>
														<AccordionHeader targetId={race.name} tag="h3">
															{race.name}
														</AccordionHeader>
														<AccordionBody accordionId={race.name}>
															<ReactMarkdown>{race.desc}</ReactMarkdown>
															{race.asi_desc ? <ReactMarkdown>{race.asi_desc}</ReactMarkdown> : ""}
															{race.age ? <ReactMarkdown>{race.age}</ReactMarkdown> : ""}
															{race.alignment ? <ReactMarkdown>{race.age}</ReactMarkdown> : ""}
															{race.size ? <ReactMarkdown>{race.age}</ReactMarkdown> : ""}
															{race.speed_desc ? <ReactMarkdown>{race.speed_desc}</ReactMarkdown> : ""}
															{race.languages ? <ReactMarkdown>{race.languages}</ReactMarkdown> : ""}
															{race.vision ? <ReactMarkdown>{race.vision}</ReactMarkdown> : ""}
															{race.traits ? <ReactMarkdown>{race.traits}</ReactMarkdown> : ""}
														</AccordionBody>
													</AccordionItem>
												);
										  })
										: ""}
								</Accordion>
								<CardText className="mt-3">
									<strong>Source:</strong>{" "}
									<Badge pill color="warning">
										<a href={data.document__url}>{data.document__title}</a>
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
