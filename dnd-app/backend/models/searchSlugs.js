"use strict";

const db = require("../db.js");

const {
	NotFoundError,
} = require("../expressError.js");

/**
 * Sorts an array of objects by the 'name' property in a case-insensitive manner.
 * @param {Array} arr - The array of objects to be sorted.
 * @returns {Array} A new array with the objects sorted by the 'name' property.
 */
function sortByName(arr) {
	return arr.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
}

/**
 * A class for retrieving slugs from the database.
 */
class SearchSlugs {
	static async getSlugs() {
		const results = await db.query(
			`SELECT name,
			slug,
			route_prefix as "type"
			 FROM search_slugs
			`
		);

		return sortByName(results.rows);
	}

 /**
  * Retrieves partial search results from the database based on the provided string.
  * @param {string} str - The partial string to search for in the database.
  * @returns {Promise<Array>} A promise that resolves to an array of sorted search results.
  */
	static async getSomePartial(str) {
		const results = await db.query(
			`SELECT name,
			slug,
			route_prefix as "type"
			 FROM search_slugs
			 WHERE name ILIKE $1
			 LIMIT 20`,
			[`%${str}%`]
		);

		return sortByName(results.rows);
	}

 /**
  * Retrieves partial search results from the database based on the provided string.
  * @param {string} str - The partial string to search for in the database.
  * @returns {Promise<Array>} A promise that resolves to an array of sorted search results.
  */
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

 /**
  * Retrieves the slug for the given name from the database.
  * @param {string} str - The name for which to retrieve the slug.
  * @returns {Promise<Object>} A promise that resolves to the slug object.
  * @throws {NotFoundError} If no slug is found for the given name.
  */
	static async getSlug(str) {
		const results = await db.query(
			`SELECT slug
			 FROM search_slugs
			 WHERE name = $1`,
			[str]
		);

		const slug = results.rows[0];

		if (!slug) throw new NotFoundError(`No Item: ${str}`);

		return slug;
	}
}

module.exports = SearchSlugs;
