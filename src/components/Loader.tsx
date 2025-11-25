import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_PHRASES = [
  "Initializing H2H Protocol...",
  "Aligning Brand Voice...",
  "Connecting Humans...",
  "Ready."
];

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Text Cycle Logic
    const textInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev < LOADING_PHRASES.length - 1 ? prev + 1 : prev));
    }, 800);

    // 2. Counter Logic (Ease-out effect)
    let start = 0;
    const end = 100;
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    const animateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function: 1 - pow(1 - x, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(start + (end - start) * easeOut);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        // Animation Complete
        clearInterval(textInterval);
        setTimeout(() => setIsFinished(true), 500); // Slight pause at 100%
        if (onComplete) setTimeout(onComplete, 1500); // Trigger parent callback
      }
    };

    requestAnimationFrame(animateCounter);

    return () => clearInterval(textInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white overflow-hidden"
        >
          {/* --- BACKGROUND FX --- */}
          
          {/* Grain */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
          
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px]" />

          {/* --- CONTENT --- */}
          
          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            
            {/* Logo */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://ik.imagekit.io/qcvroy8xpd/unnamed%20(1).png?updatedAt=1760474246200"
              alt="H2H Logo"
              className="h-24 md:h-32 w-auto mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />

            {/* The Big Counter */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl md:text-8xl font-bold tracking-tighter tabular-nums leading-none">
                {count}
              </span>
              <span className="text-xl md:text-2xl text-orange-500 font-medium">%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full mb-4">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-rose-500"
                style={{ width: `${count}%` }}
              />
              {/* Leading white tip for the bar */}
              <motion.div 
                className="absolute top-0 bottom-0 w-[20px] bg-white blur-[5px]"
                style={{ left: `${count}%`, transform: 'translateX(-100%)' }}
              />
            </div>

            {/* Changing Text */}
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm uppercase tracking-[0.2em] text-neutral-400"
                >
                  {LOADING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom aligned branding */}
          <div className="absolute bottom-10 text-[10px] text-white/20 tracking-widest uppercase">
            Human 2 Human Agency ©2024
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}