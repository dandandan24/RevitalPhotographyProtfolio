const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Packages/page.tsx', 'utf8');

// Add line break before "בשווי 300" in all instances
content = content.replace(
  /'ליווי וייעוץ סטיילינג טרום הצילומים – בשווי 300 ₪ - במתנה!'/g,
  "'ליווי וייעוץ סטיילינג טרום הצילומים –\\nבשווי 300 ₪ - במתנה!'"
);

// Write back to file
fs.writeFileSync('app/Packages/page.tsx', content);

console.log('Added line break before "בשווי 300" in all package descriptions');
