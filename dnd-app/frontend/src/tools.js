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
 * Removes markdown syntax from a given markdown text and returns the plain text.
 * @param {string} markdownText - The markdown text to strip markdown syntax from.
 * @returns {string} The plain text without markdown syntax.
 */
function stripMarkdownFromString(markdownText) {
	return markdownText
		.replace(/(?:_|[*#])|\[(.*?)\]\(.*?\)/g, "$1") // Remove _, *, #, and [text](link)
		.replace(/!\[(.*?)\]\(.*?\)/g, "$1") // Remove ![alt text](link)
		.replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold **
		.replace(/\*(.*?)\*/g, "$1") // Remove italics *
		.replace(/~~(.*?)~~/g, "$1") // Remove strikethrough ~~
		.replace(/`(.*?)`/g, "$1") // Remove inline code `
		.replace(/^\s*>\s+/gm, "") // Remove blockquotes
		.replace(/^#+\s+/gm, "") // Remove headings #
		.replace(/^\s*-\s+/gm, "") // Remove unordered list
		.replace(/^\s*\d+\.\s+/gm, "") // Remove ordered list
		.replace(/\n/g, " "); // Replace new lines with space
}

/**
 * Recursively removes Markdown formatting from a given object.
 * @param {any} obj - The object to strip Markdown from.
 * @returns {any} The object with Markdown formatting removed.
 */
function stripMarkdownFromObject(obj) {
	if (typeof obj === "string") {
		return stripMarkdownFromString(obj);
	} else if (Array.isArray(obj)) {
		return obj.map((item) => stripMarkdownFromObject(item));
	} else if (obj instanceof Set) {
		const newSet = new Set();
		for (let item of obj) {
			newSet.add(stripMarkdownFromObject(item));
		}
		return newSet;
	} else if (obj !== null && typeof obj === "object") {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				obj[key] = stripMarkdownFromObject(obj[key]);
			}
		}
		return obj;
	} else {
		return obj;
	}
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

export { LinkedList, Node, getDescription, getScore, stripMarkdownFromObject };
