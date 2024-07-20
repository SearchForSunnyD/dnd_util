const db = require("../db.js");

function sortByName(arr) {
	return arr.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
}

class SearchSlugs {
	static async getSlugs() {
		const results = await db.query(
			`SELECT *
			 FROM search_slugs
			`
		);

		return sortByName(results.rows);
	}

	static async getSomePartial(str) {
		const results = await db.query(
			`SELECT name, slug
			 FROM search_slugs
			 WHERE name ILIKE $1
			 LIMIT 20`,
			[`%${str}%`]
		);

		return sortByName(results.rows);
	}

	static async getPartial(str) {
		const results = await db.query(
			`SELECT
				name,
				route_prefix as "type",
				slug
			 FROM search_slugs
			 WHERE name ILIKE $1`,
			[`%${str}%`]
		);

		return sortByName(results.rows);
	}

	static async getSlug(str) {
		const results = await db.query(
			`SELECT slug
			 FROM search_slugs
			 WHERE name = $1`,
			[str]
		);

		return sortByName(results.rows);
	}
}

module.exports = SearchSlugs;
