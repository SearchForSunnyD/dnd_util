/* eslint-disable no-prototype-builtins */
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

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

function getDescription(data) {
	return data.desc || data.description || null;
}

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

function getScore(num) {
	return Math.floor((num - 10) / 2);
}

export { LinkedList, Node, getDescription, getScore, stripMarkdownFromObject };
