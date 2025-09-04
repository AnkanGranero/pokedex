import Link from 'next/link';
import Image from 'next/image';
export default function NavigationBar() {
  const navLinks = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Pokedex',
      url: '/pokedex',
    },
    {
      name: 'Types',
      url: '/types',
    },
    {
      name: 'Favourites',
      url: '/favourites',
    },
  ];
  return (
    <nav className="breakout p-5">
      <div className='flex justify-between h-full'>
        <div className=" flex items-center">
          <Image src="/logo.png" alt="" width="300" height="300" className="w-auto h-15 mr-8"></Image>
          <h2 className='text-4xl bg-gradient-to-r from-purple-800 to-blue-800 text-transparent bg-clip-text'>Pokédex</h2>
        </div>
        <div className="h-full flex items-center font-bold text-xl ">
          {navLinks.map((link) => {
            return (
              <Link href={link.url} key={link.name} className='ml-8'>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
