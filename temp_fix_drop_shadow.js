const fs = require('fs');

// Read the file
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Fix the drop shadow by making it more stable and consistent
content = content.replace(
  '        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white my-2 md:my-8 lg:my-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-center md:text-right" dir="rtl"><span className="text-[#F1BDAF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">החיים</span> מלאים <br></br><span className="text-[#F1BDAF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">רגעים קסומים</span><br></br>כאן דואגים שהם <br></br>יישארו אתכם לתמיד</h1>',
  '        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white my-2 md:my-8 lg:my-10 text-center md:text-right" style={{ textShadow: \'0 2px 4px rgba(0,0,0,0.8)\' }} dir="rtl"><span className="text-[#F1BDAF]" style={{ textShadow: \'0 2px 4px rgba(0,0,0,0.8)\' }}>החיים</span> מלאים <br></br><span className="text-[#F1BDAF]" style={{ textShadow: \'0 2px 4px rgba(0,0,0,0.8)\' }}>רגעים קסומים</span><br></br>כאן דואגים שהם <br></br>יישארו אתכם לתמיד</h1>'
);

// Also fix the button drop shadow
content = content.replace(
  '        <Button asChild variant="standard" size="xl" className="text-base md:text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-4">',
  '        <Button asChild variant="standard" size="xl" className="text-base md:text-lg font-bold mt-4" style={{ textShadow: \'0 2px 4px rgba(0,0,0,0.8)\' }}>'
);

// Write back to file
fs.writeFileSync('app/page.tsx', content);

console.log('Fixed drop shadow to be stable during background transitions');
