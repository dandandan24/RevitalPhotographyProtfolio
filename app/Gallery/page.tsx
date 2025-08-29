'use client';

import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import ActiveNav from '../Components/active-nav';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Photo {
  id: number;
  filename: string;
  src: string;
  alt: string;
  title: string;
  category?: string; // Optional category for collage photos
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
  const [selectedCategory, setSelectedCategory] = useState('גיל מצווה'); // Set default category
  const [visiblePhotos, setVisiblePhotos] = useState(12);
  const [loading, setLoading] = useState(true);
  const [collagePhotos, setCollagePhotos] = useState<Photo[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        
        // Create dynamic collage from gallery photos instead of static collagePhotos folder
        const createDynamicCollage = () => {
          try {
            const allPhotos: Photo[] = [];
            
            // Collect photos from all categories
            Object.entries(data).forEach(([categoryName, categoryData]) => {
              if (categoryData.photos && categoryData.photos.length > 0) {
                // Add category name to each photo for better organization
                const photosWithCategory = categoryData.photos.map(photo => ({
                  ...photo,
                  category: categoryName
                }));
                allPhotos.push(...photosWithCategory);
              }
            });
            
            // Shuffle the photos to get random selection
            const shuffledPhotos = allPhotos.sort(() => Math.random() - 0.5);
            
            // Select photos based on screen size
            const photoCount = isMobile ? 30 : 140;
            const selectedPhotos = shuffledPhotos.slice(0, photoCount);
            
            // Create collage photos array
            const collagePhotosArray = selectedPhotos.map((photo, index) => ({
              id: index + 1,
              filename: photo.filename,
              src: photo.src,
              alt: photo.alt,
              title: photo.title,
              category: photo.category
            }));
            
            setCollagePhotos(collagePhotosArray);
            console.log(`Created dynamic collage with ${collagePhotosArray.length} photos from gallery categories`);
          } catch (error) {
            console.log('Error creating dynamic collage, using fallback:', error);
            // Fallback: use photos from first available category
            const firstCategory = Object.values(data).find(categoryData => categoryData.count > 0);
            if (firstCategory && firstCategory.photos.length > 0) {
              const fallbackCollage = firstCategory.photos.slice(0, 20).map((photo, index) => ({
                ...photo,
                id: index + 1
              }));
              setCollagePhotos(fallbackCollage);
            }
          }
        };
        
        // Create the dynamic collage
        createDynamicCollage();
      })
      .catch(err => {
        console.error('Error loading gallery data:', err);
        setLoading(false);
      });
  }, [isMobile]);

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

  const categories = ['כללי', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים', 'גיל מצווה'];
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
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-0.5 p-2 h-full w-full">
              {collagePhotos.length > 0 ? collagePhotos.map((photo, index) => (
                <div 
                  key={`header-${photo.id}-${index}`} 
                  className="w-full h-16 overflow-hidden rounded-sm relative group"
                  style={{ aspectRatio: '1/1' }}
                  title={`${photo.title} - ${photo.category || 'Unknown Category'}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                    priority={index < 6}
                    onLoad={() => {
                      console.log(`Collage photo loaded: ${photo.src} from ${photo.category || 'Unknown Category'}`);
                    }}
                    onError={(e) => {
                      console.error(`Failed to load collage photo: ${photo.src}`);
                      // Hide broken images
                      const target = e.target as HTMLImageElement;
                      const container = target.parentElement;
                      if (container) {
                        container.style.display = 'none';
                      }
                    }}
                  />
                  {/* Category indicator on hover */}
                  {photo.category && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center px-1" dir="rtl">
                        {photo.category}
                      </span>
                    </div>
                  )}
                </div>
              )) : (
                <div className="w-full text-center text-red-500 p-4">
                  No collage photos found - Array length: {collagePhotos.length}
                </div>
              )}
            </div>
          </div>
          
          {/* Header Content */}
          <div className="text-center py-16 relative z-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-4" dir="rtl">גלריית תמונות</h1>
            <p className="text-xl text-gray-600 mb-4" dir="rtl">גלו את העבודות שלי</p>
            <Button 
              onClick={() => {
                // Refresh collage with new random photos
                if (galleryData && Object.keys(galleryData).length > 0) {
                  const allPhotos: Photo[] = [];
                  Object.entries(galleryData).forEach(([categoryName, categoryData]) => {
                    if (categoryData.photos && categoryData.photos.length > 0) {
                      const photosWithCategory = categoryData.photos.map(photo => ({
                        ...photo,
                        category: categoryName
                      }));
                      allPhotos.push(...photosWithCategory);
                    }
                  });
                  const shuffledPhotos = allPhotos.sort(() => Math.random() - 0.5);
                  const photoCount = isMobile ? 30 : 140;
                  const selectedPhotos = shuffledPhotos.slice(0, photoCount);
                  const collagePhotosArray = selectedPhotos.map((photo, index) => ({
                    id: index + 1,
                    filename: photo.filename,
                    src: photo.src,
                    alt: photo.alt,
                    title: photo.title,
                    category: photo.category
                  }));
                  setCollagePhotos(collagePhotosArray);
                }
              }}
              variant="outline"
              size="sm"
              className="bg-[#F1BDAF] text-white border-[#F1BDAF] hover:bg-[#F1BDAF]/90 transition-all duration-200"
              dir="rtl"
            >
              רענן קולאז'
            </Button>
          </div>

          {/* Category Navigation */}
          <div className="border-b relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Mobile Dropdown - Only visible on small screens */}
              <div className="lg:hidden py-4 flex justify-center">
                <div className="relative w-56">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisiblePhotos(12);
                    }}
                    className="w-full px-5 py-3 text-base font-medium text-gray-700 bg-white border-2 border-[#F1BDAF] rounded-lg shadow-md appearance-none cursor-pointer hover:bg-gray-50 transition-all duration-200 text-center"
                    dir="rtl"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="text-center">
                        {category}
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
              <div className="hidden lg:flex justify-center space-x-8 py-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisiblePhotos(12);
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

              {/* Order Button - Hidden for General category */}
              {selectedCategory !== 'כללי' && (
                <div className="text-center mb-8">
                  <Button asChild variant="standard" size="xl" className="text-lg font-bold">
                    <Link href={`/Packages?category=${selectedCategory === 'משפחה'||selectedCategory === 'ילדים' ? 'משפחה וילדים' : selectedCategory}`}>
                      הזמינו עכשיו
                    </Link>
                  </Button>
                </div>
              )}

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {currentPhotos.slice(0, visiblePhotos).map((photo) => (
                  <div
                    key={photo.id}
                    className="mb-6 group cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    style={{ breakInside: 'avoid' }}
                  >
                    {/* Image Container with Hover Effects */}
                    <div className="relative w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={300}
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
            <div className="text-center xl:mt-12 mt-5">
              <Button
                onClick={loadMorePhotos}
                variant="standard"
                size="lg"
                className="font-medium"
                dir="rtl"
              >
                טען עוד תמונות ({currentPhotos.length - visiblePhotos} נותרו)
              </Button>
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