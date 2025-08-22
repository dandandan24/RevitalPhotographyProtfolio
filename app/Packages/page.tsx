'use client';
import { useState, useEffect } from 'react';
import { Camera, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import ActiveNav from '../Components/active-nav';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PackageOption {
  id: string;
  name: string;
  photo: string;
  title: string;
  price: string;
  offers: string[];
}

interface CategoryPackages {
  id: string;
  name: string;
  backgroundPhoto: string;
  packages: PackageOption[];
}

const categoryPackages: CategoryPackages[] = [
  {
    id: 'בייבי',
    name: 'בייבי',
    backgroundPhoto: '/PackagesImages/PackageHeadImages/baby.jpg',
    packages: [
      {
        id: 'baby-deluxe',
        name: 'חבילה פרימיום',
        photo: '/PackagesImages/PackagesImages/babypremium.jpg',
        title: 'חבילת בייבי פרימיום',
        price: '2300₪',
        offers: [
         '80 תמונות ערוכות באיכות גבוהה',
          'כולל צילומי משפחה',
         'לוקיישן לבחירה',
         'מתאים למשפחה עד 5 נפשות',
         'אלבום מודפס מעוצב עם כריכת תמונה בגודל 25*50 (30 עמודים)'
        ]
      },
      {
        id: 'baby-premium',
        name: 'חבילה מתקדמת',
        photo: '/PackagesImages/PackagesImages/babyexpand.jpg',
        title: 'חבילת בייבי מתקדמת',
        price: '1500₪',
        offers: [
            '60 תמונות ערוכות באיכות גבוהה',
            'כולל צילומי משפחה',
           'לוקיישן לבחירה',
           'מתאים למשפחה עד 4 נפשות'
        ]
      },
      {
        id: 'baby-basic',
        name: 'חבילה בסיסית',
        photo: '/PackagesImages/PackagesImages/babyBasic.jpg',
        title: 'חבילת בייבי בסיסית',
        price: '1250₪',
        offers: [
            '40 תמונות ערוכות באיכות גבוהה',
            'כולל צילומי משפחה',
           'לוקיישן לבחירה',
           'מתאים לילד + הורים '
        ]
      }
    ]
  },
  {
    id: 'גיל מצווה',
    name: 'גיל מצווה',
    backgroundPhoto: '/PackagesImages/PackageHeadImages/mitzva.jpg',
    packages: [
      {
        id: 'bat-mitzva-deluxe',
        name: 'חבילה פרימיום',
        photo: '/PackagesImages/PackagesImages/mitzvaPremium.jpg',
        title: 'חבילת גיל מצווה פרימיום',
        price: '3250₪',
        offers: [
          'צילומי חוץ ב-3 לוקיישנים',
          '100 תמונות באיכות גבוהה',
          'צילום אחים ומשפחה',
          'אלבום מעוצב ומודפס 30x60 ס"מ',
          'הזמנה מעוצבת לאירוע',
          'מצגת הכוללת תמונות מסשן הצילומים'
        ]
      },
      {
        id: 'bat-mitzva-premium',
        name: 'חבילה מתקדמת',
        photo: '/PackagesImages/PackagesImages/mitzvaexpand.jpg',
        title: 'חבילת גיל מצווה מתקדמת',
        price: '2650₪',
        offers: [
          'צילומי חוץ ב-2 לוקיישנים',
          '85 תמונות באיכות גבוהה',
          'צילום אחים ומשפחה',
          'אלבום מעוצב ומודפס 30x60 ס"מ'
        ]
      },
      {
        id: 'bat-mitzva-basic',
        name: 'חבילה בסיסית',
        photo: '/PackagesImages/PackagesImages/mitzvaBasic.jpg',
        title: 'חבילת גיל מצווה בסיסית',
        price: '2350₪',
        offers: [
          'צילומי חוץ בלוקיישן אחד',
          '65 תמונות באיכות גבוהה',
          'צילום אחים ומשפחה',
          'אלבום מעוצב ומודפס 30x60 ס"מ'
        ]
      }
    ]
  },
  {
    id: 'הריון',
    name: 'הריון',
    backgroundPhoto: '/PackagesImages/PackageHeadImages/pregnancy.jpg',
    packages: [
      {
        id: 'pregnancy-deluxe',
        name: 'חבילה פרימיום',
        photo: '/PackagesImages/PackagesImages/pregnancyPremium.jpg',
        title: 'חבילת הריון פרימיום',
        price: '2600₪',
        offers: [
          'ניתן לשלב 2 לוקיישן לבחירה',
          'כולל צילומים עם בן/ בת הזוג',  
          '75 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים',
          'אלבום מעוצב ומודפס בגודל 25*50 ס"מ (30 עמודים)'
        ]
      },
      {
        id: 'pregnancy-premium',
        name: 'חבילה מתקדמת',
        photo: '/PackagesImages/PackagesImages/pregnancyExpand.jpg',
        title: 'חבילת הריון מתקדמת',
        price: '1800₪',
        offers: [
          'לוקיישן לבחירה',
          'כולל צילומים עם בן/ בת הזוג',
          '60 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים',

        ]
      },
      {
        id: 'pregnancy-basic',
        name: 'חבילה בסיסית',
        photo: '/PackagesImages/PackagesImages/pregnancyBasic.jpg',
        title: 'חבילת הריון בסיסית',
        price: '1500₪',
        offers: [
          'לוקיישן לבחירה',
          'כולל צילומים עם בן/ בת הזוג',
          '40 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים'
        ]
      }
    ]
  },
  {
    id: 'משפחה וילדים',
    name: 'משפחה וילדים',
    backgroundPhoto: '/PackagesImages/PackageHeadImages/family.jpg',
    packages: [
      {
        id: 'family-deluxe',
        name: 'חבילה פרימיום',
        photo: '/PackagesImages/PackagesImages/familyPremium.jpg',
        title: 'חבילת משפחה פרימיום',
        price: '2450₪',
        offers: [
          'מגוון רחב של אביזרים',
          'לוקיישן לבחירה',
          '80 תמונות ערוכות באיכות גבוהה',
          'מתאים למשפחה עד 5 נפשות',
          'אלבום מודפס מעוצב עם כריכת תמונה בגודל 25*50 (30 עמודים)'
        ]
      },
      {
        id: 'family-premium',
        name: 'חבילה מתקדמת',
        photo: '/PackagesImages/PackagesImages/familyExpand.jpg',
        title: 'חבילת משפחה מתקדמת',
        price: '1950₪',
        offers: [
          'מגוון רחב של אביזרים',
          'לוקיישן לבחירה',
          '60 תמונות ערוכות באיכות גבוהה',
          'מתאים למשפחה עם 2 ילדים'
        ]
      },
      {
        id: 'family-basic',
        name: 'חבילה בסיסית',
        photo: '/PackagesImages/PackagesImages/familyBasic.jpg',
        title: 'חבילת משפחה בסיסית',
        price: '1450₪',
        offers: [
          'מגוון רחב של אביזרים',
          'לוקיישן לבחירה',
          '40 תמונות ערוכות באיכות גבוהה',
          'מתאים למשפחה עם 2 ילדים'
        ]
      }
    ]
  },
  {
    id: 'תדמית',
    name: 'תדמית',
    backgroundPhoto: '/PackagesImages/PackageHeadImages/character.jpg',
    packages: [
      {
        id: 'business-deluxe',
        name: 'חבילה פרימיום',
        photo: '/PackagesImages/PackagesImages/characterPremium.jpg',
        title: 'חבילת תדמית פרימיום',
        price: '2500₪',
        offers: [
          'צילומי סטילס הכולל כשעתיים של צילומים',
          'בבית העסק או בסביבה אורבנית, בסטודיו או בטבע.',
          'הצילומים יכללו צילומי תדמית אישיים וכן תמונות אווירה',
          'ייעוץ סטיילניג טרם הצילומים',
          '40 תמונות ערוכות באיכות גבוהה',
          'מאפרת מקצועית ומעצבת שיער'
        ]
      },
      {
        id: 'business-premium',
        name: 'חבילה מתקדמת',
        photo: '/PackagesImages/PackagesImages/characterExpand.jpg',
        title: 'חבילת תדמית מתקדמת',
        price: '1500₪',
        offers: [
          'צילומי סטילס הכולל כשעה וחצי של צילומים',
          'בבית העסק או בסביבה אורבנית, בסטודיו או בטבע.',
          'הצילומים יכללו צילומי תדמית אישיים וכן תמונות אווירה',
          'ייעוץ סטיילניג טרם הצילומים',
          '30 תמונות ערוכות באיכות גבוהה'
        ]
      },
      {
        id: 'business-basic',
        name: 'חבילה בסיסית',
        photo: '/PackagesImages/PackagesImages/characterBasic.jpg',
        title: 'חבילת תדמית בסיסית',
        price: '1100₪',
        offers: [
          'צילומי סטילס הכולל כשעה של צילומים',
          'בבית העסק או בסביבה אורבנית, בסטודיו או בטבע.',
          'הצילומים יכללו צילומי תדמית אישיים וכן תמונות אווירה',
          'ייעוץ סטיילניג טרם הצילומים',
          '15 תמונות ערוכות באיכות גבוהה'
        ]
      }
    ]
  }
];

export default function Packages() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('בייבי');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current category data
  const currentCategory = categoryPackages.find(cat => cat.id === selectedCategory);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categoryPackages.find(cat => cat.id === category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  return (
    <>
      <ActiveNav href="/Packages" />
      {/* Header with Background Photo */}
      {currentCategory && (
        <div className="relative">
          <Image
            src={currentCategory.backgroundPhoto}
            alt=""
            fill
            style={{ objectPosition: 'center 40%' }}
            className="absolute inset-0 w-full h-full object-cover"
            priority
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/imageforbackgroundhomepage.jpg'; }}
          />
          
          {/* Header Content */}
          <div className="relative z-10 h-96"></div>
          
          {/* Category Navigation */}
          <div className="relative z-10 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Mobile Dropdown - Only visible on small screens */}
              <div className="lg:hidden py-4 flex justify-center">
                <div className="relative w-56">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-5 py-3 text-base font-medium text-white bg-white/10 backdrop-blur-sm border-2 border-[#F1BDAF] rounded-lg shadow-md appearance-none cursor-pointer hover:bg-[#F1BDAF]/10 transition-all duration-200 text-center"
                    dir="rtl"
                  >
                    {categoryPackages.map((category) => (
                      <option key={category.id} value={category.id} className="text-center text-gray-700 bg-white">
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#F1BDAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Desktop Category Buttons - Only visible on large screens */}
              <div className="hidden lg:flex justify-center space-x-8 py-4 overflow-x-auto">
                {categoryPackages.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'text-white shadow-lg' 
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                    style={selectedCategory === category.id ? { backgroundColor: '#F1BDAF' } : {}}
                    dir="rtl"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Cards - Only show selected category */}
      {currentCategory && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">{currentCategory.name}</h2>
            
            {/* Custom description text for each category */}
            {currentCategory.id === 'בייבי' && (
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
 בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם.<br></br>
  כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות.

              </p>
            )}
            {currentCategory.id === 'גיל מצווה' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  מזל טוב! <br></br>
                  החגיגות בת מצווה מתקרבות ואתם רוצים מזכרת שתישאר אתכם לכל החיים? <br></br>
                  אני שמחה להציע לך חוויה סופר מרגשת ועוצמתית, שהילדה במרכזה! יום שכולו העצמה רגשית וחיזוק הביטחון העצמי. בסופו תקבלו אלבום מעוצב שכולו חגיגה גדולה!<br></br><br></br>
                  כבר בשיחה הראשונה חשוב לי להכיר את ילדת בת מצווה, לשמוע איך היא מדמיינת את היום שלה? מה התחביבים שלה? ויחד נבין איך להביא אותם לידי ביטוי בצילומים.<br></br>
                  אני מייעצת ומלווה בסטיילינג. הביגוד הוא חלק בלתי נפרד מהתהליך והוא מה שנותן לכל תמונה את אפקט ה-וואו. יחד נחליט על לוקיישנים מתאימים וביום הצילומים אני מגיעה עם שמלות ואקססוריז וכל זה כדי ליצור תמונות קסומות.<br></br><br></br>
                  אני אוהבת לצלם באור טבעי, תמונות טבעיות, שמשקפות ומעצימות את הייחודיות של הילדה! יש לי גישה מיוחדת, אני גורמת לה להרגיש הכי בנוח שיש מול המצלמה. בסוף יום הצילומים אני עורכת את כל התמונות ברמה גבוהה ומעצבת אלבום מהמם עם תמונות בלתי נשכחות!
                  כל יום הצילומים הוא פשוט חגיגה של כיף גדול!<br></br>
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                  מזל טוב! <br></br>
                  החגיגות בת מצווה מתקרבות ואתם רוצים מזכרת שתישאר אתכם לכל החיים? <br></br>
                  אני שמחה להציע לך חוויה סופר מרגשת ועוצמתית, שהילדה במרכזה!<br></br>
                   יום שכולו העצמה רגשית וחיזוק הביטחון העצמי. בסופו תקבלו אלבום מעוצב שכולו חגיגה גדולה!<br></br>
               
                </p>
              </>
            )}
            {currentCategory.id === 'תינוקות' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
                  השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
                  ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                  בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם.<br></br>
                  כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות.
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
                  השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
                  ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                 
                </p>
              </>
            )}
            {currentCategory.id === 'ילדים' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
                  השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
                  ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                  בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם.<br></br>
                  כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות.
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
                  השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
                  ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                 
                </p>
              </>
            )}
            {currentCategory.id === 'הריון' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  צילומי הריון בטבע בלוקיישנים מדהימים. חוויה ומזכרת שתישאר איתך לאורך כל החיים! <br></br>
                  צילומי הריון מומלץ לעשות בשבוע 28-34 להריון
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                צילומי הריון בטבע בלוקיישנים מדהימים. חוויה ומזכרת שתישאר איתך לאורך כל החיים! <br></br>
                צילומי הריון מומלץ לעשות בשבוע 28-34 להריון
                </p>
              </>
            )}
            {currentCategory.id === 'משפחה וילדים' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  צילומי משפחה הם לא רק תמונות – הם זיכרונות חיים.<br></br>
                  צילומי משפחה בטבע הם הזדמנות לעצור לרגע את השגרה, להתחבר, לצחוק, להתחבק – ולשמור את התחושה הזו לתמיד.<br></br>
                  זה לא רק תיעוד, זו חוויה. זמן איכות אמיתי, והזדמנות לחגוג את מי שאתם.
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                צילומי משפחה הם לא רק תמונות – הם זיכרונות חיים.<br></br>
                  צילומי משפחה בטבע הם הזדמנות לעצור לרגע את השגרה, להתחבר, לצחוק, להתחבק – ולשמור את התחושה הזו לתמיד.<br></br>
                  זה לא רק תיעוד, זו חוויה. זמן איכות אמיתי, והזדמנות לחגוג את מי שאתם.
                </p>
              </>
            )}
            {currentCategory.id === 'תדמית' && (
              <>
                {/* Desktop text */}
                <p className="hidden lg:block text-lg text-gray-600 mt-4" dir="rtl">
                  בעולם של היום, קשרים מתחילים לרוב בצורה ויזואלית והרושם הראשוני נוצר תוך שבריר שנייה.<br></br>
                  ההצלחה מתחילה עם תמונות תדמית מקצועיות המציגות אתכם <br></br>
                  בין אם זה לתמונת פרופיל מנצחת ברשתות, פרופיל מקצועי בלינקדין, או הצגת העסק שלך – הן הכרטיס ביקור שלך!
                </p>
                {/* Mobile text */}
                <p className="lg:hidden text-lg text-gray-600 mt-4" dir="rtl">
                בעולם של היום, קשרים מתחילים לרוב בצורה ויזואלית והרושם הראשוני נוצר תוך שבריר שנייה.<br></br>
                  ההצלחה מתחילה עם תמונות תדמית מקצועיות המציגות אתכם <br></br>
                  בין אם זה לתמונת פרופיל מנצחת ברשתות, פרופיל מקצועי בלינקדין, או הצגת העסק שלך – הן הכרטיס ביקור שלך!
                </p>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Packages display order: Mobile: Basic | Premium | Deluxe, Desktop: Basic (left) | Premium (center) | Deluxe (right) */}
            {(() => {
              // Reorder packages for mobile: Basic first, then Premium, then Deluxe
              const sortedPackages = isMobile 
                ? [...currentCategory.packages].sort((a, b) => {
                    const order = { 'חבילה בסיסית': 1, 'חבילה מתקדמת': 2, 'חבילה פרימיום': 3 };
                    return (order[a.name as keyof typeof order] || 0) - (order[b.name as keyof typeof order] || 0);
                  })
                : currentCategory.packages;
              
              return sortedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Package Photo */}
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={pkg.photo}
                      alt={pkg.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover object-center"
                      priority
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Package Content */}
                  <div className="p-6 flex flex-col flex-grow" dir="rtl">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <div className="text-3xl font-bold" style={{ color: '#F1BDAF' }}>
                        {pkg.price}
                      </div>
                      
                    </div>

                    {/* Offers List */}
                    <ul className="space-y-3 mb-6 flex-grow">
                      {pkg.offers.map((offer, index) => (
                        <li key={index} className="flex items-center">
                          <Camera className="ml-2 mr-1 flex-shrink-0" size={20} style={{ color: '#F1BDAF' }} />
                          <span className="text-gray-700 text-sm">{offer}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Order Button - Always at bottom */}
                    <Button asChild variant="standard" className="w-full mt-auto">
                      <Link href="/Contact">הזמינו עכשיו</Link>
                    </Button>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
      
      {/* Disclaimer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          {/* Additional Information */}
          <div className="mt-4 text-sm text-gray-500" dir="rtl">
            <p className="mb-2">כל החבילות כוללות ייעוץ והכוונה לסטיילינג ובחירת ביגוד – מתנה בשווי 300 ₪</p>
            <p className="mb-2">אלבום בגודל 25*50 (מצב פתוח) 30 עמודים במחיר 600 ₪</p>
            <p className="mb-2">אלבום בגודל 30*60 (מצב פתוח) 30 עמודים במחיר 800 ₪</p>
            <p>מצולם נוסף בתוספת של 150₪</p>
          </div>
        </div>
      </div>
      
      {/* Footer with contact details */}
      <footer className="border-t bg-white">
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
