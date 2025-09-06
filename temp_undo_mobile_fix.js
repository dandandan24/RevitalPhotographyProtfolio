const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Revert isMobile initialization back to the original
content = content.replace(
  "  const [isMobile, setIsMobile] = useState(() => {\n    if (typeof window !== 'undefined') {\n      return window.innerWidth < 768;\n    }\n    return false;\n  });",
  "  const [isMobile, setIsMobile] = useState(false);"
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Reverted isMobile initialization back to original');
