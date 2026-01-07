import { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Error: You must provide a Pokemon name.");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const threshold = 50; // Base difficulty
    const catchChance = Math.random() * pokemon.base_experience;

    if (catchChance < threshold) {
      console.log(`${pokemonName} was caught!`);
      console.log("You may now inspect it with the inspect command.");
      state.pokedex[pokemonName] = pokemon;
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (err) {
    console.log(`Error: Could not find Pokemon "${pokemonName}".`);
  }
}
