import Search from '@/components/search';
import SearchList from '@/components/searchList';
import { pokemonSearch } from '@/lib/utils';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { query } = await searchParams;
  if (!query) return;
  const results = await pokemonSearch(query);
  
  return (
    <div className='content-grid'>
        <Search></Search>
        <SearchList pokemonList={results}></SearchList>
    </div>
  );
}
