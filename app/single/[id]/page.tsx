import { notFound } from 'next/navigation';
import PokemonCard from '@/components/pokemon-card';
import { fetchPokemon } from '@/lib/utils';
export default async function singlePokemon({ params }: { params: Promise<{ id: number }> }) {

  const searchId = (await params).id;
  const pokemon = await fetchPokemon(searchId);

  if (!pokemon) notFound();
  return (
    <div className='flex justify-center min-h-dvh items-center'>
      <div className=''>
        <PokemonCard pokemon={pokemon}></PokemonCard>
      </div>
    </div>
  );
}
