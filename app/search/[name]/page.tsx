import PokemonCard from "@/components/pokemonCard";
import { fetchPokemon } from "@/lib/utils";


export default async function SearchResults({ params }: { params: { name: string } }) {
console.log("search");

    const { name } = await params;
    const pokemon = await fetchPokemon(name);

    return (
        <div>
            <PokemonCard pokemon={pokemon}></PokemonCard>
        </div>
    )


}