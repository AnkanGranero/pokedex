import { fetchPokemon, randomId } from '@/lib/utils';
import PokemonCard from './pokemonCard';

export default async function randomPokemon() {
  let id = randomId();
  let pokemon = await fetchPokemon(id);

  if (!pokemon) {
    id = randomId();
    pokemon = await fetchPokemon(id);
  }
  if (!pokemon) {
    return;
  }

  return <PokemonCard pokemon={pokemon}></PokemonCard>;
}
