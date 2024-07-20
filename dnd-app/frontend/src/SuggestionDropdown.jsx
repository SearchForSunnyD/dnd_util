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

export function SuggestionDropdown() {
	const [query, setQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
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

	const handleItemClick = (item) => {
		setQuery(item.name);
		setFilteredResults([]);
		setDropdownOpen(false);
		navigate(`/${item.type}/${item.slug}`);
	};

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
