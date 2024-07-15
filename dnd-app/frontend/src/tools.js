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
	slug: "alehousedrake-tob1-2023",
	desc: "This plump little creature reclines with a dazed look in its eyes and the suggestion of a grin on its fanged jaws",
	name: "Alehouse Drake",
	size: "Tiny",
	type: "Dragon",
	subtype: "",
	group: "null",
	alignment: "Chaotic Neutral",
	armor_class: 13,
	armor_desc: "",
	hit_points: 45,
	hit_dice: "10d4 + 20",
	speed: {
		walk: 60,
		fly: 30,
	},
	strength: 7,
	dexterity: 16,
	constitution: 15,
	intelligence: 11,
	wisdom: 12,
	charisma: 16,
	strength_save: null,
	dexterity_save: 5,
	constitution_save: null,
	intelligence_save: null,
	wisdom_save: null,
	charisma_save: null,
	perception: 11,
	skills: {
		Deception: 5,
		Insight: 3,
		Persuasion: 5,
	},
	damage_vulnerabilities: "False",
	damage_resistances: "False",
	damage_immunities: "poison",
	condition_immunities: "poisoned",
	senses: "darkvision 60 ft., passive Perception 11",
	languages: "Common, Draconic",
	challenge_rating: "1",
	cr: 1.0,
	actions: [
		{
			name: "Claw",
			description:
				"Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) slashing damage.",
		},
		{
			name: "Discombobulating Bite",
			description:
				"Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and if the target is a creature, it must succeed on a DC 13 Charisma saving throw or be discombobulated until the end of its next turn. A discombobulated creature is incapacitated, and when it moves, it moves in a random direction.",
		},
		{
			name: "Mocking Chortle",
			description:
				"Ranged Spell Attack: +5 to hit, range 60 ft., one creature. Hit: 7 (1d8 + 3) psychic damage.",
		},
		{
			name: "Breath Weapon (Recharge 5–6)",
			description: "The drake uses one of the following breath weapons.",
		},
		{
			name: "Dazing Breath",
			description:
				"The alehouse drake exhales sweet-smelling gas in a 30-foot cone. Each creature in that area must succeed on a DC 13 Charisma saving throw or become incapacitated for 1 minute. While incapacitated, the creature is indifferent about creatures that it is hostile toward within 50 feet of the drake. If the creature is attacked, harmed by a spell, or witnesses any of its allies being harmed, it is no longer indifferent but remains incapacitated. The incapacitated creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		},
		{
			name: "Intoxicating Breath",
			description:
				"The alehouse drake burps intoxicating gas in a 15-foot cone. Each creature in the area must make a DC 13 Constitution saving throw. On a failure, a creature takes 7 (2d6) poison damage and is poisoned for 1 minute. On a success, a creature takes half the damage and isn’t poisoned. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		},
	],
	bonus_actions: [],
	reactions: [],
	legendary_desc: null,
	legendary_actions: [],
	special_abilities: [],
	spell_list: [],
	page_no: 138,
	environments: [],
	img_main: "http://api.open5e.com/",
	document__slug: "tob-2023",
	document__title: "Tome of Beasts 2023",
	document__license_url: "http://open5e.com/legal",
	document__url:
		"https://koboldpress.com/kpstore/product/tome-of-beasts-1-2023-edition/",
};

export { LinkedList, Node, data };
