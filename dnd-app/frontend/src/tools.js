/* eslint-disable no-prototype-builtins */
/**
 * Represents a node in a linked list.
 */
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

/**
 * Represents a linked list data structure.
 */
class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the end of the linked list.
	 * If the linked list is empty, the new node becomes both the head and the tail.
	 * Otherwise, the new node is added after the current tail node.
	 * @param {any} val - The value to be added to the linked list as a new node.
	 * @returns None
	 */
	push(val) {
		if (this.head === null) {
			let new_node = new Node(val);
			this.head = new_node;
			this.tail = new_node;
		} else {
			let new_node = new Node(val);
			new_node.prev = this.tail;
			this.tail.next = new_node;
			this.tail = new_node;
		}
		this.length += 1;
	}
}

/**
 * Returns the description from the given data object.
 * @param {object} data - The data object containing the description.
 * @returns {string|null} The description if found, otherwise null.
 */
function getDescription(data) {
	return data.desc || data.description || null;
}




/**
 * Calculates an ability's modifier based on the input ability score.
 * The score is calculated by subtracting 10 from the input number and then dividing the result by 2.
 * The result is rounded down to the nearest integer using Math.floor().
 * @param {number} num - The input number to calculate the score from.
 * @returns {number} The calculated score.
 */
function getScore(num) {
	return Math.floor((num - 10) / 2);
}

const parseTableString = (tableString) => {
	const rows = tableString.trim().split("\n");
	const headers = rows[1]
		.split("|")
		.map((header) => header.trim())
		.filter((header) => header);

	const info = rows.slice(3).map((row) => {
		const cells = row
			.split("|")
			.map((cell) => cell.trim())
			.filter((cell) => cell);
		return headers.reduce((acc, header, i) => {
			acc[header] = cells[i];
			return acc;
		}, {});
	});

	return { headers, info };
};

export {
	LinkedList,
	Node,
	getDescription,
	getScore,
	parseTableString,
};
