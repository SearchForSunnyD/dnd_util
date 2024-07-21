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
	PopoverBody,
	PopoverHeader,
	Row,
	Spinner,
	UncontrolledPopover,
} from "reactstrap";
import DndApi from "./api";

import("./assets/styles/Details.css");
import("./assets/styles/SpellCard.css");

/**
 * Component to display information about a spell based on the slug parameter.
 * @returns {JSX.Element} A JSX element containing the spell information.
 */
export function SpellCard() {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		/**
		 * Asynchronously fetches information from an external API using the DndApi utility.
		 * Sets loading state to true before making the API call and sets it to false after the call is completed.
		 * @returns None
		 */
		async function getInfo() {
			setLoading(true);
			let res = await DndApi.getFromExternal({ type: "spells", slug });
			setData(res);
			setLoading(false);
		}
		getInfo();
	}, [slug]);

	return (
		<Container>
			{loading ? (
				<Spinner type="grow" />
			) : (
				<Row>
					<CardImg src="/icons/spells.png" />
					<Col>
						<Card className="info bisque">
							<CardBody>
								<CardTitle tag="h1">{data.name}</CardTitle>
								<CardSubtitle>
									<small className="text-capitalize fst-italic">
										{data.school} {data.level}
									</small>
									{data.requires_verbal_components ? (
										<>
											<Badge
												pill
												className="m-1 btn"
												id="verbal"
											>
												V
											</Badge>
											<UncontrolledPopover
												target="verbal"
												placement="bottom"
												trigger="legacy"
											>
												<PopoverHeader>
													Verbal
												</PopoverHeader>
												<PopoverBody>
													Most spells require the
													chanting of mystic words.
													The words themselves aren’t
													the source of the spell’s
													power; rather, the
													particular combination of
													sounds, with specific pitch
													and resonance, sets the
													threads of magic in motion.
													Thus, a character who is
													gagged or in an area of
													silence, such as one created
													by the silence spell, can’t
													cast a spell with a verbal
													component.
												</PopoverBody>
											</UncontrolledPopover>
										</>
									) : (
										<></>
									)}
									{data.requires_somatic_components ? (
										<>
											<Badge
												id="somatic"
												pill
												className="m-1 btn"
											>
												S
											</Badge>
											<UncontrolledPopover
												target="somatic"
												placement="bottom"
												trigger="legacy"
											>
												<PopoverHeader>
													Somatic
												</PopoverHeader>
												<PopoverBody>
													Spellcasting gestures might
													include a forceful
													gesticulation or an
													intricate set of gestures.
													If a spell requires a
													somatic component, the
													caster must have free use of
													at least one hand to perform
													these gestures.
												</PopoverBody>
											</UncontrolledPopover>
										</>
									) : (
										<></>
									)}
									{data.requires_material_components ? (
										<>
											<Badge
												id="material"
												pill
												className="m-1 btn"
											>
												M
											</Badge>
											<UncontrolledPopover
												target="material"
												placement="bottom"
												trigger="legacy"
											>
												<PopoverHeader>
													Material
												</PopoverHeader>
												<PopoverBody>
													Casting some spells requires
													particular objects,
													specified in parentheses in
													the component entry. A
													character can use a
													component pouch or a
													spellcasting focus (found in
													“Equipment”) in place of the
													components specified for a
													spell. But if a cost is
													indicated for a component, a
													character must have that
													specific component before he
													or she can cast the spell.
													If a spell states that a
													material component is
													consumed by the spell, the
													caster must provide this
													component for each casting
													of the spell. A spellcaster
													must have a hand free to
													access a spell’s material
													components—or to hold a
													spellcasting focus—but it
													can be the same hand that he
													or she uses to perform
													somatic components.
												</PopoverBody>
											</UncontrolledPopover>
										</>
									) : (
										<></>
									)}
									{data.can_be_cast_as_ritual ? (
										<>
											<Badge
												pill
												className="m-1"
												color="success"
												id="ritual"
											>
												R
											</Badge>
											<UncontrolledPopover
												target="ritual"
												placement="bottom"
												trigger="legacy"
											>
												<PopoverHeader>
													Ritual
												</PopoverHeader>
												<PopoverBody>
													Certain spells have a
													special tag: ritual. Such a
													spell can be cast following
													the normal rules for
													spellcasting, or the spell
													can be cast as a ritual. The
													ritual version of a spell
													takes 10 minutes longer to
													cast than normal. It also
													doesn’t expend a spell slot,
													which means the ritual
													version of a spell can’t be
													cast at a higher level. To
													cast a spell as a ritual, a
													spellcaster must have a
													feature that grants the
													ability to do so. The cleric
													and the druid, for example,
													have such a feature. The
													caster must also have the
													spell prepared or on his or
													her list of spells known,
													unless the character’s
													ritual feature specifies
													otherwise, as the wizard’s
													does.
												</PopoverBody>
											</UncontrolledPopover>
										</>
									) : (
										<></>
									)}
									{data.requires_concentration ? (
										<>
											<Badge
												pill
												className="m-1"
												color="primary"
												id="concentration"
											>
												C
											</Badge>
											<UncontrolledPopover
												target="concentration"
												placement="bottom"
												trigger="legacy"
											>
												<PopoverHeader>
													Concentration
												</PopoverHeader>
												<PopoverBody>
													Some spells require you to
													maintain concentration in
													order to keep their magic
													active. If you lose
													concentration, such a spell
													ends. If a spell must be
													maintained with
													concentration, that fact
													appears in its Duration
													entry, and the spell
													specifies how long you can
													concentrate on it. You can
													end concentration at any
													time (no action required).
													Normal activity, such as
													moving and attacking,
													doesn’t interfere with
													concentration. The following
													factors can break
													concentration:
													<ListGroup>
														<ListGroupItem>
															<strong>
																Casting another
																spell that
																requires
																concentration.
															</strong>{" "}
															You lose
															concentration on a
															spell if you cast
															another spell that
															requires
															concentration. You
															can’t concentrate on
															two spells at once.
														</ListGroupItem>
														<ListGroupItem>
															<strong>
																Taking damage.
															</strong>{" "}
															Whenever you take
															damage while you are
															concentrating on a
															spell, you must make
															a Constitution
															saving throw to
															maintain your
															concentration. The
															DC equals 10 or half
															the damage you take,
															whichever number is
															higher. If you take
															damage from multiple
															sources, such as an
															arrow and a dragon’s
															breath, you make a
															separate saving
															throw for each
															source of damage.
														</ListGroupItem>
														<ListGroupItem>
															<strong>
																Being
																incapacitated or
																killed.
															</strong>{" "}
															You lose
															concentration on a
															spell if you are
															incapacitated or if
															you die.{" "}
														</ListGroupItem>
													</ListGroup>
													The GM might also decide
													that certain environmental
													phenomena, such as a wave
													crashing over you while
													you’re on a storm--tossed
													ship, require you to succeed
													on a DC 10 Constitution
													saving throw to maintain
													concentration on a spell.
												</PopoverBody>
											</UncontrolledPopover>
										</>
									) : (
										<></>
									)}
								</CardSubtitle>
								<CardSubtitle>
									{data.spell_lists.map((b) => {
										return (
											<Badge
												className="text-capitalize"
												color="info"
												pill
												key={b}
											>
												{b}
											</Badge>
										);
									})}
								</CardSubtitle>
								<CardText>{data.desc}</CardText>
								<Row className="fw-light">
									<Col>
										<strong>Range:</strong> {data.range}
									</Col>
									<Col>
										<strong>Duration:</strong>{" "}
										{data.duration}
									</Col>
									<Col>
										<strong>Casting Time:</strong>{" "}
										{data.casting_time}
									</Col>
								</Row>
								{data.higher_level !== "" ? (
									<>
										<hr />
										<CardText>
											<strong>Higher Level:</strong>{" "}
											{data.higher_level}
										</CardText>
									</>
								) : (
									<></>
								)}
								<hr />
								<ListGroup>
									<h5>Additional Info</h5>
									<ListGroupItem>
										<strong>Material Components:</strong>{" "}
										{(data.requires_material_components &&
											`${data.material}`) ||
											`None`}
									</ListGroupItem>
									<ListGroupItem>
										<strong>Classes:</strong>{" "}
										{data.dnd_class}
									</ListGroupItem>
									<ListGroupItem>
										<strong>Cast as ritual: </strong>
										{data.can_be_cast_as_ritual
											? "True"
											: "False"}
									</ListGroupItem>
								</ListGroup>
								<CardText className="mt-3">
									<strong>Source:</strong>{" "}
									<Badge pill color="warning">
										<a href={data.document__url}>
											{data.document__title}
										</a>
									</Badge>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	);
}
