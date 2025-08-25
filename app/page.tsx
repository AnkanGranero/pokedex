import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  const max = 1000;
  const min = 1;
  function randomId(): number {
   return Math.floor(Math.random() * (max - min) + min);
  }
  return (
    <main>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch 'em all!</h1>
        <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
        <Link href={`single/${randomId()}`}>        
        <button className="btn-primary">
          <Image
            src="/Dice.svg"
            width={25}
            height={25}
            alt="Dice"
            />
          Random Pokémon</button>
            </Link>
      </section>
    </main>
  );
}
