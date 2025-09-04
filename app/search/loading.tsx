import Image from 'next/image';
export default function LoadingPage() {
  return (
    <main className="flex items-center justify-center flex-col flex-1">
      <Image
        src="/loading-pica.webp"
        height={300}
        width={300}
        alt="loading picachu"
        className="animate-bounce h-70 w-70"
      ></Image>
      <p className="text-4xl font-bold mt-4">
        Loading
        <span className="after:inline-block after:w-[3ch]  after:animate-dots after:content-['']"></span>
      </p>
    </main>
  );
}
