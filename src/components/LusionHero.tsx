import { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity 
} from 'framer-motion';
import { HeroText } from './HeroText';
import { HeroCanvas } from './HeroCanvas';

export function LusionHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Velocity Tracking for Momentum Skew
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Create a subtle skew based on scroll speed
  const skew = useTransform(smoothVelocity, [-1, 1], [-5, 5]);
  
  // Parallax with "Spring" physics for a buttery feel
  const springConfig = { damping: 30, stiffness: 100 };
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);
  const yCanvas = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]), springConfig);

  // 2. Mouse Tracking for Spotlight Effect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-dominant-50 overflow-hidden cursor-none selection:bg-accent-500/30"
    >
      {/* --- 1. THE INTERACTIVE SPOTLIGHT --- */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 0, 255, 0.08), transparent 80%)`
        }}
      />

      {/* --- 2. GLOBAL NOISE & GRID (H2H Branding) --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 pt-32 pb-24">
        
        <motion.div style={{ skewY: skew }} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- BRAND ANCHOR (Magnetic Logic) --- */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 h-fit z-50">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.6em] text-accent-500 uppercase mb-2 block">Founding Studio</span>
                <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-secondary-900 leading-none">
                  H2H<span className="text-accent-500">.</span>
                </h1>
                {/* Thin vertical connector line */}
                <div className="w-[1px] h-32 bg-gradient-to-b from-secondary-200 to-transparent mt-8 ml-1 opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* --- HERO CONTENT --- */}
          <div className="lg:col-span-9">
            
            <motion.div 
              style={{ y: yText }}
              className="w-full mb-32 relative z-20"
            >
              <HeroText />
            </motion.div>

            {/* THE "LUSION" CANVAS Tier --- */}
            <motion.div 
              style={{ y: yCanvas }}
              className="relative group w-full lg:w-[120%] lg:-ml-[10%]"
            >
              {/* Outer Decorative Border (Animated) */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-500/50 via-secondary-200/20 to-accent-500/50 rounded-[42px] blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative ultra-glass rounded-[40px] overflow-hidden border border-secondary-200/30 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]">
                 <HeroCanvas />
              </div>

              {/* Float-over Caption (Editorial style) */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute -bottom-10 right-10 text-[10px] font-sans text-secondary-400 tracking-widest hidden md:block"
              >
                [ INTERACTIVE CANVAS 001 // WEBGL_CORE ]
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* --- 3. CUSTOM CURSOR (Award-Winning Detail) --- */}
      <motion.div 
        className="fixed w-4 h-4 bg-accent-500 rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />
    </section>
  );
}