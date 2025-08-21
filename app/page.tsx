'use client';

import Image from "next/image";
import { useEffect } from "react";
import ActiveNav from "./Components/active-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  useEffect(() => {
    // Add home page navigation styling
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('home-page-nav');
    }

    // Cleanup function to remove the class when leaving the page
    return () => {
      if (nav) {
        nav.classList.remove('home-page-nav');
      }
    };
  }, []);

  return (
    <>
      <ActiveNav href="/" />
      <div className="h-screen flex flex-col justify-center items-end bg-gray-500 px-32 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/imageforbackgroundhomepage.jpg')"}}>  
        <h1 className="text-5xl font-bold text-white my-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" dir="rtl">ליצור <span className="text-[#F1BDAF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">זכרונות</span> שנשארים</h1>
        <h1 className="text-3xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" dir="rtl">תהפכו את האירועים,<br></br>
           החוויות והרגעים שלכם לזכרונות מלאי חיים<br></br>
           שיישארו אתכם שנים רבות</h1>
        <Button asChild variant="standard" size="xl" className="text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-4">
          <Link href="/Contact">לחוויה בלתי נשכחת</Link>
        </Button>
      </div>
    </>
  );
}
