import { Pokemon } from "../types/pokemon";
import Image from "next/image";
import RoundedImageFrame from "./roundedImageFrame";
import { getTypeColor } from "@/lib/pokemonColors";
export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {

    const { types, sprites, name, stats, id } = pokemon;
    return (
        <div className="border-8 border-blue-300 p-8 flex flex-col items-center rounded-xl bg-[#F1FDFF]">
            <RoundedImageFrame type={types[0].type.name}>

                <Image
                    className=''
                    src={sprites.front_default}
                    height="300"
                    width="300"
                    alt={name}
                ></Image>
            </RoundedImageFrame>
            <p>#{id}</p>
            <h1>{name}</h1>
            <ul className="flex">
                {types.map((item: { slot: number; type: { name: string } }) => {
                    return <li key={item.slot} style={{ backgroundColor: getTypeColor(item.type.name) }} className='text-white p-2 rounded-xl'>{item.type.name}</li>;
                })}
            </ul>
            <ul>
                {stats.map((item: Pokemon['stats'][number]) => {
                    if (['hp', 'attack', 'defense'].includes(item.stat.name)) {
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
    )
}