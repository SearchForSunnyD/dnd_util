import axios from "axios";

const BASE_URL = "http://localhost:3001";

class DndApi {
	static token;

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

	static async registerUser(data) {
		console.log("register");
		let res = await this.request("auth/register", { ...data }, "post");
		return res.token;
	}

	static async authenticateUser(username, password) {
		let res = await this.request(
			"auth/token",
			{ username, password },
			"post"
		);
		return res.token;
	}

	static async getUser(username) {
		let res = await this.request(`users/${username}`, {
			username,
		});
		return res;
	}

	static async patchUser(username, data) {
		let res = await this.request(`users/${username}`, { ...data }, "patch");
		return res;
	}

	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, {}, "delete");
		return res;
	}
}


DndApi.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
