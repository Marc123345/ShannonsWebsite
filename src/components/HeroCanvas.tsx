import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Standard for award-winning animations

// ICONS DATA
const icons = [
  { src: "https://ik.imagekit.io/qcvroy8xpd/03_X.svg", alt: "X", xPct: 10, yPct: 20, size: 100, depth: 1.5 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/02_Instagram.svg", alt: "Instagram", xPct: 85, yPct: 15, size: 110, depth: 1.1 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/04_LinkedIn.svg", alt: "LinkedIn", xPct: 15, yPct: 60, size: 90, depth: 0.9 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/05_Youtube.svg", alt: "YouTube", xPct: 80, yPct: 70, size: 120, depth: 1.0 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/17_Google.svg", alt: "Google", xPct: 50, yPct: 10, size: 80, depth: 1.3 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/07_Reddit.svg", alt: "Reddit", xPct: 90, yPct: 45, size: 95, depth: 1.2 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/06_WhatsApp.png", alt: "WhatsApp", xPct: 5, yPct: 80, size: 100, depth: 0.95 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/11_TikTok.svg", alt: "TikTok", xPct: 40, yPct: 85, size: 110, depth: 1.1 },
];

export function H2HHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. SETUP & RESIZE
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      computeBase();
    };
    
    const computeBase = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      icons.forEach((icon, i) => {
        basePositions.current[i] = {
          x: (icon.xPct / 100) * rect.width,
          y: (icon.yPct / 100) * rect.height,
        };
      });
    };

    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // 2. INTERACTIVE MOUSE MOVEMENT
  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      // Optimization: Don't re-measure rect on every frame, assume 0,0 relative to viewport for full screen hero
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // 3. ANIMATION LOOP
  useEffect(() => {
    if (isMobile) return;
    let t = 0;

    const animate = () => {
      t += 0.005; // Slowed down for a "breathing" organic feel

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = basePositions.current[i] || { x: 0, y: 0 };
        const icon = icons[i];

        // Gentle floating (Breathing)
        const floatX = Math.sin(t + i) * 20 * icon.depth;
        const floatY = Math.cos(t + i * 1.3) * 20 * icon.depth;

        // Mouse Repulsion (Subtle push)
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 400; 
        let repelX = 0, repelY = 0;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          // Repel stronger but smoother
          repelX = (dx / dist) * force * 60;
          repelY = (dy / dist) * force * 60;
        }

        // Parallax (Depth)
        const parallaxX = (mouse.current.x / window.innerWidth - 0.5) * 40 * icon.depth;
        const parallaxY = (mouse.current.y / window.innerHeight - 0.5) * 40 * icon.depth;

        // Apply transform with a very slow, organic rotation
        el.style.transform = `translate3d(${x + floatX + repelX + parallaxX}px, ${y + floatY + repelY + parallaxY}px, 0) rotate(${Math.sin(t * 0.5 + i) * 10}deg)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex flex-col items-center justify-center font-sans text-white selection:bg-orange-500 selection:text-white">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      
      {/* 1. Grain Overlay (Adds Texture/Realness) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-20 mix-blend-overlay" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
      
      {/* 2. Gradient Orb (Warmth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* 3. Floating Icons Canvas */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {icons.map((icon, i) => (
          <div
            key={i}
            ref={(el) => (iconsRef.current[i] = el)}
            className="absolute pointer-events-none opacity-40 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-700"
            style={{
              width: isMobile ? icon.size * 0.6 : icon.size,
              willChange: 'transform',
            }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-widest uppercase text-orange-200/80"
        >
          From B2B to H2H
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
        >
          Build a brand people <br className="hidden md:block" />
          want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">talk to.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-10"
        >
          People don’t just connect with brands — they connect with the people behind them. 
          We help you show up online with a voice that feels <span className="text-white font-semibold">real, relatable, and worth listening to.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => setShowVideo(true)}
            className="group relative px-8 py-4 rounded-full bg-white text-neutral-950 font-bold tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-3"
          >
            <span>Hear Our Story</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          
          <button className="px-8 py-4 rounded-full border border-white/20 bg-transparent text-white font-semibold tracking-wide hover:bg-white/10 transition-all duration-300">
            View Services
          </button>
        </motion.div>
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 backdrop-blur-xl flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <video
                src="https://ik.imagekit.io/yourvideo.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-xs uppercase tracking-widest text-neutral-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent"></div>
      </motion.div>
    </div>
  );
}