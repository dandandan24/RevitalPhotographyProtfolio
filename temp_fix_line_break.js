const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Packages/page.tsx', 'utf8');

// Replace \n with <br> for proper HTML line breaks
content = content.replace(
  /'ליווי וייעוץ סטיילינג טרום הצילומים –\\nבשווי 300 ₪ - במתנה!'/g,
  "'ליווי וייעוץ סטיילינג טרום הצילומים –<br>בשווי 300 ₪ - במתנה!'"
);

// Write back to file
fs.writeFileSync('app/Packages/page.tsx', content);

console.log('Replaced \\n with <br> tags for proper HTML line breaks');
