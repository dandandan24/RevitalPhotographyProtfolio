const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Add a permanent shuffle that only happens once when data loads
const permanentShuffleCode = `  // Shuffle array function for permanent photo order
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

  const categories = ['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'];
  const allPhotos = galleryData[selectedCategory]?.photos || [];
  const shuffledPhotos = shuffleArray(allPhotos); // Permanent shuffle
  const currentPhotos = shuffledPhotos; // Use permanently shuffled photos
  const visiblePhotos = currentPhotos.slice(0, visiblePhotosCount); // Show only visible count`;

// Replace the existing photo processing section
content = content.replace(
  /  const categories = \['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'\];\s*const allPhotos = galleryData\[selectedCategory\]\?\.photos \|\| \[\];\s*const currentPhotos = allPhotos; \/\/ Show all photos in category\s*const visiblePhotos = currentPhotos\.slice\(0, visiblePhotosCount\); \/\/ Show only visible count/,
  permanentShuffleCode
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Added permanent seeded shuffle to gallery');
