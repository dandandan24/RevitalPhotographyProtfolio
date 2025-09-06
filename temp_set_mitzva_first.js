const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Put גיל מצווה first so it becomes the default
const newOrder = "['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון']";

// Replace the first instance (in useEffect)
content = content.replace(
  "        const categories = ['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה'];",
  `        const categories = ${newOrder};`
);

// Replace the second instance (main categories array)
content = content.replace(
  "  const categories = ['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה'];",
  `  const categories = ${newOrder};`
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Set גיל מצווה as first/default category: גיל מצווה, תדמית, ילדים, משפחה, בייבי, הריון');
