"use client";

import Hero from "../Components/hero";
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ActiveNav from "../Components/active-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ProffesionCard({ title, description, icon: Icon }: { title: string, description: string, icon: React.ComponentType<{className?:string, size?: number}> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`flex flex-col justify-center items-center border-2 w-full h-32 xl:h-32 2xl:h-64 rounded-lg shadow-xl pt-2 pb-2 bg-white cursor-pointer transition-all duration-300 hover:shadow-2xl overflow-hidden ${isExpanded ? 'xl:h-48' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
        {/* Show full content on 2xl screens and up */}
        <div className="hidden 2xl:flex 2xl:flex-col 2xl:justify-start 2xl:items-center 2xl:h-full 2xl:pt-4">
          <Icon className="text-[#F1BDAF]" size={40}/>
          <h2 className="2xl:text-xl xl:text-lg text-black font-bold text-center mt-2" dir="rtl">{title}</h2>
          <div className="2xl:flex-1 2xl:w-full 2xl:overflow-y-auto 2xl:mt-4">
            <p className="2xl:text-lg xl:text-sm text-gray-700 text-center leading-relaxed w-full" dir="rtl">
              {description}
            </p>
          </div>
        </div>

        {/* Show expandable content on xl screens only */}
        <div className="2xl:hidden flex flex-col justify-between items-center h-full">
          {!isExpanded ? (
            <>
              <div className="flex flex-col items-center">
                <Icon className="text-[#F1BDAF]" size={40}/>
                <h2 className="2xl:text-xl xl:text-lg text-black font-bold text-center mt-2" dir="rtl">{title}</h2>
              </div>
              <div className="mb-2 animate-bounce">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#F1BDAF] border-t-2"></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mb-2">
                <h2 className="text-lg text-black font-bold text-center" dir="rtl">{title}</h2>
              </div>
              <div className="h-full w-full overflow-y-auto">
                <p className="2xl:text-lg xl:text-base text-gray-700 text-center leading-relaxed w-full px-0 whitespace-normal max-w-none" dir="rtl" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>
                  {description}
                </p>
              </div>
              <div className="mt-2">
                <div className="animate-bounce">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#F1BDAF] border-b-2"></div>
                </div>
              </div>
            </>
          )}
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
          <div className="self-start shadow-2xl mt-10 mr-30">
            <Image 
              src="/imageforaboutpage.jpg" 
              alt="about" 
              width={500}
              height={500}
              className="w-auto 2xl:h-[800px] xl:h-[700px] object-cover shadow-2xl rounded-lg"
            />
          </div>
          <div className="flex flex-col w-1/2 ml-auto min-h-full">
            <h1 className="2xl:text-5xl xl:text-4xl font-bold text-black 2xl:my-10 xl:mt-10 xl:mb-3 text-right" dir="rtl">
              קצת <span className="text-[#F1BDAF]">עליי</span> ועל <span className="text-[#F1BDAF]">הסיפור שלי</span>
            </h1>
            <h2 className="2xl:text-xl xl:text-lg text-gray-700 mb-5 text-right" dir="rtl">
            היי, אני רויטל פרצלינה, נשואה לרן ואמא ליעלי וגיאצ'וק המקסימים <br></br>
לפני מספר שנים הרגשתי שהגיע הרגע לשים את האהבה הגדולה שלי לצילום במרכז חיי המקצועיים. במסגרת הלימודית הרחבתי את הניסיון שלי בצילום ושם הבנתי שאני בעצם הכי אוהבת לעבוד עם אנשים. <br></br>
מי שמכיר אותי יודע שאני אוהבת לטייל בטבע ולגלות מקומות יפים, שאסתטיקה מאוד חשובה לי בתהליך של הצילום. ההקפדה על הלוקיישן המתאים ביותר, ועל ייעוץ סטיילינג שיאפשרו לייצר הרמוניה ויזואלית, הם חלק בלתי נפרד מהגישה המקצועית שלי. <br></br>
בצילום אני מרגישה את היכולת להתבונן על העולם מזווית שונה, ולתפוס רגעים קסומים. אני זוכה להכיר מקרוב מגוון רחב של אנשים, לחוות אתכם רגעים בלתי נשכחים ולהעניק לכם זיכרונות שילוו אתכם לכל החיים. <br></br>
אני מזמינה אתכם לחלוק איתי את הרגעים השמחים, המרגשים של חייכם, להפוך כל רגע לזיכרון ולתת לעצמכם ולקרובים לכם מתנה ייחודית, נצחית ומרגשת.
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
            <div className="w-full flex justify-center my-4">
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