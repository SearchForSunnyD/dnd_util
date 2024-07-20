import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { SearchCard } from "./SearchCard";
import { SuggestionDropdown } from "./SuggestionDropdown";
import DndApi from "./api";

export function SearchResult() {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");
	const [currentNode, setCurrentNode] = useState(null);
	const [list, setList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getPaginatedSearchSlugs(query);
			setCurrentNode(res.head);
			setList(res);
			setLoading(false);
		}

		getInfo();
	}, [query]);

	const renderSearchCards = () => {
		if (!list || !list.head)
			return (
				<Container className="m-4">
					<h4 className="text-center">No results found</h4>
				</Container>
			);
		return currentNode.data.map((item) => (
			<SearchCard key={item.slug} data={item} />
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

	window.scrollTo(0, 0);

	return (
		<>
			<Container className="antique rounded border-dark p-3 mb-3">
				<SuggestionDropdown />
			</Container>
			<Container className="bisque rounded border-dark">
				{loading ? (
					<Spinner />
				) : (
					<>
						<Row>{renderSearchCards()}</Row>
						<Row className="m-3">
							<Col md="1">
								<Button
									onClick={handlePrevPage}
									disabled={!currentNode?.prev}
									className="m-2"
								>
									Previous
								</Button>
							</Col>
							<Col md="10"></Col>
							<Col md="1">
								<Button
									onClick={handleNextPage}
									disabled={!currentNode?.next}
									className="m-2"
								>
									Next
								</Button>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</>
	);
}
