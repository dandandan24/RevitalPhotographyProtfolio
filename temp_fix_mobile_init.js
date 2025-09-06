const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Fix the isMobile initialization to prevent the delay
content = content.replace(
  "  const [isMobile, setIsMobile] = useState(false);",
  "  const [isMobile, setIsMobile] = useState(() => {\n    if (typeof window !== 'undefined') {\n      return window.innerWidth < 768;\n    }\n    return false;\n  });"
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Fixed isMobile initialization to prevent delay on mobile');
