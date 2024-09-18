/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import remarkGfm from "remark-gfm";
import DndApi from "../api";
import { Loading } from "../Loading";

import("../assets/styles/Details.css");

/**
 * Component to display information about a specific race based on the slug parameter.
 * @returns {JSX.Element} A JSX element containing the information about the race.
 */
export function Classes() {
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
			let res = await DndApi.getFromExternal({ type: "classes", slug });
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
							<Markdown remarkPlugins={[remarkGfm]}>{data.table || ""}</Markdown>
							<hr />
							<Markdown>{data.desc || ""}</Markdown>
							<hr />
							<Accordion open={open} toggle={toggle}>
								{data.archetypes
									? data.archetypes.map((sub) => {
											return (
												<AccordionItem key={sub.name}>
													<AccordionHeader targetId={sub.name} tag="h3">
														{sub.name}
													</AccordionHeader>
													<AccordionBody accordionId={sub.name}>
														<Markdown remarkPlugins={[remarkGfm]}>{sub.desc}</Markdown>
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
				</Container>
			)}
		</Container>
	);
}
