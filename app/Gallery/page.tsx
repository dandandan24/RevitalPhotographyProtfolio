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
  const [selectedCategory, setSelectedCategory] = useState(''); // Start with empty, will be set by useEffect
  const [loading, setLoading] = useState(true);
  const [collagePhotos, setCollagePhotos] = useState<Photo[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [categoryChanging, setCategoryChanging] = useState(false);
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(10); // Start with 10 photos
  const [newlyLoadedImages, setNewlyLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch gallery data and set initial category based on code's categories array
  useEffect(() => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/gallery-data.json`;
    
    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: GalleryData) => {
        setGalleryData(data);
        
        // Set first category from code's categories array that has photos in JSON
        const categories = ['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה'];
        
        // Set גיל מצווה as default if it has photos, otherwise use first available
        const defaultCategory = data['גיל מצווה'] && data['גיל מצווה'].photos && data['גיל מצווה'].photos.length > 0 
          ? 'גיל מצווה'
          : categories.find(category => 
              data[category] && data[category].photos && data[category].photos.length > 0
            );
        
        if (defaultCategory) {
          setSelectedCategory(defaultCategory);
        } else {
          // Fallback to first available category
          const firstCategory = Object.keys(data)[0];
          if (firstCategory) {
            setSelectedCategory(firstCategory);
          } else {
            // Ultimate fallback
            setSelectedCategory('גיל מצווה');
          }
        }
        setLoading(false);
        /*
        // Create dynamic collage from gallery photos instead of static collagePhotos folder
        const createDynamicCollage = () => {
          try {
            const allPhotos: Photo[] = [];
            
                          // Collect photos from each category - fewer for mobile, more for desktop
              const photosPerCategory = isMobile ? 5 : 24; // 24 * 6 categories = 144 photos (close to 140)
              Object.entries(data).forEach(([categoryName, categoryData]) => {
                if (categoryData.photos && categoryData.photos.length > 0) {
                  // Take photos based on device type
                  const categoryPhotos = categoryData.photos.slice(0, photosPerCategory).map(photo => ({
                  ...photo,
                  category: categoryName
                }));
                allPhotos.push(...categoryPhotos);
              }
            });
            
            // Shuffle photos to distribute categories evenly (consistent order, not random)
            const shuffleArray = (array: Photo[]) => {
              const shuffled = [...array];
              // Use a simple algorithm that creates consistent distribution
              for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor((i * 7 + 3) % (i + 1)); // Consistent pseudo-random
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
              }
              return shuffled;
            };

            const shuffledPhotos = shuffleArray(allPhotos);
            
            // Create collage photos array with shuffled order
            const collagePhotosArray = shuffledPhotos.map((photo, index) => ({
              id: index + 1,
              filename: photo.filename,
              src: photo.src,
              alt: photo.alt,
              title: photo.title,
              category: photo.category
            }));
            
            setCollagePhotos(collagePhotosArray);
              console.log(`Created dynamic collage with ${collagePhotosArray.length} photos (first ${photosPerCategory} from each category)`);
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
        createDynamicCollage();*/
      })
      .catch(err => {
        console.error('Error loading gallery data:', err);
        setLoading(false);
      });
  }, [isMobile]);

  // Shuffle array function for permanent photo order
  const shuffleArray = (array: Photo[]): Photo[] => {
    const shuffled = [...array];
    // Use a seeded random for consistent results
    let seed = 42; // Fixed seed for consistent shuffling
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const categories = ['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה'];
  const allPhotos = galleryData[selectedCategory]?.photos || [];
  const shuffledPhotos = shuffleArray(allPhotos); // Permanent shuffle
  const currentPhotos = shuffledPhotos; // Use permanently shuffled photos
  const visiblePhotos = currentPhotos.slice(0, visiblePhotosCount); // Show only visible count
  
  // Distribute photos across responsive columns
  const distributePhotos = (photos: Photo[]): Photo[][] => {
    // For mobile, just return all photos in a single array
    if (isMobile) {
      return [photos];
    }
    
    // For desktop/tablet, distribute across 3 columns
    const columns: Photo[][] = [[], [], []];
    photos.forEach((photo, index) => {
      columns[index % 3].push(photo);
    });
    return columns;
  };
  
  const photoColumns = distributePhotos(visiblePhotos);



  const handleImageLoad = (uniquePhotoId: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(uniquePhotoId);
      return newSet;
    });
    
    // Mark as newly loaded for fade-in effect
    setNewlyLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(uniquePhotoId);
      return newSet;
    });
    
    // Remove from newly loaded after animation completes
    setTimeout(() => {
      setNewlyLoadedImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(uniquePhotoId);
        return newSet;
      });
    }, 600); // Match animation duration
  };

  // Check if all images are loaded
  useEffect(() => {
    if (currentPhotos.length > 0) {
      const currentCategoryImageIds = currentPhotos.map(photo => `${selectedCategory}-${photo.id}`);
      const loadedCurrentCategoryImages = currentCategoryImageIds.filter(id => loadedImages.has(id));
    

      
      if (loadedCurrentCategoryImages.length === currentPhotos.length) {
        setImagesLoaded(true);
      } else {
        setImagesLoaded(false);
      }
    } else {
      setImagesLoaded(false);
    }
  }, [currentPhotos.length, loadedImages.size, selectedCategory, loadedImages]);

  // Reset loaded images and visible count when category changes
  useEffect(() => {
    setLoadedImages(new Set());
    setImagesLoaded(false);
    setVisiblePhotosCount(10); // Reset to 10 photos
    setNewlyLoadedImages(new Set()); // Reset newly loaded images
  }, [selectedCategory]);

  // Load more photos when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        if (visiblePhotosCount < currentPhotos.length) {
          setVisiblePhotosCount(prev => Math.min(prev + 10, currentPhotos.length));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visiblePhotosCount, currentPhotos.length]);

  // Function to handle category change with immediate hiding
  const handleCategoryChange = (newCategory: string) => {
    setCategoryChanging(true);
    setSelectedCategory(newCategory);
  };
  
  useEffect(() => {
    if (categoryChanging) {
      const timer = setTimeout(() => {
        setCategoryChanging(false);
      }, 100); // Brief delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [categoryChanging]);

  if (loading || !selectedCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F1BDAF] mx-auto mb-4"></div>
          <p className="text-xl" dir="rtl">טוען תמונות...</p>
        </div>
      </div>
    );
  }

  // Removed load more functionality - showing all photos

  return (
    <>
      <ActiveNav href="/Gallery" />
      <div className="min-h-screen bg-gray-50 animate-in fade-in duration-700">
        {/* Header and Category Navigation Combined */}
        <div className="bg-white shadow-sm relative overflow-hidden" style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/collage.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          {/* Collage disabled per request to improve mobile performance */}
          
          {/* Header Content */}
          <div className="text-center py-16 relative z-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-4" dir="rtl">גלריית תמונות</h1>
            <p className="text-xl text-gray-600 mb-4" dir="rtl">גלו את העבודות שלי</p>
          </div>

          {/* Category Navigation */}
          <div className="border-b relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {/* Mobile Dropdown - Only visible on small screens */}
              <div className="lg:hidden py-4 flex justify-center">
                <div className="relative w-56">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      handleCategoryChange(e.target.value);
                    }}
                    className="w-full px-5 py-3 text-base font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-[#F1BDAF] rounded-lg shadow-md appearance-none cursor-pointer hover:bg-[#F1BDAF]/10 transition-all duration-200 text-center"
                    dir="rtl"
                    style={{
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="text-center text-gray-700 bg-white">
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
              <div className="hidden lg:flex justify-center gap-8 py-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
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
 יש לי גישה מיוחדת, אשר גורמת לה להרגיש הכי בנוח שיש מול המצלמה.<br></br>
  בסוף יום הצילומים אני עורכת את כל התמונות ברמה גבוהה ומעצבת אלבום מהמם עם תמונות בלתי נשכחות!            </p>
                )}
                {selectedCategory === 'ילדים' && (
                  <p className="text-lg text-gray-600" dir="rtl">
                    הילדים גדלים מהר יותר ממה שנדמה ודווקא הרגעים הקטנים של הצחוק, המשחק והחיבוק הם אלו שהכי שווה לנצור. <br></br>
צילומי ילדים הם חלק מסשן משפחתי שבו כולכם נכנסים לפריים, ביחד, ויוצרים מזכרת אמיתית שמספרת את הסיפור שלכם. <br></br>
מזמינה אתכם לשריין כבר עכשיו סשן צילומים חוויתי!
                  </p>
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
ההצלחה מתחילה עם תמונות תדמית מקצועיות המציגות אתכם.<br></br>
בין אם זה לתמונת פרופיל מנצחת ברשתות, פרופיל מקצועי בלינקדין, או הצגת העסק שלך – הן הכרטיס ביקור שלך!                </p>
                )}
              </div>
              
              {/* Order Button */}
              <div className="text-center mb-8">
                <a 
                  href={`/Packages?category=${selectedCategory === 'משפחה' || selectedCategory === 'ילדים' ? 'משפחה וילדים' : selectedCategory}`}
                  className="inline-flex items-center px-8 py-3 bg-[#F1BDAF] text-white font-semibold rounded-lg hover:bg-[#E8A896] transition-colors duration-300 shadow-lg hover:shadow-xl"
                  dir="rtl"
                >
                  הזמינו עכשיו
                </a>
              </div>
              
              {/* Independent Grid Columns - No Layout Jumping */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photoColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col gap-6">
                    {column.map((photo) => (
                      <div
                        key={photo.id}
                        className={`gallery-photo group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-600 ${
                          loadedImages.has(`${selectedCategory}-${photo.id}`) 
                            ? (newlyLoadedImages.has(`${selectedCategory}-${photo.id}`) ? 'animate-fade-in' : 'opacity-100')
                            : 'opacity-0'
                        }`}
                      >
                        {/* Image Container with Hover Effects */}
                        <div className="relative w-full bg-gray-100 overflow-hidden rounded-lg">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${photo.src}`}
                            alt={photo.alt}
                            width={1}
                            height={1}
                            className="w-full h-auto"
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            onLoad={() => {
                              handleImageLoad(`${selectedCategory}-${photo.id}`);
                            }}
                            onError={(e) => {
                              console.error('❌ Image failed:', photo.src, e);
                              console.error('❌ Full image path:', `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${photo.src}`);
                            }}
                          />
                          
                          {/* Dark overlay on hover */}
                          <div className="hover-overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-30"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Show loading indicator if more photos are available */}
              {visiblePhotosCount < currentPhotos.length && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1BDAF] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500" dir="rtl">טוען עוד תמונות...</p>
                </div>
              )}
            </>
          )}

          {/* Load More Button removed - showing all photos */}

          {/* Floating Back to Top Button */}
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="inline-flex items-center px-6 py-3 bg-[#F1BDAF] text-white font-semibold rounded-full hover:bg-[#E8A896] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              dir="rtl"
            >
              ↑
            </button>
          </div>
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
          <span className="block text-left" dir="rtl"> © כל הזכויות שמורות לרויטל פרצלינה</span>
        </div>
      </footer>
    </>
  );
}