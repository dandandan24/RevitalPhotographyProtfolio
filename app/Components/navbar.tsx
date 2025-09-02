'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import path from "path";

export default function Navbar() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const stripTrailingSlash = (p: string) => (p !== '/' && p?.endsWith('/') ? p.slice(0, -1) : p);
  const rawPath = pathname || '/';
  const withoutBase = rawPath.startsWith(basePath) ? rawPath.slice(basePath.length) || '/' : rawPath;
  const normalizedPath = stripTrailingSlash(withoutBase) || '/';

  const isActivePath = (href: string): boolean => {
    const addSlash = (p: string) => (p.endsWith('/') ? p : p + '/');
    const rmSlash = stripTrailingSlash;
    const candidates = [
      href,
      rmSlash(href),
      addSlash(href),
      basePath + href,
      rmSlash(basePath + href),
      addSlash(basePath + href),
    ];
    const current = rawPath;
    return candidates.some(c => c === current);
  };
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
            src={`${basePath}/logo.png`} 
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
            isActivePath('/') ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          דף הבית
        </Link>
        <Link 
          href="/Gallery" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            isActivePath('/Gallery') ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          גלריה
        </Link>
        <Link 
          href="/Packages" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            isActivePath('/Packages') ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          חבילות צילום
        </Link>
        <Link 
          href="/Recommendations" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            isActivePath('/Recommendations') ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          המלצות
        </Link>
        <Link 
          href="/Contact" 
          className={`text-2xl font-bold text-black !text-black transition-colors ${
            isActivePath('/Contact') ? 'text-[#F1BDAF] border-b-2 border-[#F1BDAF] pb-1' : 'hover:text-[#F1BDAF]'
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
      <div className="hidden lg:flex justify-end gap-16 pr-8 items-center min-w-[600px]">
        <NavButton title="צור קשר" href="/Contact" isActive={isActivePath('/Contact')} />
        <NavButton title="המלצות" href="/Recommendations" isActive={isActivePath('/Recommendations')} />
        <NavButton title="חבילות צילום" href="/Packages" isActive={isActivePath('/Packages')} />
        <NavButton title="גלריה" href="/Gallery" isActive={isActivePath('/Gallery')} />
        <NavButton title="דף הבית" href="/" isActive={isActivePath('/')} />   
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <Link href="/" className="flex items-center no-hover">
      <Image src={`${basePath}/logo.png`} alt="Revital Photography" width={180} height={64} priority className="h-12 w-auto" />
    </Link>
  );
}

function NavButton({ title, href, isActive }: { title: string, href: string, isActive: boolean }) {
  const pathname = usePathname() || '/';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const stripTrailingSlash = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);
  const current = stripTrailingSlash(pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname) || '/';
  const target = stripTrailingSlash(href);
  const active = current === target;

  return (
    <Link href={href} className={`text-xl font-bold text-gray-800 transition-all duration-200 ${
      active 
        ? 'border-b-2 border-[#F1BDAF] pb-1 text-[#F1BDAF]' 
        : 'hover:border-b-2 hover:border-[#F1BDAF] hover:pb-1'
    }`}>
      {title}
    </Link>
  );
}