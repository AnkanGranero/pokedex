import { Pokemon } from "../types/pokemon";
import Image from "next/image";
import RoundedImageFrame from "./rounded-image-frame";
import { getTypeColor } from "@/lib/pokemon-colors";
export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {

    const fallback = "/not-found.jpg"
    const { types, sprites, name, stats, id } = pokemon;
    return (
        <div className="relative border-8 border-blue-300 hover:border-blue-500 hover:z-10 p-8 flex flex-col items-center rounded-xl bg-[#F1FDFF] shadow-xl cursor-pointer animate-grow-out hover:animate-grow-in ">
            <RoundedImageFrame type={types[0].type.name}>

                <Image
                    src={sprites.front_default?? fallback}
                    height="300"
                    width="300"
                    alt={name}
                ></Image>
            </RoundedImageFrame>
            <p>#{id}</p>
            <h1>{name}</h1>
            <ul className="flex w-[70%] justify-evenly">
                {types.map((item: { slot: number; type: { name: string } }) => {
                    return <li key={item.slot} style={{ backgroundColor: getTypeColor(item.type.name) }} className='text-white p-2 rounded-xl min-w-15 text-center'>{item.type.name}</li>;
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