'use client';
import { Pokemon, Filters, WeightFilter, PokemonType } from '@/types/pokemon';
import PokemonCard from './pokemon-card';
import { use, useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import NotFound from '@/app/search/not-found';

export default function SearchList({ pokemonList , pokemonTypes }: { pokemonList: Promise<Pokemon[]>, pokemonTypes: Promise<PokemonType[]> }) {
  const pokemons = use(pokemonList);
  const types = use(pokemonTypes)

  const [filters, setFilters] = useState<Filters>({
    types: [],
    weight: { operator: 'gte', value: 0 },
  });

  function toggleType(type: string) {
    setFilters((prev) => {
      const arr = prev.types;
      const next = arr.includes(type) ? arr.filter((t) => t !== type) : [...arr, type];
      return { ...prev, types: next };
    });
  }

  function addWeightFilter({ value, operator }: WeightFilter) {
    setFilters((prev) => ({ ...prev, weight: { value, operator } }));
  }

  const filteredPokemons = useMemo(() => {
    let filteredPokemon = pokemons;
    if (filters.types.length) {
      filteredPokemon = filteredPokemon.filter((p) =>
        p.types.some((t) => filters.types.includes(t.type.name))
      );
    }
    if (filters.weight.value) {
      filteredPokemon = filteredPokemon.filter((p) => {
        if (filters.weight.operator === 'gte') {
          return p.weight > filters.weight.value;
        } else {
          return p.weight < filters.weight.value;
        }
      });
    }
    return filteredPokemon;
  }, [pokemons, filters]);

  return (
    <div className="content-grid">
      <section className="mb-10 bg-white full-width py-5">
        <div className="grid grid-cols-12 gap-4 ">
          <h2 className=" text-2xl">Filters</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">TYPES</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {types.map((type: PokemonType) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={type.name}
                    checked={filters.types.includes(type.name)}
                    onSelect={(e) => {
                      e.preventDefault();
                      toggleType(type.name);
                    }}
                  >
                    {type.name}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="number"
            className=" w-20"
            placeholder="Weight"
            onChange={(e) =>
              addWeightFilter({ value: Number(e.target.value), operator: filters.weight.operator })
            }
            id="weight-input"
          ></Input>
          <RadioGroup
            className="flex col-span-2 ml-5"
            value={filters.weight.operator}
            onValueChange={(op) =>
              addWeightFilter({
                value: filters.weight.value,
                operator: op as WeightFilter['operator'],
              })
            }
          >
            <div className="flex items-center gap-1">
              <RadioGroupItem id="op-gte" value="gte" />
              <Label className="ml-2" htmlFor="op-gte">
                Greater than
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem id="op-lte" value="lte" />
              <Label className="ml-2" htmlFor="op-lte">
                Lesser than
              </Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      {filteredPokemons.length ? (
        <ul className="grid grid-cols-4 content gap-4">
          {filteredPokemons.map((p: Pokemon) => {
            return (
              <li key={p.name}>
                <PokemonCard pokemon={p}></PokemonCard>
              </li>
            );
          })}
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
