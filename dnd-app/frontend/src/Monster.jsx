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

/**
 * Component that fetches and displays information about a monster based on the slug parameter.
 * @returns JSX element displaying monster information
 */
export function Monster() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information about monsters from an external API using the provided slug.
		 * Sets loading state to true before making the API call and sets it to false after receiving the response.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "monsters", slug });
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
										<CardText className="col-3">
											<strong>Type:</strong> {data.type}{" "}
											{data.subtype
												? `(${data.subtype})`
												: ""}
										</CardText>
										<CardText className="col-3">
											<strong>Size:</strong> {data.size}
										</CardText>
										<CardText className="col-3 text-capitalize">
											<strong>Alignment:</strong>{" "}
											{data.alignment}
										</CardText>
										<CardText className="col-3">
											<strong>Armor Class:</strong>{" "}
											{data.armor_class}
										</CardText>
										<CardText className="col-3">
											<strong>Hit Points:</strong>{" "}
											{data.hit_points}
										</CardText>
										<CardText className="col-3">
											<strong>Hit Dice:</strong>{" "}
											{data.hit_dice}
										</CardText>
										<CardText className="col-3 text-capitalize">
											<strong>Speed:</strong>{" "}
											{Object.keys(data.speed).map(
												(speed, index) => (
													<CardText
														className="m-0"
														key={index}
													>
														{speed}{" "}
														{data.speed[speed]} ft.
													</CardText>
												)
											)}
										</CardText>
										<CardText className="col-3 text-capitalize">
											<strong>Senses:</strong>{" "}
											{data.senses}
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
									{!data.legendary_actions ? (
										<></>
									) : (
										<>
											<hr />
											<h5 className="mt-4">
												Legendary Actions
											</h5>
											<CardText>
												{data.legendary_actions.map(
													(action, index) => (
														<p key={index}>
															<strong>
																{action.name}
															</strong>
															{": "}
															{action.desc}
														</p>
													)
												)}
											</CardText>
										</>
									)}

									<hr />
									<Row>
										<CardText className="col-6 text-capitalize">
											<strong>Languages:</strong>{" "}
											{data.languages}
										</CardText>
										<CardText className="col-6">
											<strong>Challenge Rating:</strong>{" "}
											{data.challenge_rating}
										</CardText>
									</Row>
									<hr />
									<Row>
										<Col>
											<h5>Immunities/Resistances</h5>
											<ListGroup>
												<ListGroupItem className="text-capitalize">
													<strong>
														Damage Vulnerabilities:
													</strong>{" "}
													{data.damage_vulnerabilities ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize">
													<strong>
														Damage Resistances:
													</strong>{" "}
													{data.damage_resistances ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize">
													<strong>
														Damage Immunities:
													</strong>{" "}
													{data.damage_immunities ||
														"None"}
												</ListGroupItem>
												<ListGroupItem className="text-capitalize">
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
												<ListGroupItem>
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
												<ListGroupItem>
													<strong>Strength:</strong>{" "}
													{data.strength} (
													{getScore(data.strength)})
												</ListGroupItem>
												<ListGroupItem>
													<strong>Dexterity:</strong>{" "}
													{data.dexterity} (
													{getScore(data.dexterity)})
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Constitution:
													</strong>{" "}
													{data.constitution} (
													{getScore(
														data.constitution
													)}
													)
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Intelligence:
													</strong>{" "}
													{data.intelligence} (
													{getScore(
														data.intelligence
													)}
													)
												</ListGroupItem>
												<ListGroupItem>
													<strong>Wisdom:</strong>{" "}
													{data.wisdom} (
													{getScore(data.wisdom)})
												</ListGroupItem>
												<ListGroupItem>
													<strong>Charisma:</strong>{" "}
													{data.charisma} (
													{getScore(data.charisma)})
												</ListGroupItem>
											</ListGroup>
										</Col>
										<Col>
											<h5>Saves</h5>
											<ListGroup>
												<ListGroupItem>
													<strong>
														Strength Save:
													</strong>{" "}
													{data.strength_save ||
														getScore(data.strength)}
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Dexterity Save:
													</strong>{" "}
													{data.dexterity_save ||
														getScore(
															data.dexterity
														)}
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Constitution Save:
													</strong>{" "}
													{data.constitution_save ||
														getScore(
															data.constitution
														)}
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Intelligence Save:
													</strong>{" "}
													{data.intelligence_save ||
														getScore(
															data.intelligence
														)}
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Wisdom Save:
													</strong>{" "}
													{data.wisdom_save ||
														getScore(data.wisdom)}
												</ListGroupItem>
												<ListGroupItem>
													<strong>
														Charisma Save:
													</strong>{" "}
													{data.charisma_save ||
														getScore(data.charisma)}
												</ListGroupItem>
												<ListGroupItem>
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
										{!data.skill ? (
											<></>
										) : (
											<>
												<Col className="mx-2">
													<strong>Skills:</strong>{" "}
													<Row className="border rounded antique">
														{Object.keys(
															data.skills
														).map(
															(skill, index) =>
																(
																	<Col
																		className="text-capitalize text-center col-3"
																		key={
																			index
																		}
																	>
																		<strong>
																			{
																				skill
																			}
																		</strong>
																		{": "}
																		{
																			data
																				.skills[
																				skill
																			]
																		}
																	</Col>
																) || "None"
														)}
													</Row>
													{!data.armar_desc ? (
														<></>
													) : (
														<CardText className="text-capitalize">
															<strong>
																Armor
																Description:
															</strong>{" "}
															{data.armor_desc}
														</CardText>
													)}
													{!data.group ? (
														<></>
													) : (
														<>
															<CardText className="text-capitalize text-center">
																<strong>
																	Group:
																</strong>{" "}
																{data.group}
															</CardText>
														</>
													)}
												</Col>
											</>
										)}
									</Row>

									{!data.environment ? (
										<></>
									) : (
										<>
											<hr />
											<h5 className="mt-4">
												Environments
											</h5>
											<Row className="p-3 text-center antique">
												{data.environments.map(
													(environment, index) => (
														<Col
															className="col-2 text-capitalize"
															key={index}
														>
															{environment}
														</Col>
													)
												)}
											</Row>
										</>
									)}
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
