import type { Metadata } from "next";
import { Jaldi, Jersey_10 } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

const jaldi = Jaldi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jaldi"
});

const jersey = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey"
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore the world of Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jaldi.variable} ${jersey.variable} antialiased min-h-dvh grid grid-rows-[auto,1fr,auto]`}
      >
        <header className="content-grid">
          <NavigationBar ></NavigationBar>
        </header>
        <main className="min-h-0 content-grid">

            {children}

        </main>
        <div className="content-grid">
        <Footer />
        </div>
      </body>
    </html>
  );
}
