'use client';

import Image from "next/image";
import { useEffect } from "react";
import ActiveNav from "./Components/active-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon, Clock, MapPin, Mail, Phone} from "lucide-react";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";

function ProffesionCard({ title, description, icon: Icon }: { title: string, description: string, icon: React.ComponentType<{className?:string, size?: number}> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="flex flex-col justify-center items-center border-2 w-full 2xl:h-64 xl:h-60 rounded-lg shadow-xl pt-2 pb-2 bg-white transition-all duration-300 hover:shadow-2xl overflow-hidden"
    >
        {/* Show full content on all screen sizes */}
        <div className="flex flex-col justify-start items-center h-full 2xl:pt-4 xl:pt-2">
          <Icon className="text-[#F1BDAF]" size={40}/>
          <h2 className="text-xl text-black font-bold text-center 2xl:mt-2 xl:mt-1" dir="rtl">{title}</h2>
          <div className="flex-1 w-full overflow-y-auto 2xl:mt-4 xl:mt-2">
            <p className="text-lg text-gray-700 text-center leading-relaxed w-full p-1" dir="rtl">
              {description}
            </p>
          </div>
        </div>
    </div>
  )
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add home page navigation styling
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('home-page-nav');
      nav.classList.add('home-navbar'); // Add specific class for home page
      console.log('Navbar classes after adding:', nav.className);
      console.log('Navbar has home-navbar class:', nav.classList.contains('home-navbar'));
    }

    // Add class to body for home page styling
    document.body.classList.add('home-page');

    // On mobile, ensure page starts at the top when refreshed
    if (window.innerWidth < 1024) { // lg breakpoint
      window.scrollTo(0, 0);
    }

    // Scroll detection for navigation bar background
    const handleScroll = () => {
      if (window.innerWidth < 1024) { // Only on mobile
        const nav = document.querySelector('nav');
        if (nav) {
          if (window.scrollY > 10) { // If scrolled more than 10px
            nav.classList.add('scrolled');
            console.log('Added scrolled class, scrollY:', window.scrollY);
          } else {
            nav.classList.remove('scrolled');
            console.log('Removed scrolled class, scrollY:', window.scrollY);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the class when leaving the page
    return () => {
      if (nav) {
        nav.classList.remove('home-page-nav');
        nav.classList.remove('home-navbar'); // Remove home page class
      }
      document.body.classList.remove('home-page');
      window.removeEventListener('scroll', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ActiveNav href="/" />
      <div className="h-screen flex flex-col justify-start md:justify-center items-center md:items-end bg-gray-500 px-8 md:px-16 lg:px-32 bg-cover bg-contain md:bg-cover bg-no-repeat pt-20 md:pt-0 home-hero-section" style={{
        backgroundImage: `url('${isMobile ? '/imageforbackgroundhomepagemobile.jpg.jpg' : '/imageforbackgroundhomepage.jpg'}')`, 
        backgroundPosition: "left center"
      }}>  
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white my-2 md:my-8 lg:my-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-center md:text-right" dir="rtl">ליצור <span className="text-[#F1BDAF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">זכרונות</span> שנשארים</h1>
        <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-center md:text-right" dir="rtl">תהפכו את האירועים,<br></br>
           החוויות והרגעים שלכם לזכרונות מלאי חיים<br></br>
           שיישארו אתכם שנים רבות</h1>
        <Button asChild variant="standard" size="xl" className="text-base md:text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-4">
          <Link href="/Contact">לחוויה בלתי נשכחת</Link>
        </Button>
      </div>
      
      {/* Bouncing Arrow - Only visible on mobile, positioned at bottom */}
      <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-sm font-medium mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" dir="rtl">לקריאה עליי</p>
        <div className="animate-bounce flex justify-center">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#F1BDAF] border-t-2"></div>
        </div>
      </div>

      {/* Mobile About Section - Only visible on mobile */}
      <div id="about-section" className="lg:hidden bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* About Title */}
          <h1 className="text-3xl font-bold text-black text-center mb-8" dir="rtl">
            קצת <span className="text-[#F1BDAF]">עליי</span> ועל <span className="text-[#F1BDAF]">הסיפור שלי</span>
          </h1>
          
          {/* About Image */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/imageforaboutpage.jpg" 
              alt="about" 
              width={300}
              height={300}
              className="w-auto h-64 object-cover shadow-2xl rounded-lg"
            />
          </div>
          
          {/* About Text */}
          <div className="text-center mb-8">
            <p className="text-base text-gray-700 leading-relaxed" dir="rtl">
              היי, אני רויטל פרצלינה, נשואה לרן ואמא ליעלי וגיאצ'וק המקסימים. לפני מספר שנים הרגשתי שהגיע הרגע לשים את האהבה הגדולה שלי לצילום במרכז חיי המקצועיים. במסגרת הלימודית הרחבתי את הניסיון שלי בצילום ושם הבנתי שאני בעצם הכי אוהבת לעבוד עם אנשים.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mt-4" dir="rtl">
              מי שמכיר אותי יודע שאני אוהבת לטייל בטבע ולגלות מקומות יפים, שאסתטיקה מאוד חשובה לי בתהליך של הצילום. ההקפדה על הלוקיישן המתאים ביותר, ועל ייעוץ סטיילינג שיאפשרו לייצר הרמוניה ויזואלית, הם חלק בלתי נפרד מהגישה המקצועית שלי.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mt-4" dir="rtl">
              בצילום אני מרגישה את היכולת להתבונן על העולם מזווית שונה, ולתפוס רגעים קסומים. אני זוכה להכיר מקרוב מגוון רחב של אנשים, לחוות אתכם רגעים בלתי נשכחים ולהעניק לכם זיכרונות שילוו אתכם לכל החיים.
            </p>
          </div>
          
          {/* Divider */}
          <div className="border-2 border-[#F1BDAF] w-full mb-8"></div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <ProffesionCard title="אלבום" description="עיצוב והדפסת אלבומים ומגוון של הדפסות תמונות" icon={AlbumIcon} />
            <ProffesionCard title="עריכה" description="התמונות עוברות עריכה ברמה גבוהה מאוד עם דגש לפרטים" icon={EditIcon} />
            <ProffesionCard title="אביזרים" description="מתאימה מגוון אביזרים שגורמים לתמונות להיות יותר מיוחדות" icon={PaletteIcon} />
            <ProffesionCard title="צילום" description="בעלת תואר הנדסאי בצילום ומדיה דיגיטלית ועם 11 שנות ניסיון" icon={CameraIcon} />
          </div>
          
          {/* Contact Button */}
          <div className="text-center">
            <Button asChild variant="standard" size="lg" className="w-full max-w-xs">
              <Link href="/Contact">ליצירת זכרונות לכל החיים</Link>
            </Button>
          </div>
        </div>
                    {/* Mobile Footer with Contact Details */}
                    <footer className="border-t bg-white w-full mt-8 md:hidden">
        <div className="w-full mx-auto xl:w-[90%] px-4 sm:px-6 lg:px-8 xl:px-0 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">רשתות חברתיות</h3>
              <div className="flex flex-row gap-4">
                <a href="https://www.instagram.com/revitalphotography/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="size-6 hover:text-pink-500 transition-colors" />
                </a>
                <a href="https://www.facebook.com/revitalphotography" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="size-6 hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://api.whatsapp.com/send?phone=972548788851" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp className="size-6 hover:text-green-500 transition-colors" />
                </a>
                <a href="https://www.tiktok.com/@revital_photography" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <FaTiktok className="size-6 hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטי התקשרות</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone size={18} style={{ color: '#F1BDAF' }} />
                  <span>054-8788851</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} style={{ color: '#F1BDAF' }} />
                  <a href="mailto:rosenbergdan6@gmail.com" className="hover:underline">rparzelina@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Address / Hours */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטים נוספים</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <MapPin size={18} style={{ color: '#F1BDAF' }} />
                  <span>יהוד</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Clock size={18} style={{ color: '#F1BDAF' }} />
                    <span>ימים א'-ה': 8:00-17:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} style={{ color: '#F1BDAF' }} />
                    <span>ו': 8:00-14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-4 pb-6 text-sm text-gray-500">
          <span className="block text-left" dir="rtl">כל הזכויות שמורות לרויטל פרצלינה</span>
        </div>
      </footer>
      </div>
    </>
  );
}
