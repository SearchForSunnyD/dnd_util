import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Card, CardBody, CardText, CardTitle, Container, PopoverBody, PopoverHeader, Table, UncontrolledPopover } from "reactstrap";
import DndApi from "../api";
import { Loading } from "../Loading";

import("../assets/styles/Details.css");
import("../assets/styles/MagicItems.css");

/**
 * Component that displays magic items based on their rarity.
 * @returns JSX element displaying magic items based on rarity
 */
export function MagicItems() {
	const rarity = {
		common: "secondary",
		uncommon: "success",
		rare: "primary",
		"very rare": "danger",
		legendary: "warning",
		artifact: "info",
	};
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information from an external API using the DndApi utility.
		 * Sets loading state to true, then makes a request to retrieve magic items data based on the provided slug.
		 * Once the data is received, it sets the data state with the response and sets loading state to false.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({
				type: "magicitems",
				slug,
			});
			console.log(res);
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
					<Card className="bisque">
						<CardBody>
							<CardTitle tag="h1">
								{data.name}
								{"  "}
								<Badge className="text-capitalize btn fs-6" color={rarity[data.rarity.toLowerCase()]} pill id="rarity">
									{data.rarity}
								</Badge>
								<UncontrolledPopover target="rarity" offset={[80, 9]} placement="bottom" trigger="legacy">
									<PopoverHeader className="bisque">Item Rarity</PopoverHeader>
									<PopoverBody className="antique">
										<Table size="sm" className="tan border border-dark">
											<thead>
												<tr>
													<th>Rarity</th>
													<th>Level</th>
													<th>Value (GP)</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Common</td>
													<td>1+</td>
													<td>50-100</td>
												</tr>
												<tr>
													<td>Uncommon</td>
													<td>1+</td>
													<td>101-500</td>
												</tr>
												<tr>
													<td>Rare</td>
													<td>5+</td>
													<td>501-5,000</td>
												</tr>
												<tr>
													<td>Very Rare</td>
													<td>11+</td>
													<td>5,001-50,000</td>
												</tr>
												<tr>
													<td>Legendary</td>
													<td>17+</td>
													<td>50,001+</td>
												</tr>
											</tbody>
										</Table>
									</PopoverBody>
								</UncontrolledPopover>
							</CardTitle>
							<CardText>{data.type}</CardText>
							<hr />
							<CardText>{data.desc}</CardText>
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
