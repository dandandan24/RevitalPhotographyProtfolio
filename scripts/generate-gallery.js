const fs = require('fs');
const path = require('path');

// Define the folders to scan in public directory
const galleryFolders = {
  'גיל מצווה': 'BatMitzva',
  'בייבי': 'Baby',
  'תדמית': 'Character',
  'משפחה': 'Family',
  'הריון': 'Pregnancy',
  'ילדים': 'Kids',
  'כללי': 'General',
};

function scanPhotos() {
  const photoData = {};
  
  Object.entries(galleryFolders).forEach(([categoryName, folderName]) => {
    const folderPath = path.join(__dirname, '..', 'public', folderName);
    
    // Check if folder exists
    if (fs.existsSync(folderPath)) {
      // Read all files in the folder
      const files = fs.readdirSync(folderPath)
        .filter(file => {
          // Only include image files
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        })
        .map((file, index) => ({
          id: index + 1,
          filename: file,
          src: `/${folderName}/${file}`,
          alt: `${categoryName} ${index + 1}`,
          title: `${categoryName} ${index + 1}`
        }));
      
      photoData[categoryName] = {
        folder: folderName,
        photos: files,
        count: files.length
      };
      
      console.log(`Found ${files.length} photos in ${categoryName} (${folderName})`);
    } else {
      console.log(`Folder not found: ${folderPath}`);
      photoData[categoryName] = {
        folder: folderName,
        photos: [],
        count: 0
      };
    }
  });
  
  // Write the data to a JSON file
  const outputPath = path.join(__dirname, '..', 'public', 'gallery-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(photoData, null, 2));
  
  console.log(`Gallery data generated successfully! Found ${Object.values(photoData).reduce((sum, cat) => sum + cat.count, 0)} total photos.`);
  console.log('Data saved to: public/gallery-data.json');
}

// Run the scan
scanPhotos(); 