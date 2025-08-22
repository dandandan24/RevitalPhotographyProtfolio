'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import path from "path";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MobileMenu = () => (
    <div className="lg:hidden mobile-menu-container flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-6 right-6 text-3xl text-black !text-black hover:text-[#F1BDAF] transition-colors"
        aria-label="Close menu"
      >
        ✕
      </button>
      
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="block">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={120} 
            height={48} 
            className="h-12 w-auto"
            priority
            quality={100}
          />
        </Link>
      </div>
      
      <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Link 
          href="/" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            pathname === "/" ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          דף הבית
        </Link>
        <Link 
          href="/Gallery" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            pathname === "/Gallery" ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          גלריה
        </Link>
        <Link 
          href="/Packages" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            pathname === "/Packages" ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          חבילות צילום
        </Link>
        <Link 
          href="/Recommendations" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            pathname === "/Recommendations" ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          המלצות
        </Link>
        <Link 
          href="/Contact" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            pathname === "/Contact" ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          צור קשר
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="flex justify-between w-full min-h-16 px-5 z-50 bg-white/90 backdrop-blur-md shadow-md items-center fixed top-0 left-0 right-0 lg:relative lg:top-auto lg:left-auto lg:right-auto">
      <Logo />
      
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-gray-800 hover:text-[#F1BDAF] transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
      </button>

      {/* Desktop Navigation - Keep exactly as is for larger screens */}
      <div className="hidden lg:flex justify-end space-x-16 pr-8 items-center min-w-[600px]">
        <NavButton title="צור קשר" href="/Contact" isActive={pathname === "/Contact"} />
        <NavButton title="המלצות" href="/Recommendations" isActive={pathname === "/Recommendations"} />
        <NavButton title="חבילות צילום" href="/Packages" isActive={pathname === "/Packages"} />
        <NavButton title="גלריה" href="/Gallery" isActive={pathname === "/Gallery"} />
        <NavButton title="דף הבית" href="/" isActive={pathname === "/"} />   
      </div>

      {/* Mobile Navigation Menu - Rendered via Portal */}
      {isMenuOpen && mounted && createPortal(
        <MobileMenu />,
        document.body
      )}
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center no-hover">
      <Image src="/logo.png" alt="Revital Photography" width={180} height={64} priority className="h-12 w-auto" />
    </Link>
  );
}

function NavButton({ title, href, isActive }: { title: string, href: string, isActive: boolean }) {
  return (
    <Link href={href} className={`text-xl font-bold text-gray-800 transition-all duration-200 ${
      isActive 
        ? 'border-b-2 border-[#F1BDAF] pb-1 text-[#F1BDAF]' 
        : 'hover:border-b-2 hover:border-[#F1BDAF] hover:pb-1'
    }`}>
      {title}
    </Link>
  );
} 