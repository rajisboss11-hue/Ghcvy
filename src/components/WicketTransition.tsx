import { motion } from "motion/react";

export function WicketTransition({ index }: { index: number }) {
  // Use index to vary the animation properties
  const isEven = index % 2 === 0;
  const startY = isEven ? 150 : -50;
  const throwAngle = isEven ? -100 : 100;
  const rotateStart = isEven ? 0 : 360;
  const rotateEnd = isEven ? 1080 : -720;
  
  // Vary stump scattering
  const s0_rot = -45 - (index * 5);
  const s1_rot = -20 + (index * 2);
  const s2_rot = 60 + (index * 4);

  return (
    <motion.div
      key={`wicket-trans-${index}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="relative w-[800px] h-[600px] flex items-center justify-center">
        
        {/* Ball zooming in to hit stumps */}
        <motion.div
          initial={{ x: -800, y: startY, scale: 0.5, rotate: rotateStart }}
          animate={{ x: 800, y: throwAngle, scale: 2.5, rotate: rotateEnd }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="absolute z-50 text-[60px]"
        >
          <div className="cricket-ball relative !w-[40px] !h-[40px]"></div>
        </motion.div>

        {/* 3 Stumps */}
        <div className="flex gap-5 relative z-40">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ rotate: 0, y: 0, x: 0 }}
              animate={{ 
                rotate: i === 0 ? s0_rot : i === 1 ? s1_rot : s2_rot,
                y: i === 1 ? -120 : -60,
                x: i === 0 ? -180 : i === 1 ? (isEven ? 70 : -30) : 220,
                opacity: [1, 1, 0]
              }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="w-5 h-[300px] rounded-t-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #FAD6A5 0%, #D4A373 50%, #9C6644 100%)',
                boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.4), inset -2px 0 6px rgba(0,0,0,0.6), 0 30px 40px rgba(0,0,0,0.8)'
              }}
            >
              {/* Zing LED Top Glow effect */}
              <div className="absolute top-[3px] inset-x-0 h-[25px] bg-red-600 shadow-[0_0_20px_10px_rgba(255,0,0,0.8)] border-b border-white/50 blur-[1px]"></div>
              <div className="absolute top-[5px] inset-x-1 h-[10px] bg-white opacity-80 rounded-full"></div>
            </motion.div>
          ))}
          
          {/* Bails flying off (Glowing Zing Bails) */}
          {[0, 1].map((i) => (
            <motion.div
              key={`bail-${i}`}
              initial={{ y: -305, x: i === 0 ? 10 : 35, rotate: 0 }}
              animate={{
                y: -500 - (index * 10),
                x: i === 0 ? -250 : 250,
                rotate: i === 0 ? -720 : 720,
                opacity: [1, 1, 0]
              }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute w-12 h-3 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #ff4b4b, #b30000)',
                border: '1px solid #ff9999',
                boxShadow: '0 0 30px 10px rgba(255,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.8)'
              }}
            />
          ))}
        </div>

        {/* "STUMPED!" Action text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1.5, 0] }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute z-60 font-black text-[#dc2626] text-[180px] uppercase tracking-tighter drop-shadow-[0_0_50px_rgba(220,38,38,0.8)] leading-none text-center"
          style={{ WebkitTextStroke: "6px white" }}
        >
          {isEven ? "OUT!" : "BOWLED!"}
        </motion.div>
      </div>
    </motion.div>
  );
}

