import { useEffect, useState } from "react";
import {
	Badge,
	Card,
	CardBody,
	CardImg,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";
import DndApi from "./api";

import("./assets/styles/Details.css");
import("./assets/styles/SearchCard.css");

export function SearchCard({ data }) {
	let [info, setInfo] = useState({});

	useEffect(() => {
		async function getInfo() {
			let res = await DndApi.getFromExternal(data);

			setInfo(res);
		}

		getInfo();
	}, [data]);

console.log(`${data.type}/${data.slug}`);

	return (
		<Container data={data.slug} className="p-4">
			<Row>
				<Col md="1">
					<CardImg className="search-img" src={`./icons/${data.type}.png`} />
				</Col>
				<Col md="11">
					<Card className="antique h-100">
						<CardBody>
							<CardTitle tag="h2">
								<strong>{info.name}</strong>{" "}
							</CardTitle>
							<Badge pill>Tag: {data.type}</Badge>
							<Badge pill color="warning">
								<a href={info.document__url}>
									{info.document__title}
								</a>
							</Badge>
							<a
								href={`/${data.type}/${data.slug}`}
								className="stretched-link"
							></a>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
