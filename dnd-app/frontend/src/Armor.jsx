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

export function Armor() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "armor", slug });
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
					<CardImg src="/icons/armor.png" />
					<Col>
						<Card className="info bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								{data.category ? (
									<>
										<CardText>{data.category}</CardText>
										<CardText className="text-capitalize">
											{data.ac_string}
										</CardText>
									</>
								) : (
									""
								)}
								<Row>
									{data.cost ? (
										<Col>
											<strong>Price: </strong>
											{data.cost}
										</Col>
									) : (
										""
									)}
									<Col>
										<strong>Strength Requirement: </strong>
										{data.strength_requirement || "None"}
									</Col>
									<Col>
										<strong>Stealth Disadvantage: </strong>
										{data.stealth_disadvantage
											? "Yes"
											: "No"}
									</Col>
									{data.base_ac ? (
										<Col>
											<strong>Armor Class: </strong>
											{data.base_ac}
										</Col>
									) : (
										""
									)}
									{data.plus_max ? (
										<Col>
											<strong>Max Dex: </strong>
											{"+"}
											{data.plus_max}
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
