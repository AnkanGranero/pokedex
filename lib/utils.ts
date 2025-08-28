import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Pokemon } from "@/types/pokemon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomId(min: number = 0, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min) + min);
}


export async function fetchPokemon(id: number): Promise<Pokemon> {
  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await pokeRes.json();
}