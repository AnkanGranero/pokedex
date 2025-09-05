import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Pokemon, PokemonType, StrippedPokemon } from '@/types/pokemon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomId(min: number = 0, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function fetchPokemon(identifier: number | string): Promise<Pokemon | null> {
  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (!pokeRes.ok) return null;
  const singlePokemon = await pokeRes.json();
  return singlePokemon;
}

export async function getAllPokemon(limit: number = 1000) {
  const allPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const { results } = await allPokemons.json();
  return results;
}

export async function pokemonSearch(query: string = '') {
  const limit = query ? 1000 : 40;

  const allPokemons = await getAllPokemon(limit);
  const hits = allPokemons.filter((pokemon: StrippedPokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  try {
    const fetchPromises = hits.map((p: StrippedPokemon) => fetch(p.url));
    const responses = await Promise.all(fetchPromises);
    const responsesToJson = responses.map((res) => res.json());
    const promiseData = await Promise.all(responsesToJson);

    if (responses.some((res) => !res.ok)) {
      throw new Error('one or more requests failed');
    }
    return promiseData;
  } catch (err) {
    console.log('Somethng went wrong', err);
    return [];
  }
}

export async function getPokeTypes(): Promise<PokemonType[]> {
  const result = await fetch('https://pokeapi.co/api/v2/type/');
  const json = await result.json();
  const types = json.results;
  return types;
}
