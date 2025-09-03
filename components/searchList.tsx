'use client';
import { Pokemon, POKEMONTYPES, Filters, WeightFilter } from '@/types/pokemon';
import PokemonCard from './pokemonCard';
import { notFound } from 'next/navigation';
import { use, useMemo, useState } from 'react';
import Dropdown from './dropDown';
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
import { Label } from "@/components/ui/label";


export default function SearchList({ pokemonList }: { pokemonList:Promise<Pokemon[]> }) {

  const pokemons = use(pokemonList)

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

  if (!filteredPokemons.length) {
    <p> No pokemon found</p>;
  }
  return (
    <div className="content-grid">
      <section className="mb-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">TYPES</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {POKEMONTYPES.map((type) => {
              return (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={filters.types.includes(type)}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleType(type);
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="number"
          placeholder="Enter Weight"
          onChange={(e) =>
            addWeightFilter({ value: Number(e.target.value), operator: filters.weight.operator })
          }
          id="weight-input"
        ></Input>
        <RadioGroup
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
            <Label htmlFor="op-gte">Greater than</Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem id="op-lte" value="lte" />
            <Label htmlFor="op-lte">Lesser than</Label>
          </div>
        </RadioGroup>
      </section>
      <ul className="grid grid-cols-4 breakout gap-4">
        {filteredPokemons.map((p: Pokemon) => {
          return (
            <li key={p.name}>
              <PokemonCard pokemon={p}></PokemonCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
