const express = require("express");
const SearchSlugs = require("./models/searchSlugs");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    return await SearchSlugs.getSlugs()
  } catch (err) {
    return next(err);
  }
})

module.exports = router
