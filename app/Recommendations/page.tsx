'use client';
import { useState, useEffect, useRef } from 'react';
import ActiveNav from '../Components/active-nav';
import ReviewCard from '../Components/review-card';
import Image from 'next/image';
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon, Clock, MapPin, Mail, Phone} from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";
// Sample award-winning photos - you can replace these with actual photos
const awardPhotos = [
  {
    id: 1,
    src: '/AwardWinningImages/1.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 2,
    src: '/AwardWinningImages/2.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 3,
    src: '/AwardWinningImages/3.jpg',
    alt: 'Award Winning Photo 3',
    title: 'תמונה זוכת פרס 3',
  },
  {
    id: 4,
    src: '/AwardWinningImages/4.jpg',
    alt: 'Award Winning Photo 4',
    title: 'תמונה זוכת פרס 4',
  },
  {
    id: 5,
    src: '/AwardWinningImages/5.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 6,
    src: '/AwardWinningImages/6.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 7,
    src: '/AwardWinningImages/7.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 8,
    src: '/AwardWinningImages/8.jpg',
    alt: 'Award Winning Photo 3',
  },
  {
    id: 9,
    src: '/AwardWinningImages/9.jpg',
    alt: 'Award Winning Photo 4',
  },
  {
    id: 10,
    src: '/AwardWinningImages/10.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 11,
    src: '/AwardWinningImages/11.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 12,
    src: '/AwardWinningImages/12.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 13,
    src: '/AwardWinningImages/13.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 14,
    src: '/AwardWinningImages/14.jpg',
    alt: 'Award Winning Photo 5',
  },  
  {
    id: 15,
    src: '/AwardWinningImages/15.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 16,
    src: '/AwardWinningImages/16.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 17,
    src: '/AwardWinningImages/17.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 18,
    src: '/AwardWinningImages/18.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 19,
    src: '/AwardWinningImages/19.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 20,
    src: '/AwardWinningImages/20.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 21,
    src: '/AwardWinningImages/21.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 22,
    src: '/AwardWinningImages/22.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 23,
    src: '/AwardWinningImages/23.gif',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 24,
    src: '/AwardWinningImages/24.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 25,
    src: '/AwardWinningImages/25.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 26,
    src: '/AwardWinningImages/26.jpg',
    alt: 'Award Winning Photo 5',
  },
  

  {
    id: 27,
    src: '/AwardWinningImages/27.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 28,
    src: '/AwardWinningImages/28.jpg',
    alt: 'Award Winning Photo 5',
  },
  

    {
      id: 29,
      src: '/AwardWinningImages/29.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 30,
      src: '/AwardWinningImages/30.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 31,
      src: '/AwardWinningImages/31.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 32,
      src: '/AwardWinningImages/32.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 33,
      src: '/AwardWinningImages/33.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 34,
      src: '/AwardWinningImages/34.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    
    {
      id: 35,
      src: '/AwardWinningImages/35.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 36,
      src: '/AwardWinningImages/36.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 37,
      src: '/AwardWinningImages/37.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 38,
      src: '/AwardWinningImages/38.gif',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 39,
      src: '/AwardWinningImages/39.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 40,
      src: '/AwardWinningImages/40.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 41,
      src: '/AwardWinningImages/41.jpg',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 42,
      src: '/AwardWinningImages/42.gif',
      alt: 'Award Winning Photo 5',
    },
    
      


];

// Reviews data
const reviews = [
  {
    name: 'שירה כהן',
    type: 'צילומי הריון',
    review: 'רויטל יצרה עבורנו חוויה מדהימה! התמונות יצאו מושלמות והאווירה הייתה כל כך נעימה. היא מקצועית, יצירתית ויודעת בדיוק איך לתפוס את הרגעים המיוחדים. ממליצה בחום!',
    stars: 5,
    initial: 'ש'
  },
  {
    name: 'דן לוי',
    type: 'צילומי משפחה',
    review: 'הצילומים המשפחתיים שלנו יצאו פשוט מדהימים! רויטל יודעת איך לגרום לילדים להרגיש בנוח ולכולנו ליהנות מהתהליך. התמונות מלאות חיים ואהבה. תודה רבה!',
    stars: 5,
    initial: 'ד'
  },
  {
    name: 'מיכל רוזן',
    type: 'צילומי בת מצווה',
    review: 'צילומי בת המצווה של בתי היו חוויה בלתי נשכחת! רויטל יצרה אווירה קסומה והתמונות יצאו מעבר לכל דמיון. היא מקצועית, סבלנית ויודעת בדיוק איך להעצים את הילדה.',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'אבי כהן',
    type: 'צילומי תדמית',
    review: 'רויטל עזרה לי ליצור תמונות תדמית מקצועיות ומרשימות. היא יודעת איך להבליט את היתרונות שלי ולתפוס את המבט הנכון. התמונות עזרו לי מאוד בקריירה!',
    stars: 5,
    initial: 'א'
  },
  {
    name: 'נועה דוד',
    type: 'צילומי ילדים',
    review: 'הצילומים של הילדים שלנו יצאו פשוט מושלמים! רויטל יודעת איך לגרום להם להרגיש בנוח ולהתנהג טבעי. התמונות מלאות שמחה ואנרגיה.',
    stars: 5,
    initial: 'נ'
  },
  {
    name: 'יוסי מור',
    type: 'צילומי אירועים',
    review: 'רויטל צילמה את החתונה שלנו והיא הייתה פשוט מדהימה! היא תפסה כל רגע מיוחד והתמונות יצאו מעבר לכל דמיון. ממליץ בחום!',
    stars: 5,
    initial: 'י'
  },
  {
    name: 'דנה אברהם',
    type: 'צילומי הריון',
    review: 'הצילומים שלי בהריון יצאו כל כך יפים ורגישים. רויטל יודעת איך להבליט את היופי הטבעי של הגוף בהריון. חוויה מדהימה!',
    stars: 5,
    initial: 'ד'
  },
  {
    name: 'עמיר כהן',
    type: 'צילומי משפחה',
    review: 'הצילומים המשפחתיים שלנו יצאו פשוט מושלמים! רויטל יודעת איך ליצור אווירה נעימה ולגרום לכולנו להרגיש בנוח. התמונות מלאות אהבה וחום.',
    stars: 5,
    initial: 'ע'
  },
  {
    name: 'מיכל לוי',
    type: 'צילומי בת מצווה',
    review: 'צילומי בת המצווה של בתי היו חוויה בלתי נשכחת! רויטל יצרה אווירה קסומה והתמונות יצאו מעבר לכל דמיון. היא מקצועית ויצירתית.',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'רון שפירא',
    type: 'צילומי תדמית',
    review: 'רויטל עזרה לי ליצור תמונות תדמית מקצועיות ומרשימות. היא יודעת איך להבליט את היתרונות שלי ולתפוס את המבט הנכון.',
    stars: 5,
    initial: 'ר'
  },
  {
    name: 'ליאור כהן',
    type: 'צילומי ילדים',
    review: 'הצילומים של הילדים שלנו יצאו פשוט מושלמים! רויטל יודעת איך לגרום להם להרגיש בנוח ולהתנהג טבעי.',
    stars: 5,
    initial: 'ל'
  },
  {
    name: 'שרון דוד',
    type: 'צילומי אירועים',
    review: 'רויטל צילמה את האירוע שלנו והיא הייתה פשוט מדהימה! היא תפסה כל רגע מיוחד והתמונות יצאו מעבר לכל דמיון.',
    stars: 5,
    initial: 'ש'
  },
  {
    name: 'עדי מור',
    type: 'צילומי הריון',
    review: 'הצילומים שלי בהריון יצאו כל כך יפים ורגישים. רויטל יודעת איך להבליט את היופי הטבעי של הגוף בהריון.',
    stars: 5,
    initial: 'ע'
  },
  {
    name: 'גל כהן',
    type: 'צילומי משפחה',
    review: 'הצילומים המשפחתיים שלנו יצאו פשוט מושלמים! רויטל יודעת איך ליצור אווירה נעימה ולגרום לכולנו להרגיש בנוח.',
    stars: 5,
    initial: 'ג'
  },
  {
    name: 'נועה לוי',
    type: 'צילומי בת מצווה',
    review: 'צילומי בת המצווה של בתי היו חוויה בלתי נשכחת! רויטל יצרה אווירה קסומה והתמונות יצאו מעבר לכל דמיון.',
    stars: 5,
    initial: 'נ'
  },
  {
    name: 'יוסי שפירא',
    type: 'צילומי תדמית',
    review: 'רויטל עזרה לי ליצור תמונות תדמית מקצועיות ומרשימות. היא יודעת איך להבליט את היתרונות שלי ולתפוס את המבט הנכון.',
    stars: 5,
    initial: 'י'
  },
  {
    name: 'דנה כהן',
    type: 'צילומי ילדים',
    review: 'הצילומים של הילדים שלנו יצאו פשוט מושלמים! רויטל יודעת איך לגרום להם להרגיש בנוח ולהתנהג טבעי.',
    stars: 5,
    initial: 'ד'
  },
  {
    name: 'עמיר לוי',
    type: 'צילומי אירועים',
    review: 'רויטל צילמה את האירוע שלנו והיא הייתה פשוט מדהימה! היא תפסה כל רגע מיוחד והתמונות יצאו מעבר לכל דמיון.',
    stars: 5,
    initial: 'ע'
  },
  {
    name: 'מיכל שפירא',
    type: 'צילומי הריון',
    review: 'הצילומים שלי בהריון יצאו כל כך יפים ורגישים. רויטל יודעת איך להבליט את היופי הטבעי של הגוף בהריון.',
    stars: 5,
    initial: 'מ'
  }
];

export default function Recommendations() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [photoWidths, setPhotoWidths] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the total width of all photos
  const getTotalWidth = () => {
    return photoWidths.reduce((total, width) => total + width, 0);
  };

  // Measure photo widths after component mounts
  useEffect(() => {
    const measureWidths = () => {
      const widths = photoRefs.current.map(ref => ref?.offsetWidth || 0);
      setPhotoWidths(widths);
    };
    
    // Measure on mount
    measureWidths();
    
    // Reset carousel position on mobile refresh
    if (window.innerWidth < 768) {
      setSlidePosition(0);
    }
    
    // Measure on resize for mobile responsiveness
    window.addEventListener('resize', measureWidths);
    
    // Cleanup
    return () => window.removeEventListener('resize', measureWidths);
  }, []);

  // Continuous sliding motion with infinite loop (Desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return; // Only for desktop
    
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return;

    const duration = 150000; // 90 seconds for one complete cycle (slower)
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate position for infinite loop (duplicate photos for seamless loop)
      const position = -(progress * totalWidth);
      setSlidePosition(position);
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => cancelAnimationFrame(animationId);
  }, [photoWidths]);

  // Mobile-specific animation that's completely independent of scroll events
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Only for mobile
    
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return;

    // Always start from beginning on mobile
    setSlidePosition(0);
    
    // Use CSS animation for completely scroll-independent sliding
    const carouselElement = document.querySelector('.carousel-container .flex');
    if (carouselElement) {
      // Remove any existing transform
      (carouselElement as HTMLElement).style.transform = '';
      
      // Add mobile carousel animation class and set CSS variables
      if (carouselElement) {
        carouselElement.classList.add('mobile-carousel-slide');
        (carouselElement as HTMLElement).style.setProperty('--total-width', `${totalWidth}px`);
        (carouselElement as HTMLElement).style.setProperty('--animation-duration', '210s');
      }
    }
    
    // Cleanup function
    return () => {
      if (carouselElement) {
        carouselElement.classList.remove('mobile-carousel-slide');
        (carouselElement as HTMLElement).style.removeProperty('--total-width');
        (carouselElement as HTMLElement).style.removeProperty('--animation-duration');
      }
    };
  }, [photoWidths]);

  // Debug logging for mobile troubleshooting
  useEffect(() => {
    console.log('Photo widths:', photoWidths);
    console.log('Total width:', getTotalWidth());
    console.log('Slide position:', slidePosition);
  }, [photoWidths, slidePosition]);

  // Calculate progress percentage for the progress bar
  const getProgress = () => {
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return 0;
    
    const elapsed = Date.now() % 60000; // 60 seconds cycle
    return (elapsed / 60000) * 100;
  };

  return (
    <>
      <ActiveNav href="/Recommendations" />
      
      {/* Full-Width Photo Carousel Section */}
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <div className="text-center py-6 md:py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4" dir="rtl">
              תמונות <span className="text-[#F1BDAF]">זוכות פרסים</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 md:px-0" dir="rtl">
              אני גאה לשתף אתכם ברגעי הקסם שתפסתי דרך העדשה – מוזמנים לגלול, להתרשם, ולהרגיש את הקסם בכל תמונה.
            </p>
          </div>

          <div className="relative w-full mx-auto">
            {/* Main Photo Display - Multiple Photos */}
            <div className="relative h-64 md:h-96 overflow-hidden carousel-container">
              <div 
                className="flex w-full h-full transition-transform duration-1000 ease-out"
                style={!isMobile ? { transform: `translateX(${slidePosition}px)` } : {}}
              >
                {/* Original photos */}
                {awardPhotos.map((photo, index) => (
                  <div 
                    key={`original-${photo.id}`}
                    className="flex-shrink-0 h-full"
                    ref={el => { photoRefs.current[index] = el; }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className="h-full w-auto object-cover min-w-0"
                      priority={index < 3}
                    />
                  </div>
                ))}
                {/* Duplicate photos for seamless loop */}
                {awardPhotos.map((photo, index) => (
                  <div 
                    key={`duplicate-${photo.id}`}
                    className="flex-shrink-0 h-full"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className="h-full w-auto object-cover min-w-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Recommendations Section - Full Width Below Carousel */}
      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-right" dir="rtl">
              המלצות <span className="text-[#F1BDAF]">לקוחות</span>
              </h2>
              
            <p className="text-lg text-gray-600 mb-6 text-right" dir="rtl">
              מה הלקוחות שלנו אומרים על החוויה והתוצאות של צילומים מקצועיים
            </p>
                </div>

          <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#F1BDAF] scrollbar-track-gray-100">
            {reviews.map((review, index) => (
              <ReviewCard 
                      key={index}
                name={review.name}
                type={review.type}
                review={review.review}
                stars={review.stars}
                initial={review.initial}
                    />
                  ))}
          </div>
        </div>
      </div>
                  {/* Mobile Footer with Contact Details */}
        <footer className="border-t bg-white w-full mt-8 ">
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
    </>
  );
}