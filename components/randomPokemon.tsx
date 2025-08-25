import { fetchPokemon, randomId } from "@/lib/utils";
import PokemonCard from "./pokemonCard";

export default async function randomPokemon() {

    const id = randomId();
    const pokemon = await fetchPokemon(id)

    return (
        <PokemonCard pokemon={pokemon}></PokemonCard>
    )

}