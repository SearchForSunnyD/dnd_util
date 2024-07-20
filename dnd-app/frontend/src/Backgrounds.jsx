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

export function Backgrounds() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({
				type: "backgrounds",
				slug,
			});
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
					<CardImg src="/icons/backgrounds.png" />
					<Col>
						<Card className="bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								<CardText>{data.type}</CardText>
								<CardText>{data.desc}</CardText>
								<hr />
								<CardText>
									<strong>Equipment:</strong>{" "}
									{data.equipment || "None"}
								</CardText>
								<Row>
									<Col>
										<CardText>
											<strong>
												Skill Proficiencies:
											</strong>{" "}
											{data.skill_proficiencies || "None"}
										</CardText>
									</Col>
									<Col>
										<CardText>
											<strong>Tool Proficiencies:</strong>{" "}
											{data.tool_proficiencies || "None"}
										</CardText>
									</Col>
									<Col>
										<CardText>
											<strong>Languages:</strong>{" "}
											{data.languages || "None"}
										</CardText>
									</Col>
								</Row>
								<hr />

								<CardText>
									<strong>{data.feature}:</strong>{" "}
									{data.feature_desc}
								</CardText>
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
