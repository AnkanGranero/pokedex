import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Pokemon, StrippedPokemon } from '@/types/pokemon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomId(min: number = 0, max: number = 1302): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function fetchPokemon(identifier: number | string): Promise<Pokemon | null> {
  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (!pokeRes.ok) return null;
  const singlePokemon = await pokeRes.json();
  return singlePokemon;
}

export async function getAllPokemon() {
  const allPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
  const { results } = await allPokemons.json();
  return results;
}

export async function pokemonSearch(query?: string) {
  if (!query) return [];
  const allPokemons = await getAllPokemon();
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
    return [];
  }
}
