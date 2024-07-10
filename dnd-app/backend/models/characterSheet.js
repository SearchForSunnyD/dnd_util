const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const { NotFoundError } = require("../expressError.js");

/**
 * Creates a new character in the character sheet table with the provided information.
 * @param {Object} data - An object containing the user_owner, character_bio, attributes, and skills of the character.
 * @returns {Object} An object with a message indicating the success of the operation.
 * @throws {NotFoundError} If no character is found after insertion.
 */
class CharacterSheet {
	/**
	 * Creates a new character in the database with the provided user owner, character bio, attributes, and skills.
	 * @param {Object} characterData - An object containing the data for the new character.
	 * @param {string} characterData.user_owner - The user who owns the character.
	 * @param {string} characterData.character_bio - The biography of the character.
	 * @param {Object} characterData.attributes - The attributes of the character.
	 * @param {Object} characterData.skills - The skills of the character.
	 * @returns {Object} The newly created character object from the database.
	 */
	static async createCharacter({
		user_owner,
		character_bio,
		attributes,
		skills,
	}) {
		const result = await db.query(
			`INSERT INTO character_sheet (user_owner, character_bio, attributes, skills)
         VALUES ($1, $2, $3, $4) RETURNING *`,
			[user_owner, character_bio, attributes, skills]
		);
		return result.rows[0];
	}

	/**
	 * Updates a character with the given ID using the provided data.
	 * @param {string} id - The ID of the character to update.
	 * @param {object} dataToUpdate - The data to update the character with.
	 * @returns {object} The updated character object.
	 * @throws {NotFoundError} If the character with the given ID is not found.
	 */
	static async updateCharacter(id, dataToUpdate) {
		const {
			feats,
			equipment,
			background,
			class: charClass,
			race,
			...characterData
		} = dataToUpdate;

		const { setCols, values } = sqlForPartialUpdate(characterData, {
			character_bio: "character_bio",
			attributes: "attributes",
			skills: "skills",
		});
		values.push(id);

		const result = await db.query(
			`UPDATE character_sheet
         SET ${setCols}
         WHERE id = $${values.length} RETURNING *`,
			values
		);

		const slugUpdates = {
			feats,
			equipment,
			background,
			charClass,
			race,
		};
		for (const [key, value] of Object.entries(slugUpdates)) {
			if (value) {
				const slugResult = await db.query(
					`SELECT id FROM search_slugs WHERE route_prefix = $1`,
					[value]
				);
				const slugId = slugResult.rows[0]?.id;
				if (slugId) {
					await db.query(
						`INSERT INTO character_links (character_id, slug_id)
               VALUES ($1, $2)
               ON CONFLICT (character_id, slug_id) DO NOTHING`,
						[id, slugId]
					);
				}
			}
		}

		const character = result.rows[0];

		if (!character) {
			throw new NotFoundError("Character not found");
		}

		return character;
	}

	/**
	 * Retrieves a character from the database based on the provided ID.
	 * @param {number} id - The ID of the character to retrieve.
	 * @returns {Promise<Object>} A Promise that resolves to the character object.
	 * @throws {NotFoundError} If the character with the given ID is not found.
	 */
	static async getCharacter(id) {
		const characterResult = await db.query(
			`SELECT character_bio, attributes, skills FROM character_sheet WHERE id = $1`,
			[id]
		);

		const character = characterResult.rows[0];

		if (!character) {
			throw new NotFoundError("Character not found");
		}

		const linksResult = await db.query(
			`SELECT sl.route_prefix, sl.NAME 
       FROM character_links cl
       JOIN search_slugs sl ON cl.slug_id = sl.id
       WHERE cl.character_id = $1`,
			[id]
		);

		linksResult.rows.forEach((link) => {
			if (link.route_prefix.includes("feats")) {
				character.feats = link;
			} else if (link.route_prefix.includes("equipment")) {
				character.equipment = link;
			} else if (link.route_prefix.includes("background")) {
				character.background = link;
			} else if (link.route_prefix.includes("class")) {
				character.class = link;
			} else if (link.route_prefix.includes("race")) {
				character.race = link;
			}
		});

		return character;
	}

	/**
	 * Deletes a character from the character_sheet table and its associated links from the character_links table.
	 * @param {number} id - The id of the character to be deleted.
	 * @throws {NotFoundError} If no character is found with the given id.
	 * @returns {Object} An object with a message indicating the character has been deleted.
	 */
	static async deleteCharacter(id) {
		let result = await db.query(
			`DELETE FROM character_sheet WHERE id = $1 RETURNING *`,
			[id]
		);
		const character = result.rows[0];

		if (!character) throw new NotFoundError(`No character found`);

		await db.query(`DELETE FROM character_links WHERE character_id = $1`, [
			id,
		]);

		return { message: "Character deleted" };
	}
}

module.exports = CharacterSheet;
