import { motion } from "motion/react";

interface PlayerProps {
  player: {
    rank: number;
    name: string;
    team: string;
    teamAbbr: string;
    primaryColor: string;
    badgeColors: string;
    bgGradient: string;
    glowGradient: string;
    label: string;
    imageUrl?: string;
    stats: { main: string; matches: string; avg: string; econ: string; best: string; impact: string; };
  };
}

export function PlayerSlide({ player }: PlayerProps) {
  // Enhancements for Top 3
  const isTop3 = player.rank <= 3;
  let rankColor = player.primaryColor;
  if (player.rank === 1) rankColor = '#FFDF00';
  else if (player.rank === 2) rankColor = '#C0C0C0';
  else if (player.rank === 3) rankColor = '#CD7F32';

  return (
    <motion.div
      key={player.rank}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col w-[1080px] h-[1080px] bg-[#0a1628] overflow-hidden"
    >
      {/* 1. Base Layer: Original Image spanning the entire background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-[0]"
      >
        {player.imageUrl && (
          <img 
            src={player.imageUrl} 
            alt={player.name}
            className="w-full h-full object-cover object-top opacity-85"
          />
        )}
      </motion.div>

      {/* 2. Middle Layer: Professional Transparent Blending Gradients for Extreme Contrast */}
      <div className="absolute inset-0 z-[10]">
        {/* Top shadow for badge */}
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-[#0a1628]/95 to-transparent"></div>
        
        {/* Massive bottom gradients for pure readability of Bangla text */}
        <div className="absolute bottom-0 inset-x-0 h-[800px] bg-gradient-to-t from-black via-black/95 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-[550px]" style={{
          background: `linear-gradient(to top, black 40%, ${player.primaryColor}50 90%, transparent 100%)`
        }}></div>
        
        {/* Isolated Particles for Top 3 */}
        {isTop3 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[15]">
            {Array.from({length: 15}).map((_, i) => (
              <div key={i} className="particle" style={{ width: `${Math.random()*15 + 5}px`, height: `${Math.random()*15 + 5}px`, left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: rankColor, animationDelay: `${Math.random()*5}s` }}></div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Floating Assets layer (cricket balls, text overlay) */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        <div className="cricket-ball ball-anim-1 z-10" style={{ top: '20%', left: '8%', transform: 'scale(1.2)' }}></div>
        <div className="cricket-ball ball-anim-2 z-10" style={{ top: '15%', right: '12%', transform: 'scale(1.0)' }}></div>
        
        {/* Huge slanted background name text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} className="absolute inset-0 overflow-hidden mix-blend-overlay">
          <div className="text-[250px] font-black text-white whitespace-nowrap transform -rotate-12 absolute top-[20%] -left-20">
            {player.name.toUpperCase()}
          </div>
        </motion.div>
      </div>

      {/* 4. Top Layer: Text & UI Elements */}
      <div className="absolute inset-0 z-[20] flex flex-col justify-between p-12">
        {/* Top Header: Team Badge */}
        <div className="flex justify-end w-full">
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            className="team-badge-custom shadow-2xl" style={{ background: player.badgeColors, boxShadow: `0 20px 40px ${player.primaryColor}90` }}
          >
            {player.teamAbbr}
          </motion.div>
        </div>

        {/* Bottom Content: Player Stats Panel */}
        <div className="w-full relative flex flex-col mt-auto">
          {/* Rank & Name Anchor */}
          <div className="relative mb-6">
            <div className="flex items-center">
              <motion.div 
                initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                className="font-black leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                style={isTop3 ? { fontSize: '180px', background: `linear-gradient(135deg, white, ${rankColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 0 30px ${rankColor}90)` } : { fontSize: '160px', color: 'white', textShadow: `0 10px 40px ${player.primaryColor}` }}
              >
                {player.rank}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="text-[32px] font-bold tracking-[8px] ml-6 mb-6"
                style={{ color: rankColor, alignSelf: 'flex-end', textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}
              >
                RANK
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
              className="text-[64px] font-[900] text-white tracking-[2px] leading-[1.1] mt-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              style={isTop3 ? { textShadow: `0 0 25px ${rankColor}90` } : {}}
            >
              {player.name}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="text-[28px] text-white/90 mt-1 drop-shadow-lg font-medium"
            >{player.team}</motion.p>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              className="text-[24px] font-bold mt-1 uppercase tracking-[3px] drop-shadow-md"
              style={{ color: player.primaryColor }}
            >{player.label}</motion.p>
          </div>
          
          {/* The Data Panel with subtle movement */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.6 }}
            className="w-full rounded-[30px] border-[2px] p-6 relative overflow-hidden backdrop-blur-3xl flex flex-row gap-6 items-center"
            style={{ borderColor: `${player.primaryColor}80`, background: 'rgba(5, 10, 20, 0.85)', boxShadow: `0 40px 80px rgba(0,0,0,0.9), inset 0 0 100px ${player.primaryColor}30` }}
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `linear-gradient(135deg, ${player.primaryColor} 0%, transparent 100%)` }}></div>
            
            {/* Primary Stat Block */}
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }} 
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex-shrink-0 main-stat flex flex-col items-center justify-center p-6 bg-black/80 rounded-2xl h-full w-[380px] relative overflow-hidden" 
              style={{ border: `2px solid ${player.primaryColor}`, boxShadow: `0 15px 40px rgba(0,0,0,0.9), inset 0 0 50px ${player.primaryColor}60` }}
            >
              {/* Vibrant Inner Core Glow */}
              <div className="absolute inset-0 opacity-50 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${player.primaryColor} 0%, transparent 60%)` }}></div>
              
              <div className="text-[140px] font-black leading-none text-white relative z-10" style={{ textShadow: `0 10px 40px ${player.primaryColor}` }}>{player.stats.main}</div>
              <div className="text-[20px] text-white/95 tracking-[6px] mt-2 font-bold drop-shadow-md relative z-10">TOTAL WICKETS</div>
            </motion.div>
            
            {/* Sub Stats Grid */}
            <div className="grid grid-cols-2 gap-4 flex-grow h-full">
              <StatItem label="MATCHES" val={player.stats.matches} color={player.primaryColor} delay={0} />
              <StatItem label="AVERAGE" val={player.stats.avg} color={player.primaryColor} delay={0.2} />
              <StatItem label="ECONOMY" val={player.stats.econ} color={player.primaryColor} delay={0.4} />
              <StatItem label="BEST BOWL" val={player.stats.best} color={player.primaryColor} delay={0.6} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ label, val, color, delay }: { label: string, val: string, color: string, delay: number }) {
  return (
    <motion.div 
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay }}
      className="bg-black/70 border-[2px] rounded-[16px] p-4 text-center backdrop-blur-3xl flex flex-col justify-center h-full shadow-[0_15px_30px_rgba(0,0,0,0.8)]" 
      style={{ borderColor: `${color}60` }}
    >
      <div className="text-[44px] font-bold text-white leading-none drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)]">{val}</div>
      <div className="text-[18px] text-white/95 tracking-[1px] mt-2 font-semibold drop-shadow-md uppercase">{label}</div>
    </motion.div>
  );
}
