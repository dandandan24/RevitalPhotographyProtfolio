const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Move background from header content to the parent container that includes both header and category bar
content = content.replace(
          '        <div className="bg-white shadow-sm relative overflow-hidden">',
          '        <div className="bg-white shadow-sm relative overflow-hidden" style={{ backgroundImage: `url(\'${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/collage.png\')`, backgroundSize: \'cover\', backgroundPosition: \'center\', backgroundRepeat: \'no-repeat\' }}>'
);

// Remove background from header content div
content = content.replace(
          '          <div className="text-center py-16 relative z-20" style={{ backgroundImage: `url(\'${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/collage.png\')`, backgroundSize: \'cover\', backgroundPosition: \'center\', backgroundRepeat: \'no-repeat\' }}>',
          '          <div className="text-center py-16 relative z-20">'
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Extended collage.png background to cover both header and category bar');
