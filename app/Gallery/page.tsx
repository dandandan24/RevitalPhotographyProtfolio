'use client';

import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import ActiveNav from '../Components/active-nav';

interface Photo {
  id: number;
  filename: string;
  src: string;
  alt: string;
  title: string;
}

interface CategoryData {
  folder: string;
  photos: Photo[];
  count: number;
}

interface GalleryData {
  [categoryName: string]: CategoryData;
}

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryData>({});
  const [selectedCategory, setSelectedCategory] = useState('בייבי'); // Set default category
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [loading, setLoading] = useState(true);
  const [collagePhotos, setCollagePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    console.log('Loading gallery data...');
    fetch('/gallery-data.json')
      .then(response => response.json())
      .then((data: GalleryData) => {
        console.log('Gallery data loaded:', data);
        setGalleryData(data);
        // Set first category with photos as default immediately
        const firstCategoryWithPhotos = Object.entries(data).find(([_, categoryData]) => categoryData.count > 0);
        if (firstCategoryWithPhotos) {
          setSelectedCategory(firstCategoryWithPhotos[0]);
          console.log('Selected category:', firstCategoryWithPhotos[0]);
        }
        setLoading(false);
        
        // Prepare collage photos - create many low-quality thumbnails for rich collage effect
        const allPhotos = Object.values(data).flatMap(categoryData => categoryData.photos);
        // Duplicate photos to create hundreds of small thumbnails
        const duplicatedPhotos = [];
        for (let i = 0; i < 200; i++) {
          duplicatedPhotos.push(allPhotos[i % allPhotos.length]);
        }
        setCollagePhotos(duplicatedPhotos);
        
        // Start loading collage photos progressively
        setTimeout(() => {
          const collageElements = document.querySelectorAll('.collage-photo');
          collageElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('loaded');
            }, index * 10); // Stagger loading by 10ms per photo
          });
        }, 100);
      })
      .catch(err => {
        console.error('Error loading gallery data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F1BDAF] mx-auto mb-4"></div>
          <p className="text-xl" dir="rtl">טוען תמונות...</p>
        </div>
      </div>
    );
  }

  const categories = Object.keys(galleryData);
  const currentPhotos = galleryData[selectedCategory]?.photos || [];

  const loadMorePhotos = () => {
    setVisiblePhotos(prev => Math.min(prev + 6, currentPhotos.length));
  };

  const hasMorePhotos = visiblePhotos < currentPhotos.length;

  return (
    <>
      <ActiveNav href="/Gallery" />
      <div className="min-h-screen bg-gray-50">
        {/* Header and Category Navigation Combined */}
        <div className="bg-white shadow-sm relative overflow-hidden">
          {/* Single Photo Collage Background - Rich with Hundreds of Photos */}
          {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-20 gap-0.5">
              {collagePhotos.map((photo, index) => (
                <div 
                  key={`header-${photo.id}-${index}`} 
                  className="aspect-square overflow-hidden collage-photo opacity-0 transition-opacity duration-300"
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'blur(0.5px)',
                      transform: 'scale(1.1)'
                    }}
                    onLoad={(e) => {
                      // Progressive loading - fade in each photo as it loads
                      const target = e.target as HTMLImageElement;
                      const container = target.parentElement;
                      if (container) {
                        container.classList.add('loaded');
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div> */}
          
          {/* Header Content */}
          <div className="text-center py-16 relative z-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-4" dir="rtl">גלריית תמונות</h1>
            <p className="text-xl text-gray-600" dir="rtl">גלו את העבודות שלי</p>
          </div>

          {/* Category Navigation */}
          <div className="border-b relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-8 py-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisiblePhotos(6);
                    }}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-500 relative overflow-hidden ${
                      selectedCategory === category
                        ? 'text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90'
                    }`}
                    style={selectedCategory === category ? { backgroundColor: '#F1BDAF' } : {}}
                    dir="rtl"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="w-full mx-auto xl:w-[90%] px-4 sm:px-6 lg:px-8 xl:px-0 pt-0 pb-12">
          {currentPhotos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500" dir="rtl">אין תמונות בקטגוריה זו</p>
            </div>
          ) : (
            <>
              {/* Category Description */}
              <div className="text-center mb-8 mt-8">
                {selectedCategory === 'בייבי' && (
                  <p className="text-lg text-gray-600" dir="rtl">
                   ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                    בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם. <br></br>
                   כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות                </p>
                )}
                {selectedCategory === 'גיל מצווה' && (
                  <p className="text-lg text-gray-600" dir="rtl">
אני אוהבת לצלם באור טבעי, תמונות טבעיות, שמשקפות ומעצימות את הייחודיות של הילדה!<br></br>
 יש לי גישה מיוחדת, אני גורמת לה להרגיש הכי בנוח שיש מול המצלמה.<br></br>
  בסוף יום הצילומים אני עורכת את כל התמונות ברמה גבוהה ומעצבת אלבום מהמם עם תמונות בלתי נשכחות!ֿ                </p>
                )}
                {selectedCategory === 'ילדים' && (
                  <p className="text-lg text-gray-600" dir="rtl">
ילדים וטבע הוא שילוב מנצח. משהו בטבע גורם להם פשוט להשתחרר, ליהנות, לשחק ולחקור. לא צריך יותר מזה כשמדובר בילדים.<br></br>
                    בצילום ילדים יש לנו הזדמנות מצוינת לתעד את הרגעים הקסומים והתמימים שלהם. <br></br>
                   כי ברגע שהרגעים האלה עוברים כל מה שנותר לנו הם הזיכרונות בתמונות                      </p>
                )}
                {selectedCategory === 'הריון' && (
                  <p className="text-lg text-gray-600" dir="rtl">
צילומי הריון בטבע בלוקיישנים מדהימים. חוויה ומזכרת שתישאר איתך לאורך כל החיים!<br></br>
צילומי הריון מומלץ לעשות בשבוע 28-34 להריון
                  </p>
                )}
                 {selectedCategory === 'משפחה' && (
                  <p className="text-lg text-gray-600" dir="rtl">
צילומי משפחה הם לא רק תמונות – הם זיכרונות חיים.<br></br>
צילומי משפחה בטבע הם הזדמנות לעצור לרגע את השגרה, להתחבר, לצחוק, להתחבק – ולשמור את התחושה הזו לתמיד.<br></br>
זה לא רק תיעוד, זו חוויה. זמן איכות אמיתי, והזדמנות לחגוג את מי שאתם.                
</p>
                )}
                 {selectedCategory === 'תדמית' && (
                  <p className="text-lg text-gray-600" dir="rtl">
בעולם של היום, קשרים מתחילים לרוב בצורה ויזואלית והרושם הראשוני נוצר תוך שבריר שנייה.<br></br>
 ההצלחה מתחילה עם תמונות תדמית מקצועיות המציגות אתכם – בין אם זה לתמונת פרופיל מנצחת ברשתות, פרופיל מקצועי בלינקדין, או הצגת העסק שלך – הן הכרטיס ביקור שלך!                </p>
                )}
              </div>

              {/* Order Button */}
              <div className="text-center mb-8">
                <Link href={`/Packages?category=${selectedCategory}`}>
                  <button className="text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 btn-hover-effect" style={{ backgroundColor: '#F1BDAF' }}>
                    הזמינו עכשיו
                  </button>
                </Link>
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {currentPhotos.slice(0, visiblePhotos).map((photo) => (
                  <div
                    key={photo.id}
                    className="mb-6 group cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    style={{ breakInside: 'avoid' }}
                  >
                    {/* Image Container with Hover Effects */}
                    <div className="relative w-full bg-gray-100 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        onLoad={() => console.log('✅ Image loaded:', photo.src)}
                        onError={(e) => console.error('❌ Image failed:', photo.src, e)}
                      />
                      
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          {hasMorePhotos && (
            <div className="text-center mt-12">
              <button
                onClick={loadMorePhotos}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                dir="rtl"
              >
                טען עוד תמונות ({currentPhotos.length - visiblePhotos} נותרו)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer with contact details - Full width */}
      <footer className="border-t bg-white w-full">
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