const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/Gallery/page.tsx', 'utf8');

// Put גיל מצווה last in the category bar
const newOrder = "['תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון', 'גיל מצווה']";

// Replace both instances of the categories array
content = content.replace(
  "        const categories = ['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון'];",
  `        const categories = ${newOrder};`
);

content = content.replace(
  "  const categories = ['גיל מצווה', 'תדמית', 'ילדים', 'משפחה', 'בייבי', 'הריון'];",
  `  const categories = ${newOrder};`
);

// Now modify the default selection logic to use גיל מצווה as default
content = content.replace(
  "        const firstCategoryWithPhotos = categories.find(category => \n          data[category] && data[category].photos && data[category].photos.length > 0\n        );",
  "        // Set גיל מצווה as default if it has photos, otherwise use first available\n        const defaultCategory = data['גיל מצווה'] && data['גיל מצווה'].photos && data['גיל מצווה'].photos.length > 0 \n          ? 'גיל מצווה'\n          : categories.find(category => \n              data[category] && data[category].photos && data[category].photos.length > 0\n            );"
);

content = content.replace(
  "        if (firstCategoryWithPhotos) {\n          setSelectedCategory(firstCategoryWithPhotos);\n          console.log('Selected category:', firstCategoryWithPhotos);\n          console.log('Category photos count:', data[firstCategoryWithPhotos].photos.length);\n        }",
  "        if (defaultCategory) {\n          setSelectedCategory(defaultCategory);\n          console.log('Selected category:', defaultCategory);\n          console.log('Category photos count:', data[defaultCategory].photos.length);\n        }"
);

// Write back to file
fs.writeFileSync('app/Gallery/page.tsx', content);

console.log('Set גיל מצווה as LAST in category bar but DEFAULT category');
