import { useEffect, useState } from "react";
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
import DndApi from "./api";

import("./assets/styles/Details.css");

export function SearchCard({ data }) {
	let [info, setInfo] = useState({});

	useEffect(() => {
		async function getInfo() {
			let res = await DndApi.getFromExternal(data);

			setInfo(res);
		}

		getInfo();
	}, [data]);

	console.log(info);

	return (
		<Container data={info.slug} className="p-4">
			<Row>
				<Col md="2">
					<CardImg src={`./icons/${data.type}.png`} />
				</Col>
				<Col md="10">
					<Card className="antique h-100">
						<CardBody>
							<CardTitle tag="h2">
								<strong>{info.name}</strong>{" "}
							</CardTitle>
							<Badge pill>
								Tag: {data.type}
							</Badge>
							<CardText className="text-truncate">
								<h5>Description: </h5>
								{info.desc ? info.desc : "None"}
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
