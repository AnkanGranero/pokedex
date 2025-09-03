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
  weight: number;
  sprites: {
    front_default: string;
  };
};

export type StrippedPokemon = {
  name: string;
  url: string;
};

export const POKEMONTYPES = ['fire', 'water', 'grass', 'normal'] as const;
export type WeightFilter = { operator: 'gte' | 'lte'; value: number };
export type Filters = {
  types: string[];
  weight: WeightFilter;
};

export type PokemonType = (typeof POKEMONTYPES)[number];
