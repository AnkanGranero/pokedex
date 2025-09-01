'use client';
import { Pokemon } from '@/types/pokemon';
import PokemonCard from './pokemonCard';
import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TYPES = ['fire', 'water', 'grass', 'normal'];

export default function SearchList({ pokemonList }: { pokemonList: Pokemon[] }) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  function setFilterType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }
  const filteredPokemons = useMemo(() => {
    if (!selectedTypes.length) return pokemonList;
    return pokemonList.filter((p) => p.types.some((t) => selectedTypes.includes(t.type.name)));
  }, [pokemonList, selectedTypes]);

  if (!filteredPokemons.length) {
    <p> No pokemon found</p>;
  }
  return (
    <div className='content-grid'>
      <div >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">TYPES</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {TYPES.map((type) => {
              return (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onSelect={(e) => {
                    e.preventDefault();
                    setFilterType(type);
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
