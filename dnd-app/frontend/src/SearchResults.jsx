import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Button, Container, Row, Col } from "reactstrap";
import { SearchCard } from "./SearchCard";
import DndApi from "./api";

export function SearchResult() {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");
	const [info, setInfo] = useState(null);
	const [currentNode, setCurrentNode] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getPaginatedSearchSlugs(query);
			setInfo(res);
			setCurrentNode(res.head); // Set the current node to the head of the linked list
			setLoading(false);
		}

		getInfo();
	}, [query]);

	const renderSearchCards = () => {
		if (!currentNode || !currentNode.data) return null;
		return currentNode.data.map((item, index) => (
			<SearchCard key={index} data={item} />
		));
	};

	const handlePrevPage = () => {
		if (currentNode && currentNode.prev) {
			setCurrentNode(currentNode.prev);
		}
	};

	const handleNextPage = () => {
		if (currentNode && currentNode.next) {
			setCurrentNode(currentNode.next);
		}
	};

	return (
		<Container className="bisque rounded border-dark">
			{loading ? (
				<Spinner />
			) : (
				<>
					<Row>{renderSearchCards()}</Row>
					<Row className="mt-3">
						<Col>
							<Button
								color="primary"
								onClick={handlePrevPage}
								disabled={!currentNode?.prev}
							>
								Previous
							</Button>
						</Col>
						<Col className="text-right">
							<Button
								color="primary"
								onClick={handleNextPage}
								disabled={!currentNode?.next}
							>
								Next
							</Button>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
}
