const db = require("../db.js");

class SearchSlugs{
  static async getSlugs() {
    const results = await db.query("SELECT * FROM search_slugs");

    return results.rows
  }
}

module.exports = SearchSlugs
