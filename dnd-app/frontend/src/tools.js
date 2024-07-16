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
			new_node.next = this.head;
			this.tail.next = new_node;
			this.tail = new_node;
		}
		this.length += 1;
	}
}

function getDescription(data) {
	return data.desc || data.description || null;
}

const data = {
	slug: "powerful-attacker",
	name: "Powerful Attacker",
	desc: "You reap a bloody harvest with a two-handed weapon.",
	prerequisite: null,
	effects_desc: [
		"You gain proficiency with the Cleaving Swing maneuver and do not have to spend exertion to activate it",
		"Before you make an attack with a heavy weapon you are proficient with, you can choose to make the attack roll with disadvantage. If the attack hits, you deal 10 extra damage.",
	],
	document__slug: "a5e",
	document__title: "Level Up Advanced 5e",
	document__url: "https://a5esrd.com/a5esrd",
};

export { LinkedList, Node, data, getDescription };
