const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Update background position to be responsive: left center for desktop, center for mobile
content = content.replace(
  "            backgroundPosition: 'center',",
  "            backgroundPosition: isMobile ? 'center' : 'left center',"
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Updated background position: left center for desktop, center for mobile');
