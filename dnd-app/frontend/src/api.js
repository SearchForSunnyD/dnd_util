import axios from "axios";
import { LinkedList, getDescription } from "./tools";

const BASE_URL = "http://localhost:3001";

/**
 * A class for making API requests to the D&D API.
 */
class DndApi {
	static token;

	/**
	 * Makes an asynchronous API request to the specified endpoint with the given data and method.
	 * @param {string} endpoint - The API endpoint to make the request to.
	 * @param {object} [data={}] - The data to send with the request.
	 * @param {string} [method="get"] - The HTTP method to use for the request.
	 * @returns {Promise} A promise that resolves with the data from the API response.
	 * @throws {Array} An array of error messages if the API request fails.
	 */
	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${DndApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/**
	 * Makes an external request to the specified URL and endpoint using the provided data.
	 * @param {string} url - The base URL for the external request.
	 * @param {string} endpoint - The endpoint to append to the base URL.
	 * @param {any} data - The data to send with the request.
	 * @param {string} [method="get"] - The HTTP method to use for the request.
	 * @returns {Promise} A promise that resolves with the response data from the external request.
	 * @throws {Array} An array of error messages if the request fails.
	 */
	static async externalRequest(url, endpoint, data, method = "get") {
		console.debug("API Call:", url, endpoint, data, method);

		const externalUrl = `${url}/${endpoint}/${data}`;

		try {
			return await axios.get(externalUrl);
		} catch (err) {
			console.error("API Error:", err);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/**
	 * Registers a new user by sending a POST request to the "auth/register" endpoint with the provided data.
	 * @param {Object} data - The user data to be registered.
	 * @returns {string} The token received after successful registration.
	 */
	static async registerUser(data) {
		console.log("register");
		let res = await this.request("auth/register", { ...data }, "post");
		return res.token;
	}

	/**
	 * Authenticates a user by sending a POST request to the "auth/token" endpoint with the provided username and password.
	 * @param {string} username - The username of the user to authenticate.
	 * @param {string} password - The password of the user to authenticate.
	 * @returns {Promise<string>} A Promise that resolves to the authentication token.
	 */
	static async authenticateUser(username, password) {
		let res = await this.request(
			"auth/token",
			{ username, password },
			"post"
		);
		return res.token;
	}

	/**
	 * Retrieves user information based on the provided username.
	 * @param {string} username - The username of the user to retrieve information for.
	 * @returns {Promise} A promise that resolves with the user information.
	 */
	static async getUser(username) {
		let res = await this.request(`users/${username}`, {
			username,
		});
		return res;
	}

	/**
	 * Patch user data for a specific username using a PATCH request.
	 * @param {string} username - The username of the user to patch.
	 * @param {object} data - The data to be patched for the user.
	 * @returns {Promise<object>} A promise that resolves to the response data from the PATCH request.
	 */
	static async patchUser(username, data) {
		let res = await this.request(`users/${username}`, { ...data }, "patch");
		return res;
	}

	/**
	 * Deletes a user with the given username from the server.
	 * @param {string} username - The username of the user to be deleted.
	 * @returns {Promise} A promise that resolves with the response from the server.
	 */
	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, {}, "delete");
		return res;
	}

	/**
	 * Retrieves search slugs by making an asynchronous request to the server.
	 * @returns {Promise} A promise that resolves with the search slugs.
	 */
	static async getSearchSlugs() {
		let res = await this.request("search", {}, "get");
		return res;
	}

	/**
	 * Retrieves filtered search slugs based on the provided string.
	 * @param {string} str - The string used for filtering search slugs.
	 * @returns {Array} An array of filtered search slugs.
	 */
	static async getFilteredSearchSlugs(str) {
		let res = await this.request("search/filter", { str }, "get");
		return res.results;
	}

	/**
	 * Retrieves paginated search slugs based on the given search string and chunk size.
	 * @param {string} str - The search string to query for.
	 * @param {number} [chunkSize=10] - The size of each chunk of search results.
	 * @returns {LinkedList} A linked list containing paginated search slugs.
	 */
	static async getPaginatedSearchSlugs(str, chunkSize = 10) {
		let res = await this.request("search/search", { str }, "get");

		const list = new LinkedList();

		for (let i = 0; i < res.results.length; i += chunkSize) {
			const chunk = res.results.slice(i, i + chunkSize);
			list.push(chunk);
		}

		list.results = res.results.length;

		return list;
	}

	/**
	 * Fetches data from an external API based on the provided type and slug.
	 * @param {Object} options - An object containing the type and slug for the API request.
	 * @param {string} options.type - The type of data to fetch.
	 * @param {string} options.slug - The slug parameter for the API request.
	 * @returns {Promise<Object>} A promise that resolves to the cleaned data object fetched from the external API.
	 */
	static async getFromExternal({ type, slug }) {
		const url = "https://api.open5e.com/v1";
		let res = await this.externalRequest(url, type, slug);

		res.data.desc = getDescription(res.data);

		return res.data;
	}
}

DndApi.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default DndApi;
