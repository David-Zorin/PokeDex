import { State } from "./state.js";

export function cleanInput(str: string): string[] {
  const result = [];
  const lower = str.toLowerCase();
  const splitted = lower.split(" ");
  for (const word of splitted) {
    const trimmed = word.trim(); // Remove any leftover whitespace
    if (trimmed !== "") {
      result.push(trimmed);
    }
  }
  return result;
}

export function startREPL(state: State) {
  // Use the interface from state
  state.rl.setPrompt("Pokedex > ");
  state.rl.prompt();

  state.rl.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);

    if (commandName in state.commands) {
      try {
        // Properly await the async callback
        await state.commands[commandName].callback(state, ...args);
      } catch (err) {
        console.error("An error occurred:", err);
      }
    } else if (commandName !== "") {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}
