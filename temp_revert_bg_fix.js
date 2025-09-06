const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Revert back to the original background transition logic
content = content.replace(
  `  // Rotate background every 10 seconds (desktop and mobile)
  useEffect(() => {
    const list = isMobile ? mobileBackgrounds : desktopBackgrounds;
    const timer = setInterval(() => {
      // Compute next index once and crossfade to it
      const nextIndex = (bgIndex + 1) % list.length;
      setNextBgIndex(nextIndex);
      setIsFading(true);
      
      // After transition completes, swap the indices
      const to = setTimeout(() => {
        setBgIndex(nextIndex);
        setNextBgIndex((nextIndex + 1) % list.length);
        setIsFading(false);
      }, 800);
      
      return () => clearTimeout(to);
    }, 10000);
    return () => clearInterval(timer);
  }, [isMobile, bgIndex]);`,
  `  // Rotate background every 10 seconds (desktop and mobile)
  useEffect(() => {
    const list = isMobile ? mobileBackgrounds : desktopBackgrounds;
    const timer = setInterval(() => {
      // Compute next index once and crossfade to it
      setNextBgIndex((bgIndex + 1) % list.length);
      setIsFading(true);
      const to = setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % list.length);
        setIsFading(false);
      }, 800);
      return () => clearTimeout(to);
    }, 10000);
    return () => clearInterval(timer);
  }, [isMobile, bgIndex]);`
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Reverted background transition logic back to original');
