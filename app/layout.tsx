import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

function NavButton({ title, href }: { title: string, href: string }) {
  return (
    <button>
      <Link href={href} className="text-xl font-bold text-gray-800 hover:border-b-2 hover:border-[#F1BDAF] hover:pb-1 transition-all duration-200">
        {title}
      </Link>
    </button>
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold text-gray-800">Revital</h1>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex justify-between w-full min-h-16 px-5 z-10 bg-white/90 backdrop-blur-md shadow-md">
          <Logo />
          <div className="flex min-w-1/2 space-x-32 px-20">
            <NavButton title="צור קשר" href="/Contact" />
            <NavButton title="המלצות" href="/Recommendations" />
            <NavButton title="חבילות צילום" href="/Packages" />
            <NavButton title="גלריה" href="/Gallery" />
            <NavButton title="אודות" href="/About" />
            <NavButton title="דף הבית" href="/" />   
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
