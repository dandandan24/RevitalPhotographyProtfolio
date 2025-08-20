'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActiveNav from '../Components/active-nav';

// Sample award-winning photos - you can replace these with actual photos
const awardPhotos = [
  {
    id: 1,
    src: '/AwardWinningImages/Award1.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 2,
    src: '/AwardWinningImages/Award2.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 3,
    src: '/AwardWinningImages/Award3.gif',
    alt: 'Award Winning Photo 3',
    title: 'תמונה זוכת פרס 3',
  },
  {
    id: 4,
    src: '/AwardWinningImages/Award4.gif',
    alt: 'Award Winning Photo 4',
    title: 'תמונה זוכת פרס 4',
  },
  {
    id: 5,
    src: '/AwardWinningImages/Award5.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 6,
    src: '/AwardWinningImages/Award6.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 7,
    src: '/AwardWinningImages/Award7.gif',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 8,
    src: '/AwardWinningImages/Award8.jpg',
    alt: 'Award Winning Photo 3',
  },
  {
    id: 9,
    src: '/AwardWinningImages/Award9.jpg',
    alt: 'Award Winning Photo 4',
  },
  {
    id: 10,
    src: '/AwardWinningImages/Award10.gif',
    alt: 'Award Winning Photo 5',
  }
];

export default function Recommendations() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === awardPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? awardPhotos.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPhotoIndex]);

  return (
    <>
      <ActiveNav href="/Recommendations" />
      
      {/* Award Winning Photos Section */}
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Layout - Carousel and Recommendations Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-6 2xl:gap-12 items-start">
            {/* Client Recommendations Section - Left Side */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-right" dir="rtl">
                המלצות <span className="text-[#F1BDAF]">לקוחות</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 text-right" dir="rtl">
                מה הלקוחות שלנו אומרים על החוויה והתוצאות של צילומים מקצועיים
              </p>
              
              <div className="space-y-6 max-h-[500px] xl:max-h-[500px] 2xl:max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#F1BDAF] scrollbar-track-gray-100 mt-15">
                {/* Recommendation 1 */}
                <div className="bg-white p-6 xl:p-5 2xl:p-8 rounded-xl shadow-lg border-l-4 border-[#F1BDAF]">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-[#F1BDAF] rounded-full flex items-center justify-center text-white font-bold text-lg xl:text-base 2xl:text-2xl">
                      ש
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 xl:text-sm 2xl:text-lg" dir="rtl">שירה כהן</h3>
                      <p className="text-gray-600 text-sm mb-3 xl:text-xs 2xl:text-base" dir="rtl">צילומי הריון</p>
                      <p className="text-gray-700 leading-relaxed xl:text-sm 2xl:text-lg" dir="rtl">
                        "רויטל יצרה עבורנו חוויה מדהימה! התמונות יצאו מושלמות והאווירה הייתה כל כך נעימה. 
                        היא מקצועית, יצירתית ויודעת בדיוק איך לתפוס את הרגעים המיוחדים. ממליצה בחום!"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation 2 */}
                <div className="bg-white p-6 xl:p-5 2xl:p-8 rounded-xl shadow-lg border-l-4 border-[#F1BDAF]">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-[#F1BDAF] rounded-full flex items-center justify-center text-white font-bold text-lg xl:text-base 2xl:text-2xl">
                      ד
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 xl:text-sm 2xl:text-lg" dir="rtl">דן לוי</h3>
                      <p className="text-gray-600 text-sm mb-3 xl:text-xs 2xl:text-base" dir="rtl">צילומי משפחה</p>
                      <p className="text-gray-700 leading-relaxed xl:text-sm 2xl:text-lg" dir="rtl">
                        "הצילומים המשפחתיים שלנו יצאו פשוט מדהימים! רויטל יודעת איך לגרום לילדים להרגיש בנוח 
                        ולכולנו ליהנות מהתהליך. התמונות מלאות חיים ואהבה. תודה רבה!"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation 3 */}
                <div className="bg-white p-6 xl:p-5 2xl:p-8 rounded-xl shadow-lg border-l-4 border-[#F1BDAF]">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-[#F1BDAF] rounded-full flex items-center justify-center text-white font-bold text-lg xl:text-base 2xl:text-2xl">
                      מ
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 xl:text-sm 2xl:text-lg" dir="rtl">מיכל רוזן</h3>
                      <p className="text-gray-600 text-sm mb-3 xl:text-xs 2xl:text-base" dir="rtl">צילומי בת מצווה</p>
                      <p className="text-gray-700 leading-relaxed xl:text-sm 2xl:text-lg" dir="rtl">
                        "צילומי בת המצווה של בתי היו חוויה בלתי נשכחת! רויטל יצרה אווירה קסומה 
                        והתמונות יצאו מעבר לכל דמיון. היא מקצועית, סבלנית ויודעת בדיוק איך להעצים את הילדה."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation 4 */}
                <div className="bg-white p-6 xl:p-5 2xl:p-8 rounded-xl shadow-lg border-l-4 border-[#F1BDAF]">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-[#F1BDAF] rounded-full flex items-center justify-center text-white font-bold text-lg xl:text-base 2xl:text-2xl">
                      א
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 xl:text-sm 2xl:text-lg" dir="rtl">אבי כהן</h3>
                      <p className="text-gray-600 text-sm mb-3 xl:text-xs 2xl:text-base" dir="rtl">צילומי תדמית</p>
                      <p className="text-gray-700 leading-relaxed xl:text-sm 2xl:text-lg" dir="rtl">
                        "רויטל עזרה לי ליצור תמונות תדמית מקצועיות ומרשימות. היא יודעת איך להבליט 
                        את היתרונות שלי ולתפוס את המבט הנכון. התמונות עזרו לי מאוד בקריירה!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Carousel - Right Side */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-right" dir="rtl">
                תמונות <span className="text-[#F1BDAF]">זוכות פרסים</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 text-right" dir="rtl">
                גלריית התמונות הטובות ביותר שזכו להכרה מקצועית ופרסים בתחרויות צילום בינלאומיות
              </p>
              
              <div className="relative max-w-5xl mx-auto">
                {/* Main Photo Display */}
                <div className="relative h-auto rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={awardPhotos[currentPhotoIndex].src}
                    alt={awardPhotos[currentPhotoIndex].alt}
                    className="w-full h-auto object-contain transition-all duration-500 ease-in-out"
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 xl:p-2 2xl:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} className="xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" />
                </button>
                
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 xl:p-2 2xl:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} className="xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" />
                </button>

                {/* Photo Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {awardPhotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentPhotoIndex 
                          ? 'bg-[#F1BDAF] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}