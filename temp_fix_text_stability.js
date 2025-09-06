const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Restructure the layout to keep text stable during background transitions
content = content.replace(
      `      <div className="relative h-screen flex flex-col justify-start md:justify-center items-center md:items-end bg-gray-500 px-8 md:px-16 lg:px-32 bg-cover bg-contain md:bg-cover bg-no-repeat pt-20 md:pt-0 home-hero-section" style={{
        backgroundImage: \`url('\${(isMobile ? mobileBackgrounds : desktopBackgrounds)[bgIndex]}')\`,
        backgroundPosition: isMobile ? 'center' : 'left center',
      }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: \`url('\${(isMobile ? mobileBackgrounds : desktopBackgrounds)[nextBgIndex]}')\`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center' : 'left center',
            transition: 'opacity 800ms ease',
            opacity: isFading ? 1 : 0,
          }}
        />
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white my-2 md:my-8 lg:my-10 text-center md:text-right" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} dir="rtl"><span className="text-[#F1BDAF]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>החיים</span> מלאים <br></br><span className="text-[#F1BDAF]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>רגעים קסומים</span><br></br>כאן דואגים שהם <br></br>יישארו אתכם לתמיד</h1>
        <Button asChild variant="standard" size="xl" className="text-base md:text-lg font-bold mt-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          <Link href="/Contact">לחוויה בלתי נשכחת</Link>
        </Button>`,
      `      <div className="relative h-screen flex flex-col justify-start md:justify-center items-center md:items-end bg-gray-500 px-8 md:px-16 lg:px-32 bg-cover bg-contain md:bg-cover bg-no-repeat pt-20 md:pt-0 home-hero-section" style={{
        backgroundImage: \`url('\${(isMobile ? mobileBackgrounds : desktopBackgrounds)[bgIndex]}')\`,
        backgroundPosition: isMobile ? 'center' : 'left center',
      }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: \`url('\${(isMobile ? mobileBackgrounds : desktopBackgrounds)[nextBgIndex]}')\`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center' : 'left center',
            transition: 'opacity 800ms ease',
            opacity: isFading ? 1 : 0,
          }}
        />
        {/* Text content - positioned above background layers */}
        <div className="relative z-10 flex flex-col justify-start md:justify-center items-center md:items-end">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white my-2 md:my-8 lg:my-10 text-center md:text-right" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} dir="rtl"><span className="text-[#F1BDAF]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>החיים</span> מלאים <br></br><span className="text-[#F1BDAF]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>רגעים קסומים</span><br></br>כאן דואגים שהם <br></br>יישארו אתכם לתמיד</h1>
          <Button asChild variant="standard" size="xl" className="text-base md:text-lg font-bold mt-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            <Link href="/Contact">לחוויה בלתי נשכחת</Link>
          </Button>
        </div>`
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Fixed text stability during background transitions');
