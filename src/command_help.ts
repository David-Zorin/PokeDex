import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n");

  for (const name in state.commands) {
    const cmd = state.commands[name];
    console.log(`${cmd.name}: ${cmd.description}`);
  }

  console.log("");
}
