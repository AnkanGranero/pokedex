import SearchInput from '@/components/search-input';
import SearchList from '@/components/search-list';
import { getPokeTypes, pokemonSearch } from '@/lib/utils';
import { Suspense } from 'react';
import LoadingPage from './loading';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { query } = await searchParams;

  const results = pokemonSearch(query);
  const pokemonTypes = getPokeTypes()

  return (

    <div className="full-width min-h-full grid grid-rows-[auto,1fr] bg-[#5ee05e]">
      <section className='full-width bg-white'>
        <SearchInput query={query} />
      </section>
      <div className="full-width">
        <Suspense key={query} fallback={<LoadingPage />}>
          <SearchList pokemonList={results} pokemonTypes={pokemonTypes} />
        </Suspense>
      </div>
    </div>

  );
}
