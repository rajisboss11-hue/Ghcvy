import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { PLAYERS } from './data';
import { IntroSlide } from './components/IntroSlide';
import { NumberSlide } from './components/NumberSlide';
import { PlayerSlide } from './components/PlayerSlide';
import { VideoCanvas } from './components/VideoCanvas';
import { WicketTransition } from './components/WicketTransition';

// Let's refine the timings:
// Intro: 10s
// Loop per player:
// - Number: 4s
// - Transition: 1.5s
// - Player: 12.5s
// Total per player = 18s. 10 players * 18 = 180 seconds.
// Total runtime = 190 seconds (3 min 10 sec).

export default function App() {
  const [phase, setPhase] = useState<'intro' | 'number' | 'transition' | 'player' | 'end'>('intro');
  const [playerIndex, setPlayerIndex] = useState(0);

  // Presenter Loop State Machine
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'intro') {
      timeout = setTimeout(() => {
        setPhase('number');
        setPlayerIndex(0); // Start at rank 10
      }, 10000);
    } else if (phase === 'number') {
      timeout = setTimeout(() => {
        setPhase('transition');
      }, 4000);
    } else if (phase === 'transition') {
      timeout = setTimeout(() => {
        setPhase('player');
      }, 1500);
    } else if (phase === 'player') {
      timeout = setTimeout(() => {
        if (playerIndex < PLAYERS.length - 1) {
          setPlayerIndex(prev => prev + 1);
          setPhase('number');
        } else {
          setPhase('end');
        }
      }, 12500);
    }

    return () => clearTimeout(timeout);
  }, [phase, playerIndex]);

  return (
    <VideoCanvas>
      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroSlide key="intro" />}
        {phase === 'number' && <NumberSlide key={`num-${playerIndex}`} rank={PLAYERS[playerIndex].rank} color={PLAYERS[playerIndex].primaryColor} />}
        {phase === 'transition' && <WicketTransition key={`trans-${playerIndex}`} index={playerIndex} />}
        {phase === 'player' && <PlayerSlide key={`player-${playerIndex}`} player={PLAYERS[playerIndex]} />}
        {phase === 'end' && (
          <div key="end" className="absolute inset-0 flex items-center justify-center bg-[#0a1628] text-[#ffd700] text-[60px] tracking-[10px] uppercase font-bold text-center">
            END OF PRESENTATION
          </div>
        )}
      </AnimatePresence>
    </VideoCanvas>
  );
}



