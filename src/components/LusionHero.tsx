export function LusionHero() {
  // ... (keep your existing refs and scroll logic)

  return (
    <section 
      ref={containerRef}
      // overflow-x-hidden is MANDATORY here to prevent the breakout from causing scrollbars
      className="relative min-h-screen bg-dominant-50 overflow-x-hidden selection:bg-accent-500/30"
    >
      {/* ... (keep spotlight and noise) */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* The skew logic can sometimes clip edges; we add a tiny bit of padding to the grid to prevent this */}
        <motion.div style={{ skewY: skew }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-10">
          
          {/* BRAND ANCHOR */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
             {/* ... logo code */}
          </div>

          {/* HERO CONTENT */}
          <div className="lg:col-span-8">
            <motion.div style={{ y: yText }} className="mb-20">
              <HeroText />
            </motion.div>

            {/* THE FIX: THE CANVAS WRAPPER */}
            <motion.div 
              style={{ y: yCanvas }}
              className="relative 
                /* Mobile: Full width, no breakout */
                w-full 
                /* Desktop: Break out to the right by 20% of the parent container */
                lg:w-[130%] lg:max-w-[1200px] 
                /* Center it on mobile, align right on desktop */
                ml-0"
            >
              <div className="relative ultra-glass rounded-[32px] md:rounded-[48px] overflow-hidden border border-secondary-200/30 shadow-2xl">
                 {/* Ensure HeroCanvas is set to width: 100% inside */}
                 <HeroCanvas />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}