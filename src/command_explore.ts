import { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Error: You must provide a location area name.");
    return;
  }

  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);

  try {
    const data = await state.pokeAPI.fetchLocationArea(areaName);
    console.log("Found Pokemon:");

    if (data.pokemon_encounters.length === 0) {
      console.log(" No Pokemon found in this area.");
      return;
    }

    for (const encounter of data.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (err) {
    console.log(`Error: Could not explore area "${areaName}".`);
  }
}
