import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroText } from './HeroText';
import { HeroCanvas } from './HeroCanvas';

export function LusionHero() {
  const containerRef = useRef(null);
  
  // Parallax Scroll Effect: Subtle and "Heavy"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // We want the text to "float" while the canvas "sinks" slightly
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); 
  const yCanvas = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-dominant-50 overflow-hidden selection:bg-accent-500 selection:text-white"
    >
      {/* --- 1. AMBIENT ATMOSPHERE (H2H Branding) --- */}
      {/* The Noise Overlay is already on the body, but we add a radial accent glow here */}
      <div className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] bg-gradient-to-b from-accent-500/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 pt-24 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- 2. THE BRAND ANCHOR (70/30/10 Rule: Secondary Color) --- */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-default"
            >
              <h1 className="text-5xl font-heading font-extrabold tracking-tighter text-secondary-900 flex items-center gap-3">
                H2H
                <span className="w-3 h-3 rounded-full bg-accent-500 shadow-glow-purple group-hover:scale-150 transition-transform duration-500"></span>
              </h1>
              <p className="mt-3 text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-secondary-400">
                Digital Excellence
              </p>
            </motion.div>
          </div>

          {/* --- 3. THE HERO CONTENT (Dynamic Layout) --- */}
          <div className="lg:col-span-9 flex flex-col items-end">
            
            {/* HERO TEXT SECTION */}
            <motion.div 
              style={{ y: yText, opacity: opacityFade }}
              className="w-full max-w-4xl mb-20 relative z-20"
            >
              <HeroText />
            </motion.div>

            {/* INTERACTIVE CANVAS SECTION */}
            {/* Using Ultra-Glass tier from your design system */}
            <motion.div 
              style={{ y: yCanvas }}
              initial={{ opacity: 0, scale: 0.98, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[115%] lg:-mr-[15%] relative z-10 ultra-glass rounded-[40px] overflow-hidden border border-secondary-200/20 shadow-2xl"
            >
               <HeroCanvas />
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Scroll Indicator: Interactive Mix-Blend */}
      <motion.div 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }} 
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-12 hidden lg:flex items-center gap-6 text-secondary-300 mix-blend-exclusion"
      >
        <div className="h-[1px] w-20 bg-accent-500 origin-left"></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Scroll to reveal story</span>
      </motion.div>
    </section>
  );
}