const express = require("express");
const SearchSlugs = require("../models/searchSlugs");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const results = await SearchSlugs.getSlugs();
		return res.json({ results });
	} catch (err) {
		return next(err);
	}
});

router.get("/filter", async (req, res, next) => {
	try {
		const { str } = req.query;
		const results = await SearchSlugs.getSomePartial(str);
		return res.json({ results });
	} catch (err) {
		return next(err);
	}
});

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
