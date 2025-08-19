'use client';

import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Loading gallery data...');
    fetch('/gallery-data.json')
      .then(response => response.json())
      .then((data: GalleryData) => {
        console.log('Gallery data loaded:', data);
        setGalleryData(data);
        // Set first category with photos as default
        const firstCategoryWithPhotos = Object.entries(data).find(([_, categoryData]) => categoryData.count > 0);
        if (firstCategoryWithPhotos) {
          setSelectedCategory(firstCategoryWithPhotos[0]);
          console.log('Selected category:', firstCategoryWithPhotos[0]);
        }
        setLoading(false);
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center py-16 bg-white shadow-sm">
        <h1 className="text-5xl font-bold text-gray-900 mb-4" dir="rtl">גלריית תמונות</h1>
        <p className="text-xl text-gray-600" dir="rtl">גלו את העבודות שלי</p>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisiblePhotos(6);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                dir="rtl"
              >
                {category} ({galleryData[category]?.count || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="w-full mx-auto xl:w-[90%] px-4 sm:px-6 lg:px-8 xl:px-0 py-12">
        {currentPhotos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500" dir="rtl">אין תמונות בקטגוריה זו</p>
          </div>
        ) : (
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
                    onLoad={() => console.log('✅ Image loaded:', photo.src)}
                    onError={(e) => console.error('❌ Image failed:', photo.src, e)}
                  />
                  
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  {/* Title overlay - hidden by default, shown on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg text-white" dir="rtl">{photo.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}