import { notFound } from 'next/navigation';
import Image from 'next/image';
export default async function singlePokemon({ params }: { params: Promise<{ id: number }> }) {
  const searchId = (await params).id;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchId}`, { cache: 'no-store' });
  const singlePokemon = await res.json();
  console.log(singlePokemon.stats);

  const { name, id, types, stats } = singlePokemon;

  if (!name) notFound();
  return (
    <div className="border-8 border-blue-300 p-8 w-[25rem] flex flex-col items-center">
      <Image
        src={singlePokemon.sprites.front_default}
        height="300"
        width="300"
        alt={singlePokemon.name}
      ></Image>
      <p>#{id}</p>
      <h1>{singlePokemon.name}</h1>
      <ul>
        {types.map((type: { slot: string; type: { name: string } }) => {
          return <li key={type.slot}>{type.type.name}</li>;
        })}
      </ul>
      <ul>
        {stats.map(
          (item: { base_stat: number; effort: number; stat: { name: string; url: string } }) => {
            if ([ 'hp','attack', 'defense'].includes(item.stat.name)) {
              return (
                <li key={item.stat.name}>
                  <span>{item.stat.name}</span>
                  <span>{item.base_stat}</span>
                </li>
              );
            }
          }
        )}
      </ul>
    </div>
  );
}
