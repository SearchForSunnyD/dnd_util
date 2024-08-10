import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import DndApi from "./api";
import { Loading } from "./Loading";
import { SearchCard } from "./SearchCard";
import { SuggestionDropdown } from "./SuggestionDropdown";

/**
 * Functional component that displays search results based on the query parameter in the URL.
 * Uses React hooks to manage state and side effects.
 * @returns JSX element displaying search results.
 */
export function SearchResult() {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");
	const [currentNode, setCurrentNode] = useState(null);
	const [list, setList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		/**
		 * Asynchronously fetches information from the DndApi based on the provided query,
		 * updates the state variables with the fetched data, and sets the loading state accordingly.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getPaginatedSearchSlugs(query);
			setCurrentNode(res.head);
			setList(res);
			setLoading(false);
		}

		getInfo();
	}, [query]);

	/**
	 * Renders search cards based on the data in the currentNode.
	 * If no data is available, it displays a message indicating no results found.
	 * @returns JSX elements representing the search cards or a message if no results are found.
	 */
	const renderSearchCards = () => {
		if (!list || !list.head)
			return (
				<Container className="m-4">
					<h4 className="text-center">No results found</h4>
				</Container>
			);
		return currentNode.data.map((item) => <SearchCard key={item.slug} data={item} />);
	};

	/**
	 * Handles the action of navigating to the previous page in a linked list structure.
	 * If the current node has a previous node, sets the current node to be the previous node.
	 * @returns None
	 */
	const handlePrevPage = () => {
		if (currentNode && currentNode.prev) {
			setCurrentNode(currentNode.prev);
		}
	};

	/**
	 * Handles moving to the next page in a navigation sequence.
	 * If the current node has a next node, it sets the current node to the next node.
	 * @returns None
	 */
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
				{list ? (
					<Row>
						<small className="text-muted my-1 fst-italic">
							Found {list.results || 0} results. Showing results {currentNode.index * 10 + 1} to{" "}
							{currentNode.index * 10 + 1 + currentNode.data.length}{" "}
						</small>
					</Row>
				) : (
					""
				)}
			</Container>
			<Container className="bisque rounded border-dark">
				{loading ? (
					<Loading />
				) : (
					<>
						<Row>{renderSearchCards()}</Row>
						<Container fluid className="d-flex justify-content-between">
							<Button onClick={handlePrevPage} disabled={!currentNode?.prev} className="m-2">
								Previous
							</Button>
							<Button onClick={handleNextPage} disabled={!currentNode?.next} className="m-2">
								Next
							</Button>
						</Container>
					</>
				)}
			</Container>
		</>
	);
}
