"use client";

import Hero from "../Components/hero";
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ActiveNav from "../Components/active-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ProffesionCard({ title, description, icon: Icon }: { title: string, description: string, icon: React.ComponentType<{className?:string, size?: number}> }) {
  return (
    <div 
      className="flex flex-col justify-center items-center border-2 w-full 2xl:h-64 xl:h-55 rounded-lg shadow-xl pt-2 pb-2 bg-white transition-all duration-300 hover:shadow-2xl overflow-hidden"
    >
        {/* Show full content on all screen sizes */}
        <div className="flex flex-col justify-start items-center h-full 2xl:pt-4 xl:pt-2">
          <Icon className="text-[#F1BDAF]" size={40}/>
          <h2 className="text-xl text-black font-bold text-center 2xl:mt-2 xl:mt-1" dir="rtl">{title}</h2>
          <div className="flex-1 w-full overflow-y-auto 2xl:mt-4 xl:mt-0">
            <p className="2xl:text-lg xl:text-md text-gray-700 text-center leading-relaxed w-full p-1" dir="rtl">
              {description}
            </p>
          </div>
        </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <ActiveNav href="/About" />
      <Hero background="bg-white" justify="start">
        <div className="flex flex-row justify-end w-full relative">
          <div className="self-start mt-10 mr-15 -ml-15">
            <Image 
              src="/StudioAboutImage.jpg" 
              alt="about" 
              width={500}
              height={500}
              className="w-auto 2xl:h-[800px] xl:h-[700px] object-cover shadow-2xl rounded-lg"
            />
          </div>
          <div className="flex flex-col w-1/2 ml-auto min-h-full -mr-15">
            <h1 className="2xl:text-5xl xl:text-4xl font-bold text-black 2xl:my-10 xl:mt-10 xl:mb-3 text-right" dir="rtl">
              קצת <span className="text-[#F1BDAF]">עליי</span> ועל <span className="text-[#F1BDAF]">הסיפור שלי</span>
            </h1>
            <h2 className="2xl:text-xl xl:text-lg text-gray-700 mb-2 text-center text-justify" dir="rtl">
            היי, אני רויטל פרצלינה, נשואה לרן ואמא ליעלי וגיאצ'וק המקסימים. <br></br>
לפני מספר שנים הרגשתי שהגיע הרגע לשים את האהבה הגדולה שלי לצילום במרכז חיי המקצועיים.<br></br><br className="2xl:block " />
 בלימודיי הרחבתי את הניסיון שלי בצילום ושם הבנתי שאני הכי אוהבת לעבוד עם אנשים.
ההקפדה על הלוקיישן המתאים ועל ייעוץ סטיילינג שמייצרים הרמוניה ויזואלית הם חלק בלתי נפרד מהגישה המקצועית שלי. <br></br><br className="2xl:block" />
בצילום אני אוהבת להתבונן על העולם מזווית שונה, לתפוס רגעים קסומים ולהעניק לכם זיכרונות שילוו אתכם לכל החיים. 
אני מזמינה אתכם לחלוק איתי את הרגעים השמחים והמרגשים של חייכם, להפוך כל רגע לזיכרון ולתת לעצמכם ולקרובים לכם מתנה ייחודית ונצחית.
            </h2>
            <div className="border-2 border-[#F1BDAF] 2xl:my-5 xl:mt-0 xl:mb-2 w-full">
            </div>
            <div className="grid grid-cols-4 gap-2 w-full items-start 2xl:h-auto xl:h-50">
              <div className="w-full overflow-hidden shadow-xl rounded-lg p-0" >
                <ProffesionCard title="אלבום" description="עיצוב והדפסת אלבומים ומגוון של הדפסות תמונות" icon = {AlbumIcon}></ProffesionCard>
              </div>
              <div className="w-full overflow-hidden shadow-xl rounded-lg">
                <ProffesionCard title="עריכה" description=" התמונות עוברות עריכה ברמה גבוהה מאוד עם דגש לפרטים" icon = {EditIcon}></ProffesionCard>
              </div>
              <div className="w-full overflow-hidden shadow-xl rounded-lg">
                <ProffesionCard title="אביזרים" description="מתאימה מגוון אביזרים שגורמים לתמונות להיות יותר מיוחדות" icon = {PaletteIcon}></ProffesionCard>
              </div>
              <div className="w-full overflow-hidden shadow-xl rounded-lg">
                <ProffesionCard title="צילום" description="בעלת תואר הנדסאי בצילום ומדיה דיגיטלית ועם 11 שנות ניסיון" icon = {CameraIcon}>
                </ProffesionCard>
              </div>
            </div>
            <div className="w-full flex justify-center 2xl:mt-20 xl:mt-14">
              <Button asChild variant="standard" size="lg" className="w-50">
                <Link href="/Contact">ליצירת זכרונות לכל החיים</Link>
              </Button>
            </div>
          </div>
      
        </div>
      </Hero>
    </>
  );
} 