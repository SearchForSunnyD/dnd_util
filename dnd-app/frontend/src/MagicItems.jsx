import {
	Badge,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Container,
	PopoverBody,
	PopoverHeader,
	Row,
	Table,
	UncontrolledPopover,
} from "reactstrap";

import("./assets/styles/Details.css");

export function MagicItems({ data }) {
	const rarity = {
		common: "secondary",
		uncommon: "success",
		rare: "primary",
		"very rare": "danger",
		legendary: "warning",
		artifact: "info",
	};

	return (
		<Container>
			<Row>
				<CardImg src="./icons/magicitems.png" />
				<Col>
					<Card className="info">
						<CardBody>
							<CardTitle tag="h1">
								{data.name}
								{"  "}
								<Badge
									className="text-capitalize btn fs-6"
									color={rarity[data.rarity.toLowerCase()]}
									pill
									id="rarity"
								>
									{data.rarity}
								</Badge>
								<UncontrolledPopover
									target="rarity"
									className="bg-dark"
									offset={[80, 9]}
									placement="bottom"
								>
									<PopoverHeader>Item Rarity</PopoverHeader>
									<PopoverBody>
										<Table size="sm">
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
									<a href={data.document__url}>
										{data.document__title}
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
