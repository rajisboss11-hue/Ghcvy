import { useEffect, useState } from 'react';

export function VideoCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      const tw = 1080; // 1:1 Square Video Format
      const th = 1080; 
      
      // Calculate scale to perfectly FIT within the screen (letterbox)
      const scaleFactor = Math.min(sw / tw, sh / th);
      setScale(scaleFactor);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden pointer-events-none select-none w-screen h-screen">
      <div 
        className="absolute origin-center"
        style={{
          width: '1080px',
          height: '1080px',
          transform: `scale(${scale})`
        }}
      >
        {children}
      </div>
    </div>
  );
}


