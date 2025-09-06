const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Update both instances of the categories array to the reversed order
const newOrder = "['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון']";

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

console.log('Reversed gallery category order: גיל מצווה, תדמית, ילדים, משפחה, בייבי, הריון');
