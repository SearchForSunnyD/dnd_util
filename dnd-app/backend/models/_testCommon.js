const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");

	await db.query(
		`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
		[
			await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
			await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
		]
	);
	await db.query("DELETE FROM search_slugs");

	await db.query(`
      INSERT INTO search_slugs (name, slug, route_prefix)
      VALUES ('example1', 'example1-slug', 'type1'),
             ('example2', 'example2-slug', 'type2'),
             ('test', 'test-slug', 'type1'),
             ('example-test', 'example-test-slug', 'type2')
    `);
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
};
