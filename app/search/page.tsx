import SearchInput from '@/components/search-input';
import SearchList from '@/components/search-list';
import { pokemonSearch } from '@/lib/utils';
import { Suspense } from 'react';
import LoadingPage from './loading';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  
  const { query } = await searchParams;
  
  const results = pokemonSearch(query);

  return (
    <div className="min-h-dvh bg-[#5ee05e] flex flex-col">
      <section className='full-width bg-white'>
      <SearchInput query={query} />
      </section>
    <Suspense key={query} fallback={<LoadingPage/>}>
        <SearchList pokemonList={results} />
      </Suspense>  
    </div>
  );
}
