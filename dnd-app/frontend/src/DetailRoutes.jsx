import { Route } from "react-router-dom";

import { Armor } from "./Armor";
import { Backgrounds } from "./Backgrounds";
import { BasicCard } from "./BasicCard";
import { Feats } from "./Feats";
import { MagicItems } from "./MagicItems";
import { Monster } from "./Monster";
import { Races } from "./Races";
import { SpellCard } from "./SpellCard";

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
