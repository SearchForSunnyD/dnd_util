import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Col,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	InputGroup,
	Row,
} from "reactstrap";
import DndApi from "./api";

import "./assets/styles/SuggestionDropdown.css";

/**
 * SuggestionDropdown component that displays a dropdown menu with search results.
 * @returns None
 */
export function SuggestionDropdown() {
	const [query, setQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		/**
		 * Retrieves filtered search results from the DndApi based on the provided query.
		 * If a query is provided, it fetches the filtered search slugs from the DndApi,
		 * sets the filtered results state, and toggles the dropdown open state based on the
		 * number of results. If no query is provided, it resets the filtered results state
		 * and closes the dropdown.
		 * @returns None
		 */
		const getFiltered = async () => {
			if (query) {
				const res = await DndApi.getFilteredSearchSlugs(query);
				setFilteredResults(res);
				setDropdownOpen(res.length > 0);
			} else {
				setFilteredResults([]);
				setDropdownOpen(false);
			}
		};

		getFiltered();
	}, [query]);

	/**
	 * Handles the click event when an item is clicked in the dropdown menu.
	 * Updates the query state with the name of the clicked item, clears the filtered results,
	 * closes the dropdown menu, and navigates to the corresponding item's page.
	 * @param {{object}} item - The item that was clicked in the dropdown menu.
	 * @returns None
	 */
	const handleItemClick = (item) => {
		setQuery(item.name);
		setFilteredResults([]);
		setDropdownOpen(false);
		navigate(`/${item.type}/${item.slug}`);
	};

	/**
	 * Returns the text with the specified highlight applied.
	 * @param {{string}} text - The text to be highlighted.
	 * @param {{string}} highlight - The text to highlight within the main text.
	 * @returns A JSX element with the highlighted text.
	 */
	const getHighlightedText = (text, highlight) => {
		const parts = text.split(new RegExp(`(${highlight})`, "gi"));
		return (
			<span>
				{parts.map((part, index) =>
					part.toLowerCase() === highlight.toLowerCase() ? (
						<span key={index} className="highlight">
							{part}
						</span>
					) : (
						part
					)
				)}
			</span>
		);
	};

	/**
	 * Handles the form submission by clearing the filtered results, closing the dropdown,
	 * resetting the query, and navigating to the search results page with the query parameter.
	 * @returns None
	 */
	const handleSubmit = () => {
		if (query) {
			setFilteredResults([]);
			setDropdownOpen(false);
			setQuery("");
			navigate(`/search-results?query=${query}`);
		}
	};

	return (
		<Container fluid>
			<Row className="justify-content-center">
				<Col>
					<Dropdown
						isOpen={dropdownOpen}
						toggle={() => setDropdownOpen(!dropdownOpen)}
					>
						<DropdownToggle tag="div" className="w-100">
							<InputGroup>
								<Input
									type="text"
									placeholder="Type to search..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyUp={(event) => {
										if (event.key === "Enter") {
											handleSubmit();
										}
									}}
								/>
								<Button onClick={handleSubmit}>Submit</Button>
							</InputGroup>
						</DropdownToggle>
						<DropdownMenu className="w-100">
							{filteredResults.length > 0 ? (
								filteredResults.map((item) => (
									<DropdownItem
										key={item.slug}
										onClick={() => handleItemClick(item)}
									>
										{getHighlightedText(item.name, query)}
									</DropdownItem>
								))
							) : (
								<DropdownItem disabled>
									Search results: None
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				</Col>
			</Row>
		</Container>
	);
}
