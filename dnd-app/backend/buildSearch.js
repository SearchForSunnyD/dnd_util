const axios = require("axios");
const db =  require("./db");

/**
 * Asynchronously inserts a new record into the database with the provided slug, name, and prefix.
 * @param {Object} options - An object containing the properties of the record to be inserted.
 * @param {string} options.slug - The slug of the record.
 * @param {string} options.name - The name of the record.
 * @param {string} options.prefix - The prefix of the record.
 * @returns None
 */
async function insertDb({ slug, name, prefix }) {
	try {
		await db.query(
			`INSERT INTO search_slugs
        (
          slug,
          name,
          route_prefix
        )
        VALUES ($1, $2, $3)
        RETURNING slug`,
			[slug, name, prefix]
		);
	} catch (error) {
		if (error.code === "23505") {
			console.log(`Duplicate entry found for slug: ${slug}`);
		} else {
			console.error(`Error inserting data for slug: ${slug}`, error);
		}
	}
}

/**
 * Asynchronously fetches data from the specified URL and inserts it into the DOM
 * with the given prefix.
 * @param {string} prefix - The prefix to use when inserting the data into the DOM.
 * @param {string} url - The URL from which to fetch the data.
 * @returns None
 */
async function fetchAndInsertData(prefix, url) {
	try {
		let more = url + prefix;
		while (more !== null) {
			const res = await axios.get(more);
			more = res.data.next;
			const results = res.data.results;
			for (const result of results) {
				await insertDb({
					slug: result.slug,
					name: result.name,
					prefix,
				});
			}
    }
    console.log(`Finished importing ${prefix} slugs`)
	} catch (error) {
		console.error(`Error fetching data for ${prefix}:`, error);
	}
}

/**
 * Asynchronously builds a slug database.
 * @returns None
 */
async function buildSlugDb() {
	const url = "https://api.open5e.com/v1/";
	const calls = [
		"monsters",
		"backgrounds",
		"planes",
		"feats",
		"conditions",
		"races",
		"classes",
		"magicitems",
		"weapons",
		"armor",
		"spells",
		"spelllist",
	];

	await Promise.all(calls.map((prefix) => fetchAndInsertData(prefix, url)));
}

module.exports = buildSlugDb
