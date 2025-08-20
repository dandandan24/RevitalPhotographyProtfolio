'use client';
import { useState, useEffect } from 'react';
import { Camera, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import ActiveNav from '../Components/active-nav';

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
    backgroundPhoto: '/baby-background.jpg',
    packages: [
      {
        id: 'baby-deluxe',
        name: 'חבילה פרימיום',
        photo: '/baby-deluxe.jpg',
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
        photo: '/baby-premium.jpg',
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
        photo: '/baby-basic.jpg',
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
    backgroundPhoto: '/bat-mitzva-background.jpg',
    packages: [
      {
        id: 'bat-mitzva-deluxe',
        name: 'חבילה פרימיום',
        photo: '/bat-mitzva-deluxe.jpg',
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
        photo: '/bat-mitzva-premium.jpg',
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
        photo: '/bat-mitzva-basic.jpg',
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
    id: 'ילדים',
    name: 'ילדים',
    backgroundPhoto: '/kids-background.jpg',
    packages: [
      {
        id: 'kids-deluxe',
        name: 'חבילה פרימיום',
        photo: '/kids-deluxe.jpg',
        title: 'חבילת ילדים פרימיום',
        price: '2350₪',
        offers: [
          '80 תמונות ערוכות באיכות גבוהה',
          'כולל צילומי משפחה',
         'לוקיישן לבחירה',
         'מתאים למשפחה עד 5 נפשות',
         'אלבום מודפס מעוצב עם כריכת תמונה בגודל 25*50 (30 עמודים)'
        ]
      },
      {
        id: 'kids-premium',
        name: 'חבילה מתקדמת',
        photo: '/kids-premium.jpg',
        title: 'חבילת ילדים מתקדמת',
        price: '1500₪',
        offers: [
          '60 תמונות ערוכות באיכות גבוהה',
            'כולל צילומי משפחה',
           'לוקיישן לבחירה',
           'מתאים למשפחה עד 4 נפשות'
        ]
      },
      {
        id: 'kids-basic',
        name: 'חבילה בסיסית',
        photo: '/kids-basic.jpg',
        title: 'חבילת ילדים בסיסית',
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
    id: 'הריון',
    name: 'הריון',
    backgroundPhoto: '/pregnancy-background.jpg',
    packages: [
      {
        id: 'pregnancy-deluxe',
        name: 'חבילה פרימיום',
        photo: '/pregnancy-deluxe.jpg',
        title: 'חבילת הריון פרימיום',
        price: '2600₪',
        offers: [
          'ניתן לשלב 2 לוקיישן לבחירה',
          'כולל צילומים עם בן /בת הזוג',
          '75 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים',
          'אלבום מעוצב ומודפס בגודל 25*50 ס"מ (30 עמודים)'
        ]
      },
      {
        id: 'pregnancy-premium',
        name: 'חבילה מתקדמת',
        photo: '/pregnancy-premium.jpg',
        title: 'חבילת הריון מתקדמת',
        price: '1800₪',
        offers: [
          'לוקיישן לבחירה',
          'כולל צילומים עם בן /בת הזוג',
          '60 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים',

        ]
      },
      {
        id: 'pregnancy-basic',
        name: 'חבילה בסיסית',
        photo: '/pregnancy-basic.jpg',
        title: 'חבילת הריון בסיסית',
        price: '1500₪',
        offers: [
          'לוקיישן לבחירה',
          'כולל צילומים עם בן /בת הזוג',
          '40 תמונות ערוכות ברמה גבוהה',
          'כולל ליווי וייעוץ סטיילינג טרום הצילומים'
        ]
      }
    ]
  },
  {
    id: 'משפחה',
    name: 'משפחה',
    backgroundPhoto: '/family-background.jpg',
    packages: [
      {
        id: 'family-deluxe',
        name: 'חבילה פרימיום',
        photo: '/family-deluxe.jpg',
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
        photo: '/family-premium.jpg',
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
        photo: '/family-basic.jpg',
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
    backgroundPhoto: '/business-background.jpg',
    packages: [
      {
        id: 'business-deluxe',
        name: 'חבילה פרימיום',
        photo: '/business-deluxe.jpg',
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
        photo: '/business-premium.jpg',
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
        photo: '/business-basic.jpg',
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
        <div 
          className="relative h-96 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentCategory.backgroundPhoto})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4 overflow-x-auto">
            {categoryPackages.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? 'text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
מזל טוב! <br></br>
החגיגות בת מצווה מתקרבות ואתם רוצים מזכרת שתישאר אתכם לכל החיים? <br></br>
אני שמחה להציע לך חוויה סופר מרגשת ועוצמתית, שהילדה במרכזה! יום שכולו העצמה רגשית וחיזוק הביטחון העצמי. בסופו תקבלו אלבום מעוצב שכולו חגיגה גדולה!<br></br>
כבר בשיחה הראשונה חשוב לי להכיר את ילדת בת מצווה, לשמוע איך היא מדמיינת את היום שלה? מה התחביבים שלה? ויחד נבין איך להביא אותם לידי ביטוי בצילומים.<br></br>
אני מייעצת ומלווה בסטיילינג. הביגוד הוא חלק בלתי נפרד מהתהליך והוא מה שנותן לכל תמונה את אפקט ה-וואו. יחד נחליט על לוקיישנים מתאימים וביום הצילומים אני מגיעה עם שמלות ואקססוריז וכל זה כדי ליצור תמונות קסומות.<br></br>
אני אוהבת לצלם באור טבעי, תמונות טבעיות, שמשקפות ומעצימות את הייחודיות של הילדה! יש לי גישה מיוחדת, אני גורמת לה להרגיש הכי בנוח שיש מול המצלמה. בסוף יום הצילומים אני עורכת את כל התמונות ברמה גבוהה ומעצבת אלבום מהמם עם תמונות בלתי נשכחות!
כל יום הצילומים הוא פשוט חגיגה של כיף גדול!<br></br>
</p>
            )}
            {currentCategory.id === 'ילדים' && (
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
הבייבי שלכם הגיעו לגיל שנה ואתם רוצים מזכרת מיוחדת מהגיל המתוק הזה? <br></br>
השנים האלה חולפות מהר ואני כאן עבורכם לתעד את הרגעים האלה, גם אתכם ההורים, בשילוב אביזרים מיוחדים שישתלבו בצילומים. ככה שתקבלו מזכרת לכל החיים.<br></br>
ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
 בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם.<br></br>
  כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות.              </p>
            )}
            {currentCategory.id === 'הריון' && (
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
צילומי הריון בטבע בלוקיישנים מדהימים. חוויה ומזכרת שתישאר איתך לאורך כל החיים! <br></br>
צילומי הריון מומלץ לעשות בשבוע 28-34 להריון              </p>
            )}
            {currentCategory.id === 'משפחה' && (
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
צילומי משפחה הם לא רק תמונות – הם זיכרונות חיים.<br></br>
צילומי משפחה בטבע הם הזדמנות לעצור לרגע את השגרה, להתחבר, לצחוק, להתחבק – ולשמור את התחושה הזו לתמיד.<br></br>
זה לא רק תיעוד, זו חוויה. זמן איכות אמיתי, והזדמנות לחגוג את מי שאתם.
              </p>
            )}
            {currentCategory.id === 'תדמית' && (
              <p className="text-lg text-gray-600 mt-4" dir="rtl">
בעולם של היום, קשרים מתחילים לרוב בצורה ויזואלית והרושם הראשוני נוצר תוך שבריר שנייה.<br></br>
 ההצלחה מתחילה עם תמונות תדמית מקצועיות המציגות אתכם <br></br>
  בין אם זה לתמונת פרופיל מנצחת ברשתות, פרופיל מקצועי בלינקדין, או הצגת העסק שלך – הן הכרטיס ביקור שלך!
</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Packages display order: Basic (left) | Premium (center) | Deluxe (right) */}
            {currentCategory.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Package Photo */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.photo}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
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
                  <button className="w-full text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 mt-auto" style={{ backgroundColor: '#F1BDAF' }}>
                    הזמינו עכשיו
                  </button>
                </div>
              </div>
            ))}
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
                  <FaTiktok className="size-6 hover:text-black transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטי התקשרות</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>054-8788851</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <a href="mailto:rosenbergdan6@gmail.com" className="hover:underline">rparzelina@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Address / Hours */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטים נוספים</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>יהוד</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} />
                  <span>ימים א' - ה' : 8:00 - 17:00</span>
                  <span>ו' : 8:00 - 14:00</span>
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
