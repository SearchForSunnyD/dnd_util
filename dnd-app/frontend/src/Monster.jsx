/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";

import("./assets/styles/Monsters.css");

export function Monster({data}) {
	function getDescription(data) {
		return data.desc || data.description || null;
	}

	return (
		<Container>
			<Row className="my-4">
				<CardImg src="./icons/monsters.png" />
				<Col>
					<Card className="info">
						<Col>
							<CardBody>
								<CardTitle tag="h3">{data.name}</CardTitle>
								<CardSubtitle>
									{getDescription(data) ||
										data.legendary_desc}
								</CardSubtitle>
								<hr />
								<Row>
									<CardText className="col-2">
										<strong>Type:</strong> {data.type}{" "}
										{data.subtype
											? `(${data.subtype})`
											: ""}
									</CardText>
									<CardText className="col-2">
										<strong>Size:</strong> {data.size}
									</CardText>
									<CardText className="col-2">
										<strong>Alignment:</strong>{" "}
										{data.alignment}
									</CardText>
									<CardText className="col-2">
										<strong>Armor Class:</strong>{" "}
										{data.armor_class}
									</CardText>
									<CardText className="col-2">
										<strong>Hit Points:</strong>{" "}
										{data.hit_points}
									</CardText>
									<CardText className="col-2">
										<strong>Hit Dice:</strong>{" "}
										{data.hit_dice}
									</CardText>
									<CardText className="col-2">
										<strong>Speed:</strong>{" "}
										{Object.keys(data.speed).map(
											(speed, index) => (
												<p key={index}>
													{speed} {data.speed[speed]}{" "}
													ft.
												</p>
											)
										)}
									</CardText>
									<CardText className="col-2">
										<strong>Senses:</strong> {data.senses}
									</CardText>
									<CardText className="col-2">
										<strong>Languages:</strong>{" "}
										{data.languages}
									</CardText>
									<CardText className="col-2">
										<strong>Challenge Rating:</strong>{" "}
										{data.challenge_rating}
									</CardText>
								</Row>
								<hr />
								<Row>
									<Col>
										<CardText>
											<strong>Page Number:</strong>{" "}
											{data.page_no}
										</CardText>
									</Col>
									<Col>
										<CardText>
											<strong>Document:</strong>{" "}
											<a href={data.document__url}>
												{data.document__title}
											</a>
										</CardText>
									</Col>
								</Row>
								<hr />
								<h5 className="mt-4">Actions</h5>
								{data.actions.map((action, index) => (
									<div key={index}>
										<CardText>
											<strong>{action.name}:</strong>{" "}
											{getDescription(action)}
										</CardText>
									</div>
								))}
								<hr />
								<h5 className="mt-4">Special Abilities</h5>
								{data.special_abilities.length > 0
									? data.special_abilities.map(
											(ability, index) => (
												<div key={index}>
													<CardText>
														<strong>
															{ability.name}:
														</strong>{" "}
														{getDescription(
															ability
														)}
													</CardText>
												</div>
											)
									  )
									: "None"}
								<hr />
								<h5 className="mt-4">Legendary Actions</h5>
								<CardText>
									{data.legendary_actions > 0
										? data.legendary_actions.map(
												(action, index) => (
													<p key={index}>
														<strong>
															{action.name}
														</strong>
														{": "}
														{getDescription(action)}
													</p>
												)
										  )
										: "None"}
								</CardText>
								<hr />
								<Row>
									<Col>
										<h5>Immunities/Resistances</h5>
										<ListGroup>
											<ListGroupItem>
												<strong>
													Damage Vulnerabilities:
												</strong>{" "}
												{data.damage_vulnerabilities ||
													"None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Damage Resistances:
												</strong>{" "}
												{data.damage_resistances ||
													"None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Damage Immunities:
												</strong>{" "}
												{data.damage_immunities ||
													"None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Condition Immunities:
												</strong>{" "}
												{data.condition_immunities ||
													"None"}
											</ListGroupItem>
										</ListGroup>
									</Col>
									<Col>
										<h5>Other Actions</h5>
										<ListGroup>
											<ListGroupItem>
												<strong>Bonus Actions:</strong>{" "}
												{data.bonus_actions
													? Object.keys(
															data.bonus_actions
													  ).map((action, index) => (
															<p key={index}>
																{action}{" "}
																{
																	data
																		.bonus_actions[
																		action
																	]
																}{" "}
																ft.
															</p>
													  ))
													: "None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Reactions:</strong>{" "}
												{data.reactions
													? Object.keys(
															data.reactions
													  ).map((action, index) => (
															<p key={index}>
																{action}{" "}
																{
																	data
																		.reactions[
																		action
																	]
																}{" "}
																ft.
															</p>
													  ))
													: "None"}
											</ListGroupItem>
										</ListGroup>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col>
										<h5>Abilities</h5>
										<ListGroup>
											<ListGroupItem>
												<strong>Strength:</strong>{" "}
												{data.strength}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Dexterity:</strong>{" "}
												{data.dexterity}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Constitution:</strong>{" "}
												{data.constitution}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Intelligence:</strong>{" "}
												{data.intelligence}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Wisdom:</strong>{" "}
												{data.wisdom}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Charisma:</strong>{" "}
												{data.charisma}
											</ListGroupItem>
										</ListGroup>
									</Col>
									<Col>
										<h5>Saves</h5>
										<ListGroup>
											<ListGroupItem>
												<strong>Strength Save:</strong>{" "}
												{data.strength_save || "None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Dexterity Save:</strong>{" "}
												{data.dexterity_save || "None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Constitution Save:
												</strong>{" "}
												{data.constitution_save ||
													"None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Intelligence Save:
												</strong>{" "}
												{data.intelligence_save ||
													"None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Wisdom Save:</strong>{" "}
												{data.wisdom_save || "None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>Charisma Save:</strong>{" "}
												{data.charisma_save || "None"}
											</ListGroupItem>
											<ListGroupItem>
												<strong>
													Passive Perception:
												</strong>{" "}
												{data.perception || "None"}
											</ListGroupItem>
										</ListGroup>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col>
										<CardText>
											<strong>Skills:</strong>{" "}
											{Object.keys(data.skills).map(
												(skill, index) =>
													(
														<p key={index}>
															{skill}{" "}
															{data.skills[skill]}{" "}
															ft.
														</p>
													) || "None"
											)}
										</CardText>
									</Col>
									<Col>
										<CardText>
											<strong>Group:</strong>{" "}
											{data.group || "None"}
										</CardText>
									</Col>
									<Col>
										<CardText>
											<strong>Armor Description:</strong>{" "}
											{data.armor_desc || "None"}
										</CardText>
									</Col>
								</Row>

								<hr />
								<h5 className="mt-4">Environments</h5>
								<Row className="p-3 env">
									{data.environments.map(
										(environment, index) => (
											<ListGroupItem
												className="col-2"
												key={index}
											>
												{environment}
											</ListGroupItem>
										)
									)}
								</Row>
							</CardBody>
						</Col>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
