import { Input } from '@/components/ui/input';
import Form from 'next/form';
export default function Search({ query }: { query?: string }) {
  return (
    <Form className="flex justify-center py-10" action="/search">
      <Input
        placeholder="Search for a Pokémon..."
        defaultValue={query}
        className="w-[70%] p-5"
        name="query"
      ></Input>
    </Form>
  );
}
