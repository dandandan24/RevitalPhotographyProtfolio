'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActiveNav from '../Components/active-nav';
import ReviewCard from '../Components/review-card';
import Image from 'next/image';

// Sample award-winning photos - you can replace these with actual photos
const awardPhotos = [
  {
    id: 1,
    src: '/AwardWinningImages/Award1.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 2,
    src: '/AwardWinningImages/Award2.gif',
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
    src: '/AwardWinningImages/Award4.jpg',
    alt: 'Award Winning Photo 4',
    title: 'תמונה זוכת פרס 4',
  },
  {
    id: 5,
    src: '/AwardWinningImages/Award5.gif',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 6,
    src: '/AwardWinningImages/Award6.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 7,
    src: '/AwardWinningImages/Award7.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 8,
    src: '/AwardWinningImages/Award8.gif',
    alt: 'Award Winning Photo 3',
  },
  {
    id: 9,
    src: '/AwardWinningImages/Award9.jpg',
    alt: 'Award Winning Photo 4',
  },
  {
    id: 10,
    src: '/AwardWinningImages/Award10.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 11,
    src: '/AwardWinningImages/Award11.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 12,
    src: '/AwardWinningImages/Award12.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 13,
    src: '/AwardWinningImages/Award13.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 14,
    src: '/AwardWinningImages/Award14.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 15,
    src: '/AwardWinningImages/Award8.jpg',
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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => {
      const maxIndex = Math.floor((awardPhotos.length - 1) / 3) * 3;
      return prevIndex >= maxIndex ? 0 : prevIndex + 3;
    });
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => {
      const maxIndex = Math.floor((awardPhotos.length - 1) / 3) * 3;
      return prevIndex <= 0 ? maxIndex : prevIndex - 3;
    });
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
      
      {/* Full-Width Photo Carousel Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-full mx-auto">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">
              תמונות <span className="text-[#F1BDAF]">זוכות פרסים</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8" dir="rtl">
              אני גאה לשתף אתכם ברגעי הקסם שתפסתי דרך העדשה – מוזמנים לגלול, להתרשם, ולהרגיש את הקסם בכל תמונה.
            </p>
          </div>
          
          <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Photo Display - Multiple Photos */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full h-full"
                style={{ transform: `translateX(-${currentPhotoIndex * 33.333}%)` }}
              >
                {awardPhotos.map((photo, index) => (
                  <div key={photo.id} className="w-1/3 flex-shrink-0">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls - Below Photos */}
            <div className="flex items-center justify-center mt-8 space-x-8">
              {/* Previous Button */}
              <button
                onClick={prevPhoto}
                className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Photo Indicators */}
              <div className="flex space-x-3">
                {Array.from({ length: Math.ceil(awardPhotos.length / 3) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index * 3)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      Math.floor(currentPhotoIndex / 3) === index
                        ? 'bg-[#F1BDAF] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to photo group ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPhoto}
                className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Client Recommendations Section - Full Width Below Carousel */}
      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">
              המלצות <span className="text-[#F1BDAF]">לקוחות</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6" dir="rtl">
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
    </>
  );
}