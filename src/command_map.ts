import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const locationData = await state.pokeAPI.fetchLocations(
      state.nextLocationsURL ?? undefined
    );

    state.nextLocationsURL = locationData.next;
    state.prevLocationsURL = locationData.previous;

    for (const area of locationData.results) {
      console.log(area.name);
    }
  } catch (err) {
    console.log("Error fetching map:", err);
  }
}
