"use strict";

const {
	NotFoundError,
} = require("../expressError");
const db = require("../db.js");
const SearchSlugs = require("./searchSlugs");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("SearchSlugs", function () {
	test("getSlugs", async function () {
		const slugs = await SearchSlugs.getSlugs();
		expect(slugs).toEqual([
			{ name: "example-test", slug: "example-test-slug", type: "type2" },
			{ name: "example1", slug: "example1-slug", type: "type1" },
			{ name: "example2", slug: "example2-slug", type: "type2" },
			{ name: "test", slug: "test-slug", type: "type1" },
		]);
	});

	test("getSomePartial", async function () {
		const partials = await SearchSlugs.getSomePartial("example");
		expect(partials).toEqual([
			{ name: "example-test", slug: "example-test-slug", type: "type2" },
			{ name: "example1", slug: "example1-slug", type: "type1" },
			{ name: "example2", slug: "example2-slug", type: "type2" },
		]);
	});

	test("getSomePartial fail", async function () {
		const partials = await SearchSlugs.getSomePartial("abcdefghijk");
		expect(partials).toEqual([]);
	});

	test("getPartial", async function () {
		const partials = await SearchSlugs.getPartial("test");
		expect(partials).toEqual([
			{ name: "example-test", slug: "example-test-slug", type: "type2" },
			{ name: "test", slug: "test-slug", type: "type1" },
		]);
	});

	test("getPartial fail", async function () {
		const partials = await SearchSlugs.getPartial("abcdefghijk");
		expect(partials).toEqual([]);
	});

	test("getSlug", async function () {
		const slug = await SearchSlugs.getSlug("example1");
		expect(slug).toEqual({ slug: "example1-slug" });
	});

	test("getSlug fail", async function () {
		try {
			const slug = await SearchSlugs.getSlug("abcdefghijk");
			findAll();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
