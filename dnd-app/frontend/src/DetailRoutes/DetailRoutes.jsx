import { Route } from "react-router-dom";

import { Feats } from "./Feats";
import { Monster } from "./Monster";
import { SpellCard } from "./SpellCard";
import { Armor } from "./Armor";
import { Backgrounds } from "./Backgrounds";
import { BasicCard } from "./BasicCard";
import { MagicItems } from "./MagicItems";
import { Races } from "./Races";

/**
 * Component that defines the detail routes for different sections of the application.
 * Returns a set of Route components for each specific section.
 * @returns JSX elements representing the detail routes for monsters, spells, magic items, races, armor, feats,
 * backgrounds, conditions, and sections.
 */
export function DetailRoutes() {
	return (
		<>
			<Route path="/monsters/:slug" element={<Monster />} />
			<Route path="/spells/:slug" element={<SpellCard />} />
			<Route path="/magicitems/:slug" element={<MagicItems />} />
			<Route path="/races/:slug" element={<Races />} />
			<Route path="/armor/:slug" element={<Armor />} />
			<Route path="/feats/:slug" element={<Feats />} />
			<Route path="/backgrounds/:slug" element={<Backgrounds />} />
			<Route path="/planes/:slug" element={<BasicCard type="planes" />} />
			<Route
				path="/conditions/:slug"
				element={<BasicCard type="conditions" />}
			/>
			<Route
				path="/sections/:slug"
				element={<BasicCard type="sections" />}
			/>
		</>
	);
}
