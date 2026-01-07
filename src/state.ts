import { type Interface, createInterface } from "node:readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>; // Your collection
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const cache = new Cache(300000); // 5 minutes
  const pokeAPI = new PokeAPI(cache);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const state: State = {
    rl,
    pokeAPI,
    nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
    prevLocationsURL: null,
    commands: {},
    pokedex: {},
  };

  state.commands = {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Display the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas",
      callback: commandMapB,
    },
    explore: {
      name: "explore <area_name>",
      description: "List the Pokemon in a specific location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Attempt to catch a Pokemon and add it to your Pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "View details of a caught Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all the Pokemon you have caught",
      callback: commandPokedex,
    },
  };

  return state;
}
