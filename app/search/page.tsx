import Search from '@/components/search';
import SearchList from '@/components/searchList';
import { pokemonSearch } from '@/lib/utils';
import { Suspense } from 'react';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  
  const { query } = await searchParams;
  
  const results = pokemonSearch(query);

  return (
    <div className="content-grid bg-[#5ee05e]">
      <Search query={query} />
      <Suspense key={query} fallback={<p>loading...</p>}>
        <SearchList pokemonList={results} />
      </Suspense>
    </div>
  );
}
