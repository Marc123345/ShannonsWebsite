import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingIcon {
  src: string;
  alt: string;
  xPct: number;
  yPct: number;
  size: number;
  depth: number; 
  rotation: number;
  zIndex: number;
}

const icons: FloatingIcon[] = [
  { src: "https://ik.imagekit.io/qcvroy8xpd/03_X.svg", alt: "X", xPct: 22, yPct: 25, size: 150, depth: 1.8, rotation: -12, zIndex: 3 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/02_Instagram.svg", alt: "Instagram", xPct: 68, yPct: 30, size: 160, depth: 1.2, rotation: 18, zIndex: 5 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/04_LinkedIn.svg", alt: "LinkedIn", xPct: 33, yPct: 64, size: 150, depth: 1.5, rotation: 8, zIndex: 4 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/05_Youtube.svg", alt: "YouTube", xPct: 72, yPct: 70, size: 165, depth: 1.1, rotation: -6, zIndex: 2 },
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

    // INITIAL SETTINGS
    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      const icon = icons[i];
      
      // Starting positions using CSS variables for flexibility
      gsap.set(el, {
        left: `${icon.xPct}%`,
        top: `${icon.yPct}%`,
        xPercent: -50,
        yPercent: -50,
        rotation: icon.rotation,
        opacity: 0,
        scale: 0.5
      });

      // Cinematic Entrance
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: i * 0.1,
        ease: "power4.out"
      });

      // Constant Ambient "Float" (Infinite)
      gsap.to(el, {
        y: "+=25",
        x: "+=15",
        rotation: "+=5",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = canvas.getBoundingClientRect();
      // Normalized mouse coordinates (-1 to 1)
      mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((clientY - rect.top) / rect.height) * 2 - 1;

      // ICON INTERACTION LOOP
      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const icon = icons[i];
        
        // Parallax + Repulsion combined
        const tx = mouse.current.x * 60 * icon.depth;
        const ty = mouse.current.y * 60 * icon.depth;
        
        gsap.to(el, {
          x: tx,
          y: ty,
          rotation: icon.rotation + (mouse.current.x * 10),
          duration: 1.2,
          ease: "power3.out", // Lushion uses heavy deceleration
          overwrite: "auto",
        });

        // "Chromatic Leak" effect on images when moving fast
        const img = el.querySelector('img');
        if (img) {
          gsap.to(img, {
            filter: `drop-shadow(${mouse.current.x * 15}px 0px 10px rgba(123,0,255,0.3))`,
            duration: 0.5
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="relative w-full overflow-hidden bg-secondary-900 ultra-glass border border-white/10"
      style={{
        height: isMobile ? "450px" : "750px",
        borderRadius: "40px",
      }}
    >
      {/* Background Radial Glow (Lushion Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(123,0,255,0.15),transparent_70%)] animate-aurora" />

      {icons.map((icon, i) => (
        <div
          key={i}
          ref={(el) => (iconsRef.current[i] = el)}
          className="absolute cursor-pointer group"
          style={{
            width: isMobile ? icon.size * 0.6 : icon.size,
            height: isMobile ? icon.size * 0.6 : icon.size,
            zIndex: icon.zIndex,
            willChange: "transform, filter",
          }}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            draggable={false}
          />
          
          {/* Subtle Glow Ring on Hover */}
          <div className="absolute inset-0 rounded-full border border-accent-500/0 group-hover:border-accent-500/40 group-hover:scale-125 transition-all duration-700 blur-md" />
        </div>
      ))}

      {/* Hero Text Reveal (Integrating your design system) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-white text-6xl md:text-9xl font-heading animate-cinematic-zoom mix-blend-difference">
          H2H<span className="text-accent-500">.</span>
        </h1>
        <p className="text-accent-200 tracking-[0.4em] uppercase text-caption animate-fade-in-up">
          Digital Excellence
        </p>
      </div>
    </div>
  );
}