const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Add collage.png as background image to the header content section
content = content.replace(
          '          {/* Header Content */}\n          <div className="text-center py-16 relative z-20">',
          '          {/* Header Content */}\n          <div className="text-center py-16 relative z-20" style={{ backgroundImage: `url(\'${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/collage.png\')`, backgroundSize: \'cover\', backgroundPosition: \'center\', backgroundRepeat: \'no-repeat\' }}>'
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Added collage.png as background image to Gallery header');
