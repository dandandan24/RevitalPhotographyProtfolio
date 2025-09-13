'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

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

function Logo() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <Link href="/" className="flex items-center no-hover">
      <Image src={`${basePath}/logo.png`} alt="Revital Photography" width={180} height={64} priority className="h-12 w-auto" />
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const stripTrailingSlash = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);
  const withoutBase = pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname;
  const normalizedPath = stripTrailingSlash(withoutBase) || '/';
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
    <html lang="en">
      <head>
        <title>רויטל פרצלינה || צלמת בוק בת מצווה | משפחה | הריון | תדמית</title>
        <meta name="description" content="רויטל פרצלינה - צלמת מקצועית המתמחה בצילומי בוק בת מצווה, משפחה, הריון ותדמית. 11 שנות ניסיון, עיצוב אלבומים ועריכה ברמה גבוהה. צור קשר: 054-8788851" />
        <meta name="keywords" content="צלמת, בוק בת מצווה, צילום משפחה, צילום הריון, צילום תדמית, אלבום תמונות, רויטל פרצלינה, צלמת יהוד, צילום מקצועי" />
        <meta name="author" content="רויטל פרצלינה" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="_HgEXJjb8ibOVIFYhhSHz-5Jin9T5B-iN1BUE6ewMp0" />
        
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="רויטל פרצלינה || צלמת בוק בת מצווה | משפחה | הריון | תדמית" />
        <meta property="og:description" content="רויטל פרצלינה - צלמת מקצועית המתמחה בצילומי בוק בת מצווה, משפחה, הריון ותדמית. 11 שנות ניסיון, עיצוב אלבומים ועריכה ברמה גבוהה." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://revital-photography.com" />
        <meta property="og:image" content="https://revital-photography.com/logo.png" />
        <meta property="og:locale" content="he_IL" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="רויטל פרצלינה || צלמת בוק בת מצווה | משפחה | הריון | תדמית" />
        <meta name="twitter:description" content="רויטל פרצלינה - צלמת מקצועית המתמחה בצילומי בוק בת מצווה, משפחה, הריון ותדמית. 11 שנות ניסיון, עיצוב אלבומים ועריכה ברמה גבוהה." />
        <meta name="twitter:image" content="https://revital-photography.com/logo.png" />
        
        {/* Structured Data for Photography Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "רויטל פרצלינה - צלמת מקצועית",
              "description": "צלמת מקצועית המתמחה בצילומי בוק בת מצווה, משפחה, הריון ותדמית",
              "url": "https://revital-photography.com",
              "telephone": "054-8788851",
              "email": "rparzelina@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "יהוד",
                "addressCountry": "IL"
              },
              "openingHours": [
                "Mo-Fr 08:00-17:00",
                "Sa 08:00-14:00"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 32.0333,
                  "longitude": 34.8833
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "שירותי צילום",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "צילום בוק בת מצווה"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "צילום משפחה"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "צילום הריון"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "צילום תדמית"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.instagram.com/revitalphotography/",
                "https://www.facebook.com/revitalphotography",
                "https://www.tiktok.com/@revital_photography"
              ]
            })
          }}
        />
      </head>
      <body>
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
            <NavButton title="צור קשר" href="/Contact" isActive={normalizedPath === "/Contact"} />
            <NavButton title="המלצות" href="/Recommendations" isActive={normalizedPath === "/Recommendations"} />
            <NavButton title="חבילות צילום" href="/Packages" isActive={normalizedPath === "/Packages"} />
            <NavButton title="גלריה" href="/Gallery" isActive={normalizedPath === "/Gallery"} />
            <NavButton title="אודות" href="/About" isActive={normalizedPath === "/About"} />
            <NavButton title="דף הבית" href="/" isActive={normalizedPath === "/"} />   
          </div>

          {/* Mobile Navigation Menu - Rendered via Portal */}
          {isMenuOpen && mounted && createPortal(
            <MobileMenu />,
            document.body
          )}
        </nav>

        {children}
      </body>
    </html>
  );
}
