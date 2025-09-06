const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Update both instances of the categories array to the new order
const newOrder = "['גיל מצווה', 'הריון', 'בייבי', 'משפחה', 'ילדים', 'תדמית']";

// Replace the first instance (in useEffect)
content = content.replace(
  "        const categories = ['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'];",
  `        const categories = ${newOrder};`
);

// Replace the second instance (main categories array)
content = content.replace(
  "  const categories = ['גיל מצווה', 'הריון', 'תדמית', 'בייבי', 'משפחה', 'ילדים'];",
  `  const categories = ${newOrder};`
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Updated gallery category order to: גיל מצווה, הריון, בייבי, משפחה, ילדים, תדמית');
