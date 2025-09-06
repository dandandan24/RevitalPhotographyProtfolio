const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Packages/page.tsx', 'utf8');

// Make the "מצולם נוסף בתוספת של 150₪" line conditional - hide for pregnancy
content = content.replace(
  '            <p>מצולם נוסף בתוספת של 150₪</p>',
  '            {selectedCategory !== \'הריון\' && <p>מצולם נוסף בתוספת של 150₪</p>}'
);

// Write back to file
fs.writeFileSync('app/Packages/page.tsx', content);

console.log('Made "מצולם נוסף בתוספת של 150₪" conditional - hidden for pregnancy packages');
