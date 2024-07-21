const express = require("express");
const SearchSlugs = require("../models/searchSlugs");

const router = express.Router();

/**
 * Asynchronously retrieves slugs using SearchSlugs.getSlugs() and returns them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Object} A JSON response containing the results of the slug search.
 */
router.get("/", async (req, res, next) => {
	try {
		const results = await SearchSlugs.getSlugs();
		return res.json({ results });
	} catch (err) {
		return next(err);
	}
});

/**
 * Asynchronous function that handles a request to search for partial matches in slugs.
 * @param {Object} req - The request object containing the query parameter 'str'.
 * @param {Object} res - The response object to send back the search results.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} JSON response containing the search results.
 * @throws {Error} If an error occurs during the search process.
 */
router.get("/filter", async (req, res, next) => {
	try {
		const { str } = req.query;
		const results = await SearchSlugs.getSomePartial(str);
		return res.json({ results });
	} catch (err) {
		return next(err);
	}
});

/**
 * Asynchronously handles a request to search for partial matches in slugs based on a given string.
 * @param {Object} req - The request object containing the query parameter 'str'.
 * @param {Object} res - The response object to send back the search results in JSON format.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} JSON response containing the search results.
 * @throws {Error} If an error occurs during the search process.
 */
router.get("/search", async (req, res, next) => {
	try {
		const { str } = req.query;
		const results = await SearchSlugs.getPartial(str);
		return res.json({ results });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
