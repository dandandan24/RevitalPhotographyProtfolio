const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Completely reverse the current order
const newOrder = "['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה']";

// Replace the first instance (in useEffect)
content = content.replace(
  "        const categories = ['גיל מצווה', 'הריון', 'בייבי', 'משפחה', 'ילדים', 'תדמית'];",
  `        const categories = ${newOrder};`
);

// Replace the second instance (main categories array)
content = content.replace(
  "  const categories = ['גיל מצווה', 'הריון', 'בייבי', 'משפחה', 'ילדים', 'תדמית'];",
  `  const categories = ${newOrder};`
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Completely reversed gallery category order: תדמית, ילדים, משפחה, בייבי, הריון, גיל מצווה');
