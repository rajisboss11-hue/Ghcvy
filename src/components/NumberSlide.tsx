import { motion } from "motion/react";

export function NumberSlide({ rank, color }: { rank: number; color?: string }) {
  // Top 3 specialized colors
  let rankColor = color || '#ffd700';
  let isSpecial = false;
  if (rank === 1) { rankColor = '#FFDF00'; isSpecial = true; } // Solid Gold
  else if (rank === 2) { rankColor = '#C0C0C0'; isSpecial = true; } // Silver
  else if (rank === 3) { rankColor = '#CD7F32'; isSpecial = true; } // Bronze

  let placeText = "";
  if (rank === 1) placeText = 'FIRST PLACE';
  else if (rank === 2) placeText = 'SECOND PLACE';
  else if (rank === 3) placeText = 'THIRD PLACE';

  return (
    <motion.div
      key={`num-${rank}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1628]"
    >
      {/* Background radial gradient representing team color */}
      <motion.div 
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.4 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{ background: `radial-gradient(circle, ${rankColor} 0%, transparent ${isSpecial ? '75%' : '60%'})` }}
      />
      
      <div className="flex flex-col items-center z-10 w-full relative">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ scale: 3, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
            className="text-transparent bg-clip-text font-black leading-none text-center"
            style={{ 
              fontSize: '450px', 
              backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${rankColor} 100%)`,
              filter: `drop-shadow(0 0 ${isSpecial ? '100px' : '60px'} ${rankColor}80)`
            }}
          >
            {rank}
          </motion.div>
        </motion.div>
        
        {rank === 1 && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-[-50px] text-[150px]"
          >
            👑
          </motion.div>
        )}

        {isSpecial && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
             className="text-white text-[70px] font-bold tracking-widest mt-4 text-shadow-xl drop-shadow-2xl"
             style={{ color: rankColor, filter: `drop-shadow(0 0 20px ${rankColor})` }}
           >
             {placeText}
           </motion.div>
        )}
      </div>
    </motion.div>
  );
}


