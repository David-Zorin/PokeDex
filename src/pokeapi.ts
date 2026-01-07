import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_indices: {
    game_index: number;
    generation: { name: string; url: string };
  }[];
};

export type LocationAreaDetail = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  types: {
    type: { name: string };
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("(using cache)");
      return cached;
    }
    const res = await fetch(url);
    const data = (await res.json()) as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocationArea(areaName: string): Promise<LocationAreaDetail> {
    const url = `${PokeAPI.baseURL}/location-area/${areaName}`;

    const cached = this.#cache.get<LocationAreaDetail>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Location area not found: ${areaName}`);
    }
    const data = (await res.json()) as LocationAreaDetail;

    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Pokemon not found: ${pokemonName}`);

    const data = (await res.json()) as Pokemon;
    this.#cache.add(url, data);
    return data;
  }
}
