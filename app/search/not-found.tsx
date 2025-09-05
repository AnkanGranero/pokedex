import Image from 'next/image';
export default function NotFound() {

  return (
    <main className="flex items-center justify-center flex-col flex-1 min-h-[70vh]">
      <Image
        src="/no-pokemon-found.png"
        height={300}
        width={300}
        alt="loading picachu"
        className="h-70 w-70"
      ></Image>
      <p className="text-4xl font-bold mt-4">No pokemon found</p>
    </main>
  );
}
