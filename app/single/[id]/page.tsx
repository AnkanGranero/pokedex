import { notFound } from 'next/navigation';
import Image from 'next/image';
import RoundedImageFrame from '@/app/components/roundedImageFrame';
import { getTypeColor } from '@/lib/pokemonColors';
export default async function singlePokemon({ params }: { params: Promise<{ id: number }> }) {
  const searchId = (await params).id;

  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchId}`);
  const singlePokemon = await pokeRes.json();
  const { name, id, types, stats } = singlePokemon;

/*   const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchId}`);
  const speciesInfo = await speciesRes.json();
  const { color: {name:colorName} } = speciesInfo; */


  if (!name) notFound();
  return (
    <div className="border-8 border-blue-300 p-8 w-[25rem] flex flex-col items-center">
      <RoundedImageFrame type={types[0].type.name}>

      <Image
      className=''
        src={singlePokemon.sprites.front_default}
        height="300"
        width="300"
        alt={singlePokemon.name}
      ></Image>
      </RoundedImageFrame>
      <p>#{id}</p>
      <h1>{singlePokemon.name}</h1>
      <ul>
        {types.map((item: { slot: string; type: { name: string } }) => {
          return <li key={item.slot} style={{backgroundColor: getTypeColor(item.type.name)}} className='text-white p-2 rounded-xl'>{item.type.name}</li>;
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
