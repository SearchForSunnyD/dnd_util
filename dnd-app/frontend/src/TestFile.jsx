import { SearchCard } from "./SearchCard";

export function TestFile() {
	const data = {
		name: "A-mi-kuk",
		slug: "a-mi-kuk",
		type: "monsters",
	};
	return <SearchCard data={data} />;
}
