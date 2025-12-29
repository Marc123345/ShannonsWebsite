import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingIcon {
  src: string;
  alt: string;
  xPct: number;
  yPct: number;
  size: number; // Base size for desktop
  depth: number; 
  rotation: number;
  zIndex: number;
}

const icons: FloatingIcon[] = [
  { src: "https://ik.imagekit.io/qcvroy8xpd/03_X.svg", alt: "X", xPct: 25, yPct: 30, size: 140, depth: 1.8, rotation: -12, zIndex: 3 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/02_Instagram.svg", alt: "Instagram", xPct: 70, yPct: 35, size: 150, depth: 1.2, rotation: 18, zIndex: 5 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/04_LinkedIn.svg", alt: "LinkedIn", xPct: 30, yPct: 70, size: 140, depth: 1.5, rotation: 8, zIndex: 4 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/05_Youtube.svg", alt: "YouTube", xPct: 75, yPct: 75, size: 155, depth: 1.1, rotation: -6, zIndex: 2 },
];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // GSAP Context for clean memory management
    const ctx = gsap.context(() => {
      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const icon = icons[i];
        
        // 1. SET INITIAL STATE
        gsap.set(el, {
          left: `${icon.xPct}%`,
          top: `${icon.yPct}%`,
          xPercent: -50,
          yPercent: -50,
          rotation: icon.rotation,
          scale: 0.8,
          opacity: 0,
        });

        // 2. ENTRANCE: Scale up and Fade in
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          delay: i * 0.15,
          ease: "expo.out"
        });

        // 3. IDLE: The "Submerged" Float
        // We use a very slow, high-quality sine ease
        gsap.to(el, {
          y: "+=15",
          x: "+=10",
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalized mouse coordinates (-1 to 1)
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const icon = icons[i];

        // LUSION PHYSICS: 
        // We calculate movement, but CLAMP it so it never leaves the frame.
        // We use a percentage of the width to keep it responsive.
        const maxMoveX = isMobile ? 20 : 60; // Max pixels it can travel from center
        const maxMoveY = isMobile ? 20 : 60;

        const moveX = nx * maxMoveX * icon.depth;
        const moveY = ny * maxMoveY * icon.depth;

        gsap.to(el, {
          x: moveX,
          y: moveY,
          rotation: icon.rotation + (nx * 15),
          duration: 1.5,
          ease: "power3.out", // High inertia deceleration
          overwrite: "auto",
        });

        // SPEED-BASED FILTERS (The "Award" Detail)
        const img = el.querySelector("img");
        if (img) {
          gsap.to(img, {
            filter: `blur(${Math.abs(nx) * 2}px) saturate(${1 + Math.abs(nx)})`,
            duration: 0.6
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert(); // Kill all animations on unmount
    };
  }, [isMobile]);

  return (
    <div
      ref={canvasRef}
      className="relative w-full overflow-hidden bg-secondary-900 ultra-glass border border-white/5"
      style={{
        aspectRatio: isMobile ? "4/5" : "21/9", // Cinematic ratio prevents "doesn't fit"
        borderRadius: "32px",
      }}
    >
      {/* 1. MESH GRADIENT BACKDROP */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,var(--color-primary)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,var(--color-secondary)_0%,transparent_50%)] animate-aurora pointer-events-none" />

      {icons.map((icon, i) => (
        <div
          key={i}
          ref={(el) => (iconsRef.current[i] = el)}
          className="absolute group select-none"
          style={{
            width: isMobile ? icon.size * 0.5 : icon.size,
            height: isMobile ? icon.size * 0.5 : icon.size,
            zIndex: icon.zIndex,
          }}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-full h-full object-contain transition-transform duration-700 ease-elegant group-hover:scale-110"
            draggable={false}
          />
          
          {/* 2. THE GLOW HALO */}
          <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
      ))}

      {/* 3. CENTER BRANDING (Using 70-30-10 Rule) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h2 className="text-white text-4xl md:text-7xl font-heading tracking-tight animate-cinematic-zoom">
          H2H<span className="text-accent-500">.</span>
        </h2>
        <div className="h-[1px] w-12 bg-accent-500/50 mt-4 animate-shimmer" />
      </div>
    </div>
  );
}