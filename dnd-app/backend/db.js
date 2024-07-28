"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
		connectionString: getDatabaseUri(),
		ssl: {
			rejectUnauthorized: false,
			ca: fs.readFileSync(path.resolve(__dirname, "ca.crt")).toString(),
		},
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;
