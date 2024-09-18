import { useEffect, useState } from "react";
import { Badge, Card, CardBody, CardTitle, Container } from "reactstrap";
import DndApi from "./api";

import("./assets/styles/Details.css");

/**
 * Functional component for rendering a search card with data fetched from an external API.
 * @param {{data: object}} data - The data object containing information for the search card.
 * @returns JSX element representing the search card with the fetched information.
 */
export function SearchCard({ data }) {
	let [info, setInfo] = useState({});

	useEffect(() => {
		/**
		 * Fetches information from an external API using DndApi and sets the retrieved data as the component's info state.
		 * @returns None
		 */
		async function getInfo() {
			let res = await DndApi.getFromExternal(data);
			setInfo(res);
		}

		getInfo();
	}, [data]);

	return (
		<Container data={data.slug} className="p-3">
			<Card>
				<CardBody className="antique border rounded">
					<CardTitle tag="h2">
						<strong>{info.name}</strong>{" "}
					</CardTitle>
					<Badge pill className="mx-1">
						Tag: {data.type}
					</Badge>
					<Badge pill color="warning">
						<a href={info.document__url}>{info.document__title}</a>
					</Badge>
					<a href={`/${data.type}/${data.slug}`} className="stretched-link"></a>
				</CardBody>
			</Card>
		</Container>
	);
}
