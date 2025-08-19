'use client';

import { useState, useEffect } from 'react';

export default function TestGallery() {
  const [galleryData, setGalleryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/gallery-data.json')
      .then(res => res.json())
      .then(data => {
        setGalleryData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const batMitzvaPhotos = galleryData['בר מצווה']?.photos || [];

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Gallery Test</h1>
      
      <div className="mb-4">
        <p>Found {batMitzvaPhotos.length} photos in בר מצווה</p>
        <p>Selected category: בר מצווה</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {batMitzvaPhotos.map((photo: any) => (
          <div key={photo.id} className="border p-4">
            <p>ID: {photo.id}</p>
            <p>Filename: {photo.filename}</p>
            <p>Src: {photo.src}</p>
            <p>Alt: {photo.alt}</p>
            
            {/* Test with regular img tag */}
            <div className="mt-2">
              <p>Regular img tag:</p>
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-32 h-32 object-cover border"
                onLoad={() => console.log('✅ Image loaded:', photo.src)}
                onError={(e) => console.error('❌ Image failed:', photo.src, e)}
              />
            </div>

            {/* Test with Next.js Image */}
            <div className="mt-2">
              <p>Next.js Image:</p>
              <div className="w-32 h-32 border bg-gray-100 flex items-center justify-center">
                <p className="text-xs text-center">Next.js Image here</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 