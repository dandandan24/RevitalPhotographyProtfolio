import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = '/Users/dan/Documents/WebImages/Packages/HeadPackage/';
const outputDir = '/Users/dan/Documents/WebImages/Packages/HeadPackage/resized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

// Define your sizes (width x height)
const sizes = [
  { width: 2500, height: 1250 },
];

// Get all image files from input directory
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];
const files = fs.readdirSync(inputDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext);
});

console.log(`Found ${files.length} image files to process`);

files.forEach(file => {
  const inputPath = path.join(inputDir, file);
  
  // Check if input file exists and is readable
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    return;
  }

  sizes.forEach(size => {
    const outputPath = path.join(
      outputDir,
      `${path.parse(file).name}.webp`
    );

    console.log(`Processing: ${file} -> ${path.basename(outputPath)}`);

    sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',       // options: 'cover', 'contain', 'fill', 'inside', 'outside'
        position: 'center', // crop position if needed
      })
      .toFormat('webp')      // or 'avif', 'jpeg', 'png'
      .toFile(outputPath)
      .then(() => console.log(`✅ Created ${outputPath}`))
      .catch(err => console.error(`❌ Error processing ${file}:`, err.message));
  });
});
