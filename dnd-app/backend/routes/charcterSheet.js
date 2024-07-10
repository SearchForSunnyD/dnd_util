"use strict";

const express = require("express");
const CharacterSheet = require("./models/characterSheet");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

const router = express.Router();

/**
 * Asynchronously creates a new character sheet based on the request body.
 * @param {Object} req - The request object containing the character information.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} JSON response containing the result of creating the character sheet.
 * @throws {Error} If there is an error during the creation process, it will be passed to the error handling middleware.
 */
router.post("/", async (req, res) => {
	try {
		const result = await CharacterSheet.createCharacter(req.body);
    return res.json({ result });
	} catch (err) {
		return next(err);
	}
});

/**
 * Update a character in the character sheet database based on the provided ID and request body.
 * @param {Object} req - The request object containing the parameters and body of the request.
 * @param {Object} res - The response object to send back the result.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} JSON response containing the result of the update operation.
 * @throws {Error} If there is an error during the update operation.
 */
router.patch("/:id", ensureCorrectUserOrAdmin, async (req, res) => {
	try {
		const result = await CharacterSheet.updateCharacter(
			req.params.id,
			req.body
		);
    return res.json({ result });
	} catch (err) {
		return next(err);
	}
});

/**
 * Asynchronously retrieves a character sheet based on the provided ID and returns it as a JSON response.
 * @param {Request} req - The request object containing the parameters.
 * @param {Response} res - The response object to send the JSON result.
 * @param {NextFunction} next - The next middleware function in the application's request-response cycle.
 * @returns None
 */
router.get("/:id", async (req, res) => {
	try {
		const result = await CharacterSheet.getCharacter(req.params.id);
    return res.json({ result });
	} catch (err) {
		return next(err);
	}
});

/**
 * Asynchronously deletes a character sheet with the given ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing the result of the deletion.
 * @throws {Error} If an error occurs during the deletion process.
 */
router.delete("/:id", ensureCorrectUserOrAdmin, async (req, res) => {
	try {
		const result = await CharacterSheet.deleteCharacter(req.params.id);
    return res.json({ result });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
