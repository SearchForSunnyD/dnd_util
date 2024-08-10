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
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";
import DndApi from "../api";
import { Loading } from "../Loading";

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
				<Loading />
			) : (
					<Container>
						<Card className="info bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								<hr />
								<CardTitle tag="h5">Ability Scores:</CardTitle>
								<Row>
									{data.asi.map((item, index) => (
										<Col key={index}>
											<p>
												<strong>{item.attributes} </strong>+{item.value}
											</p>
										</Col>
									))}
								</Row>
								<hr />
								<Row className="text-capitalize">
									<Col>
										<strong>Size: </strong>
										{data.size_raw}
									</Col>
									<Col>
										<strong>Speed: </strong>
										{Object.keys(data.speed).map((speed, index) => (
											<span key={index}>
												{speed} {data.speed[speed]} ft.
											</span>
										))}
									</Col>
								</Row>
								<hr />
								<ReactMarkdown>{data.desc || ""}</ReactMarkdown>
								{data.asi_desc ? <ReactMarkdown>{data.asi_desc}</ReactMarkdown> : ""}
								{data.age ? <ReactMarkdown>{data.age}</ReactMarkdown> : ""}
								{data.alignment ? <ReactMarkdown>{data.alignment}</ReactMarkdown> : ""}
								{data.size ? <ReactMarkdown>{data.size}</ReactMarkdown> : ""}
								{data.speed_desc ? <ReactMarkdown>{data.speed_desc}</ReactMarkdown> : ""}
								<ReactMarkdown>{data.languages || "Languages: None"}</ReactMarkdown>
								{data.vision ? <ReactMarkdown>{data.vision}</ReactMarkdown> : ""}
								{data.traits ? <ReactMarkdown>{data.traits}</ReactMarkdown> : ""}
								{!data.subraces ? (
									<></>
								) : (
									<Accordion className="m-1" open={open} toggle={toggle}>
										{data.subraces.map((race) => {
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
										})}
									</Accordion>
								)}
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
