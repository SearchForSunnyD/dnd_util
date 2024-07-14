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

const data = {
	name: "A-mi-kuk",
	slug: "a-mi-kuk",
	type: "monsters",
	desc: "Crimson slime covers this ungainly creature. Its tiny black eyes sit in an abnormally large head, and dozens of sharp teeth fill its small mouth. Its limbs end in large, grasping claws that look strong enough to crush the life out of a bear._  \n**Hidden Terror.** The dreaded a-mi-kuk is a terrifying creature that feasts on any who venture into the bleak and icy expanses of the world. A-mi-kuks prowl the edges of isolated communities, snatching those careless enough to wander too far from camp. They also submerge themselves beneath frozen waters, coming up from below to grab and strangle lone fishermen.  \n**Fear of Flames.** A-mi-kuks have a deathly fear of fire, and anyone using fire against one has a good chance of making it flee in terror, even if the fire-user would otherwise be outmatched. A-mi-kuks are not completely at the mercy of this fear, however, and lash out with incredible fury if cornered by someone using fire against them.  \n**Unknown Origins.** A-mi-kuks are not natural creatures and contribute little to the ecosystems in which they live. The monsters are never seen together, and some believe them to be a single monster, an evil spirit made flesh that appears whenever a group of humans has angered the gods. A-mi-kuks have no known allies and viciously attack any creatures that threaten them, regardless of the foe’s size or power.",
};

export { LinkedList, Node, data };
