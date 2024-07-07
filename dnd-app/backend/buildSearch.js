const axios = require("axios");
const db =  require("./db");

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
