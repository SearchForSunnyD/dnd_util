import { useEffect, useState } from "react";
import {
	Badge,
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardTitle,
	Spinner,
} from "reactstrap";
import DndApi from "./api";

import "./assets/styles/SearchCard.css";

/**
 * Functional component for displaying a search card with information fetched from an external API.
 * @param {{data}} data - The data object containing information to display on the card.
 * @returns JSX element representing the search card with title, description, and tag.
 */
export function SearchCard({ data }) {
	let [info, setInfo] = useState({});

	useEffect(() => {
  /**
   * Asynchronously fetches information from an external API using the DndApi class and sets the retrieved data as the component's info state.
   * @returns {Promise<void>}
   */
		async function getInfo() {
			let res = await DndApi.getFromExternal(data);

			setInfo(res);
		}

		getInfo();
	}, [data]);

	return (
		<Card className="search-card">
			<img
				src={`./icons/${data.type}.png`}
				height={"100px"}
				width={"100px"}
			/>
			<CardBody>
				<CardTitle>{data.name}</CardTitle>
				<CardText className="text-truncate">
					{info.desc ? info.desc : <Spinner size="sm" type="grow" />}
				</CardText>
				<CardSubtitle>
					<Badge>Tag: {data.type}</Badge>
				</CardSubtitle>
			</CardBody>
		</Card>
	);
}
