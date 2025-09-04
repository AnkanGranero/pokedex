import Image from 'next/image';
import Link from 'next/link';
import { randomId } from '@/lib/utils';
import RandomPokemon from '../components/random-pokemon';
import NavigationBar from '@/components/navigation-bar';
import Search from '@/components/search-input'
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="content-grid">

      <section className="full-width items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
        <h1 className="text-center mt-14 text-9xl font-semi-bold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text">
          Gotta catch 'em all!
        </h1>
        <p
          className="text-center text-black text-xl grid "
        >
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <Link href={`single/${randomId()}`} className='flex justify-center'>
          <button className="btn-primary">
            <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
            Random Pokémon
          </button>
        </Link>
      </section>
      <Search></Search>
      <section className="text-center full-width bg-green bg-gradient-to-r from-purple-50 to-purple-100 pb-40">
        <h2 className="text-4xl m-12">Featured Pokemon</h2>
        <ul className="grid grid-cols-4 gap-4 breakout">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <RandomPokemon />
            </li>
          ))}
        </ul>
      </section>
      <Footer/>
    </main>
  );
}
