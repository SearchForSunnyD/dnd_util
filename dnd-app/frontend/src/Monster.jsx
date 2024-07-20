/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Badge,
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
	Spinner,
} from "reactstrap";
import DndApi from "./api";
import { getScore } from "./tools";

import("./assets/styles/Details.css");

export function Monster() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "monsters", slug });
			console.log(res);
			setData(res);
			setLoading(false);
		}
		getInfo();
	}, [slug]);

	return (
		<Container>
			{loading ? (
				<Container fluid className="mx-auto">
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
					<Spinner type="grow" />
				</Container>
			) : (
				<Row>
					<CardImg src="/icons/monsters.png" />
					<Col>
						<Card className="info bisque">
							<Col>
								<CardBody>
									<CardTitle tag="h3">{data.name}</CardTitle>
									{!data.desc && !data.legendary_desc ? (
										""
									) : (
										<CardSubtitle>
											{data.desc || data.legendary_desc}
										</CardSubtitle>
									)}
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
										<CardText className="col-2 text-capitalize">
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
										<CardText className="col-2 text-capitalize">
											<strong>Speed:</strong>{" "}
											{Object.keys(data.speed).map(
												(speed, index) => (
													<ListGroupItem key={index}>
														{speed}{" "}
														{data.speed[speed]} ft.
													</ListGroupItem>
												)
											)}
										</CardText>
										<CardText className="col-2 text-capitalize">
											<strong>Senses:</strong>{" "}
											{data.senses}
										</CardText>
										<CardText className="col-2 text-capitalize">
											<strong>Languages:</strong>{" "}
											{data.languages}
										</CardText>
										<CardText className="col-2">
											<strong>Challenge Rating:</strong>{" "}
											{data.challenge_rating}
										</CardText>
									</Row>
									<hr />
									<h5 className="mt-4">Actions</h5>
									{data.actions.map((action, index) => (
										<div key={index}>
											<CardText>
												<strong>{action.name}:</strong>{" "}
												{action.desc}
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
															{ability.desc}
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
															{action.desc}
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
												<ListGroupItem className="text-capitalize antique">
													<strong>
														Damage Vulnerabilities:
													</strong>{" "}
													{data.damage_vulnerabilities ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize antique">
													<strong>
														Damage Resistances:
													</strong>{" "}
													{data.damage_resistances ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize antique">
													<strong>
														Damage Immunities:
													</strong>{" "}
													{data.damage_immunities ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize antique">
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
												<ListGroupItem className="antique">
													<strong>
														Bonus Actions:
													</strong>{" "}
													{data.bonus_actions
														? Object.keys(
																data.bonus_actions
														  ).map(
																(
																	action,
																	index
																) => (
																	<p
																		key={
																			index
																		}
																	>
																		{action}{" "}
																		{
																			data
																				.bonus_actions[
																				action
																			]
																		}{" "}
																		ft.
																	</p>
																)
														  )
														: "None"}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>Reactions:</strong>{" "}
													{data.reactions
														? Object.keys(
																data.reactions
														  ).map(
																(
																	action,
																	index
																) => (
																	<p
																		key={
																			index
																		}
																	>
																		{action}{" "}
																		{
																			data
																				.reactions[
																				action
																			]
																		}{" "}
																		ft.
																	</p>
																)
														  )
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
												<ListGroupItem className="antique">
													<strong>Strength:</strong>{" "}
													{data.strength} (
													{getScore(data.strength)})
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>Dexterity:</strong>{" "}
													{data.dexterity} (
													{getScore(data.dexterity)})
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Constitution:
													</strong>{" "}
													{data.constitution} (
													{getScore(
														data.constitution
													)}
													)
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Intelligence:
													</strong>{" "}
													{data.intelligence} (
													{getScore(
														data.intelligence
													)}
													)
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>Wisdom:</strong>{" "}
													{data.wisdom} (
													{getScore(data.wisdom)})
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>Charisma:</strong>{" "}
													{data.charisma} (
													{getScore(data.charisma)})
												</ListGroupItem>
											</ListGroup>
										</Col>
										<Col>
											<h5>Saves</h5>
											<ListGroup>
												<ListGroupItem className="antique">
													<strong>
														Strength Save:
													</strong>{" "}
													{data.strength_save ||
														getScore(data.strength)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Dexterity Save:
													</strong>{" "}
													{data.dexterity_save ||
														getScore(
															data.dexterity
														)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Constitution Save:
													</strong>{" "}
													{data.constitution_save ||
														getScore(
															data.constitution
														)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Intelligence Save:
													</strong>{" "}
													{data.intelligence_save ||
														getScore(
															data.intelligence
														)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Wisdom Save:
													</strong>{" "}
													{data.wisdom_save ||
														getScore(data.wisdom)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Charisma Save:
													</strong>{" "}
													{data.charisma_save ||
														getScore(data.charisma)}
												</ListGroupItem>
												<ListGroupItem className="antique">
													<strong>
														Passive Perception:
													</strong>{" "}
													{data.perception || "0"}
												</ListGroupItem>
											</ListGroup>
										</Col>
									</Row>
									<hr />
									<Row>
										<Col>
											<ListGroup>
												<strong>Skills:</strong>{" "}
												{Object.keys(data.skills).map(
													(skill, index) =>
														(
															<ListGroupItem
																className="text-capitalize antique"
																key={index}
															>
																{skill}{" "}
																{
																	data.skills[
																		skill
																	]
																}
															</ListGroupItem>
														) || "None"
												)}
											</ListGroup>
										</Col>
										<Col>
											<CardText className="text-capitalize">
												<strong>Group:</strong>{" "}
												{data.group || "None"}
											</CardText>
										</Col>
										<Col>
											<CardText className="text-capitalize">
												<strong>
													Armor Description:
												</strong>{" "}
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
													className="col-2 antique text-capitalize"
													key={index}
												>
													{environment}
												</ListGroupItem>
											)
										)}
									</Row>
									<CardText className="mt-3">
										<strong>Source:</strong>{" "}
										<Badge pill color="warning">
											<a href={data.document__url}>
												{data.document__title}
											</a>
										</Badge>
									</CardText>
								</CardBody>
							</Col>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	);
}
