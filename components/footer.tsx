import Image from "next/image"
export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white full-width p-20">
      <div>
        <div className=" flex items-center flex justify-center">
          <Image src="/logo.png" alt="" width="300" height="300" className="w-auto h-15 mr-4"></Image>
          <h2 className='text-4xl'>Pokédex</h2>
        </div>
      </div>
      <p className="m-10 text-center text-2xl">explore the world of pokémon</p>
      <nav className="flex justify-center">
        <a href="">
          <Image src="/Facebook.svg" alt="" width="300" height="300" className="w-auto mr-8"></Image>
        </a>
        <a href="">
          <Image src="/Instagram.svg" alt="" width="300" height="300" className="w-auto mr-8"></Image>
        </a>
      </nav>
    </footer>
  );
}
