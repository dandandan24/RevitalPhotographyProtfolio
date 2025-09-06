const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Update both instances of the categories array with גיל מצווה first
const newOrder = "['גיל מצווה', 'הריון', 'בייבי', 'משפחה', 'ילדים', 'תדמית']";

// Replace the first instance (in useEffect)
content = content.replace(
  "        const categories = ['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון'];",
  `        const categories = ${newOrder};`
);

// Replace the second instance (main categories array)
content = content.replace(
  "  const categories = ['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון'];",
  `  const categories = ${newOrder};`
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Fixed gallery category order with גיל מצווה first: גיל מצווה, הריון, בייבי, משפחה, ילדים, תדמית');
