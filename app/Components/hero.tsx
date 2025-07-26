
 type HeroProps = {
    children: React.ReactNode;
    background?: string;
    alignment?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  };
  
  export default function Hero({ children, background, alignment = 'end', justify = 'center' }: HeroProps) {
    const alignments = {
      start: 'items-start',
      center: 'items-center', 
      end: 'items-end'
    };
  
    const justifies = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    };
  
    return (
      <div className={`min-h-[calc(100vh-4rem)] flex flex-col ${justifies[justify]} ${alignments[alignment]} px-32 ${background}`}>
        {children}
      </div>
    );
  }