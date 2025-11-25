import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroText } from './HeroText';
import { HeroCanvas } from './HeroCanvas';

export function LusionHero() {
  const containerRef = useRef(null);
  
  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]); // Text moves slower
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, -50]); // Canvas floats up slightly

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#FDFDFD] overflow-hidden selection:bg-orange-500 selection:text-white"
    >
      {/* --- 1. AMBIENT TEXTURE (The "Paper" Feel) --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />
      
      {/* Optional: Subtle Gradient orb in top right for warmth */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-orange-100/40 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-12 md:pt-24 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* --- 2. THE BRAND ANCHOR (Left Col) --- */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit z-50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-default"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-neutral-950 flex items-center gap-2">
                H2H
                <span className="w-3 h-3 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(249,115,22,0.6)]"></span>
              </h1>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 pl-1">
                Human to Human
              </p>
            </motion.div>
          </div>

          {/* --- 3. THE HERO CONTENT (Right Col) --- */}
          <div className="lg:col-span-9 flex flex-col items-end">
            
            {/* TEXT SECTION */}
            <motion.div 
              style={{ y: yText }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} // "Lusion" easing
              className="w-full max-w-3xl mb-16 lg:mb-24 relative z-20"
            >
              <HeroText />
            </motion.div>

            {/* CANVAS SECTION */}
            {/* We stretch this wider to break the grid slightly for visual interest */}
            <motion.div 
              style={{ y: yCanvas }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-[110%] -mr-[5%] relative z-10"
            >
              <div className="relative">
                {/* Decorative line connecting Text to Canvas */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -top-12 right-12 w-32 h-[1px] bg-neutral-200 origin-right hidden md:block" 
                />
                
                <HeroCanvas />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4 text-neutral-300 mix-blend-difference"
      >
        <div className="h-[1px] w-12 bg-current"></div>
        <span className="text-xs uppercase tracking-widest">Scroll to connect</span>
      </motion.div>
    </section>
  );
}