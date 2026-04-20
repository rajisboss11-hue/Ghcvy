import { motion } from "motion/react";
import { Particles } from "./Particles";

export function IntroSlide() {
  return (
    <motion.div 
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1628]"
    >
      <Particles />
      
      <div className="z-10 flex flex-col items-center justify-center h-full text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="ipl-badge mb-6 font-bold tracking-widest text-[24px] px-8 py-3 rounded-xl"
          >
            INDIAN PREMIER LEAGUE
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="main-title text-[70px] w-full max-w-[1000px] leading-[1.1] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-black uppercase text-center flex-wrap"
          >
            TOP 10<br/>WICKET-TAKERS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-[#94a3b8] text-[28px] font-medium tracking-wide mt-8 px-10"
          >
            The Most Lethal Bowlers Leading the Attack
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

