export type Pokemon = {
    name: string;
    id: number;
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
    };
};

export type StrippedPokemon = {
    name: string,
    url: string
}