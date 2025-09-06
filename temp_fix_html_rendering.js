const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Packages/page.tsx', 'utf8');

// Replace the plain text rendering with dangerouslySetInnerHTML for HTML support
content = content.replace(
  '                          <span className="text-gray-700 text-sm">{offer}</span>',
  '                          <span className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: offer }}></span>'
);

// Write back to file
fs.writeFileSync('app/Packages/page.tsx', content);

console.log('Updated offer rendering to support HTML with dangerouslySetInnerHTML');
