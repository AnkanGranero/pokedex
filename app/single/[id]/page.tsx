import { notFound } from 'next/navigation';
import PokemonCard from '@/components/pokemonCard';
import { fetchPokemon } from '@/lib/utils';
export default async function singlePokemon({ params }: { params: Promise<{ id: number }> }) {

  const searchId = (await params).id;
  const pokemon = await fetchPokemon(searchId);

  if (!pokemon) notFound();
  return (
    <PokemonCard pokemon={pokemon}></PokemonCard>
  );
}
