const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Remove the shuffle function and restore original photo processing
const originalPhotoProcessing = `  const categories = ['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'];
  const allPhotos = galleryData[selectedCategory]?.photos || [];
  const currentPhotos = allPhotos; // Show all photos in category
  const visiblePhotos = currentPhotos.slice(0, visiblePhotosCount); // Show only visible count`;

// Replace the shuffle function and shuffled photo processing
content = content.replace(
  /  \/\/ Shuffle array function for random photo order\s*const shuffleArray = \(array: Photo\[\]\): Photo\[\] => \{[\s\S]*?\};\s*const categories = \['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'\];\s*const allPhotos = galleryData\[selectedCategory\]\?\.photos \|\| \[\];\s*const shuffledPhotos = shuffleArray\(allPhotos\); \/\/ Shuffle the photos\s*const currentPhotos = shuffledPhotos; \/\/ Use shuffled photos\s*const visiblePhotos = currentPhotos\.slice\(0, visiblePhotosCount\); \/\/ Show only visible count/,
  originalPhotoProcessing
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Reverted gallery to original photo order');
